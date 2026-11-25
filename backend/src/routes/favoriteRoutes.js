
import express from 'express'

import {
  getFavorites,
  addFavorite,
  deleteFavorite,
} from '../controllers/favoriteController.js'

const router = express.Router()

// Get all favourite cities
router.get('/', getFavorites)

// Add a favourite city
router.post('/', addFavorite)

// Delete a favourite city
router.delete('/:id', deleteFavorite)

export default router
