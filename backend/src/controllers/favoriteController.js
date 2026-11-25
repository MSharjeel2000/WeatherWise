
import mongoose from 'mongoose'
import Favorite from '../models/Favorite.js'

// Get all favourite cities
export async function getFavorites(req, res, next) {
  try {
    const favorites = await Favorite.find().sort({
      createdAt: -1,
    })

    res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites,
    })
  } catch (error) {
    next(error)
  }
}

// Add a favourite city
export async function addFavorite(req, res, next) {
  try {
    const { name, country, latitude, longitude } = req.body

    // Check for required fields
    if (
      !name ||
      !country ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required city details.',
      })
    }

    // Check if the city already exists
    const existingFavorite = await Favorite.findOne({
      name,
      country,
      latitude,
      longitude,
    })

    if (existingFavorite) {
      return res.status(409).json({
        success: false,
        message: 'This city is already in your favourites.',
      })
    }

    // Create a new favourite
    const favorite = await Favorite.create({
      name,
      country,
      latitude,
      longitude,
    })

    res.status(201).json({
      success: true,
      message: 'City added to favourites.',
      data: favorite,
    })
  } catch (error) {
    next(error)
  }
}

// Delete a favourite city
export async function deleteFavorite(req, res, next) {
  try {
    const { id } = req.params

    // Validate MongoDB document ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid favourite city ID.',
      })
    }

    const favorite = await Favorite.findByIdAndDelete(id)

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favourite city not found.',
      })
    }

    res.status(200).json({
      success: true,
      message: 'City removed from favourites.',
    })
  } catch (error) {
    next(error)
  }
}