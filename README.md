# WeatherWise 🌤️

A modern, responsive full-stack weather application built with React, Node.js, Express, and MongoDB. Search for cities, explore current weather conditions and forecasts, and save your favourite locations.

WeatherWise uses the Open-Meteo API for location search and weather data.

## ✨ Features

- **City Search:** Search for cities and view matching locations.
- **Current Weather:** View temperature, feels-like temperature, humidity, wind, and other weather conditions.
- **Hourly Forecast:** Explore upcoming hourly weather conditions.
- **7-Day Forecast:** View weather predictions for the next seven days.
- **Weather Details:** Access additional weather information, including visibility and UV index.
- **Favourite Cities:** Save, view, and remove favourite locations.
- **Persistent Storage:** Favourite cities are stored in MongoDB.
- **Responsive Design:** Designed for desktop, tablet, and mobile screens.
- **REST API:** A Node.js and Express backend handles weather requests and favourite-city operations.
- **Docker Support:** Run the complete application using Docker Compose.

## 🛠️ Tech Stack

### Frontend
- React 19
- JavaScript
- HTML5
- CSS3
- Tailwind CSS 4
- React Router
- Vite

### Backend
- Node.js
- Express 5
- REST API
- Mongoose
- Native Fetch API

### Database
- MongoDB
- MongoDB Compass

### External API
- [Open-Meteo](https://open-meteo.com/) — Geocoding and weather forecast data.

### Development & Deployment Tools
- Git and GitHub
- Postman
- Docker
- Docker Compose
- Docker Hub
- Visual Studio Code
- npm

## 🏗️ Project Architecture

WeatherWise follows a frontend-backend-database architecture.

```text
                USER
                  |
                  v
          REACT FRONTEND
          (Vite + Tailwind)
                  |
                  | HTTP Requests
                  v
          EXPRESS BACKEND
             (REST API)
                  |
          +-------+-------+
          |               |
          v               v
     OPEN-METEO        MONGODB
     WEATHER API       DATABASE
          |               |
          +-------+-------+
                  |
                  v
           API RESPONSE
                  |
                  v
          REACT FRONTEND
                  |
                  v
             USER INTERFACE
```

The frontend communicates with the backend through REST endpoints. The backend retrieves weather information from Open-Meteo and manages favourite cities using MongoDB.

## 📁 Project Structure

```text
WeatherWise/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── .env.example
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🚀 Getting Started

You can run WeatherWise locally or using Docker Compose.

### Prerequisites

For local development:

- Node.js (22 recommended)
- npm
- MongoDB
- Git

For Docker deployment:

- Docker Desktop
- Docker Compose

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd WeatherWise
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL after publishing the project.

### 2. Configure the Backend

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create your local environment file using the example:

**PowerShell:**

```powershell
Copy-Item .env.example .env
```

The backend `.env` file should contain:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/weatherwise
```

Make sure your local MongoDB server is running.

Start the backend:

```bash
npm run dev
```

The backend will run at:

http://localhost:5000

### 3. Configure the Frontend

Open another terminal at the project root:

```bash
cd frontend
npm install
```

Create the frontend environment file:

**PowerShell:**

```powershell
Copy-Item .env.example .env
```

The frontend `.env` file should contain:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open the application:

http://localhost:5173

### 4. Verify the Backend

Visit the health-check endpoint:

http://localhost:5000/api/health

A successful response looks like:

```json
{
  "success": true,
  "message": "WeatherWise backend is running!",
  "timestamp": "..."
}
```

## 🐳 Running with Docker

WeatherWise supports Docker Compose, which starts the frontend, backend, and MongoDB together.

The Docker Compose configuration uses published Docker Hub images.

### Start the Application

From the project root:

```bash
docker compose pull
docker compose up -d
```

### Access the Services

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |
| Backend Health Check | http://localhost:5000/api/health |
| MongoDB | localhost:27018 |

### Useful Docker Commands

Check running containers:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs
```

View logs for a specific service:

```bash
docker compose logs backend
docker compose logs frontend
docker compose logs mongo
```

Stop the application:

```bash
docker compose down
```

**Note:** The MongoDB data is stored in a Docker named volume, allowing favourite cities to persist when containers are stopped and restarted. Avoid `docker compose down -v` unless you intentionally want to delete that stored database volume.

## 📦 Docker Hub Images

The application images are published on Docker Hub.

| Image | Repository |
|---|---|
| Backend | [weatherwise-backend](https://hub.docker.com/r/sharjeel10/weatherwise-backend) |
| Frontend | [weatherwise-frontend](https://hub.docker.com/r/sharjeel10/weatherwise-frontend) |

Pull the images individually:

```bash
docker pull sharjeel10/weatherwise-backend:latest
docker pull sharjeel10/weatherwise-frontend:latest
```

## 🔌 REST API Documentation

The backend exposes the following endpoints.

Base URL:

```text
http://localhost:5000/api
```

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Check backend availability |

### Weather

| Method | Endpoint | Description |
|---|---|---|
| GET | `/weather/search?q={city}` | Search for matching cities |
| GET | `/weather/forecast?latitude={lat}&longitude={lon}` | Retrieve weather forecast |

**Example city search:**

```http
GET /api/weather/search?q=Islamabad
```

**Example weather forecast:**

```http
GET /api/weather/forecast?latitude=33.6844&longitude=73.0479
```

The forecast includes current weather conditions, hourly forecast information, and a seven-day daily forecast.

### Favourite Cities

| Method | Endpoint | Description |
|---|---|---|
| GET | `/favorites` | Retrieve all favourite cities |
| POST | `/favorites` | Add a favourite city |
| DELETE | `/favorites/:id` | Remove a favourite city |

**Add a favourite city:**

```http
POST /api/favorites
Content-Type: application/json
```

Request body:

```json
{
  "name": "Islamabad",
  "country": "Pakistan",
  "latitude": 33.6844,
  "longitude": 73.0479
}
```

**Delete a favourite city:**

```http
DELETE /api/favorites/MONGODB_DOCUMENT_ID
```

### API Response and Validation

The API uses JSON responses and appropriate HTTP status codes.

Some examples:

| Status Code | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Resource created |
| 400 | Invalid or missing input |
| 404 | Resource not found |
| 409 | Duplicate favourite city |
| 500 | Internal server error |

## 🌍 Weather Data

WeatherWise uses two Open-Meteo services:

- **Geocoding API:** Finds matching locations from a city name.
- **Forecast API:** Retrieves current conditions, hourly data, and daily forecasts using geographic coordinates.

The application requests weather information such as:

- Temperature
- Apparent temperature
- Relative humidity
- Precipitation
- Weather conditions
- Wind speed and direction
- Visibility
- UV index
- Daily maximum and minimum temperatures

Standard Open-Meteo forecast and geocoding endpoints are used without requiring an API key.

## 🔐 Environment Variables

Environment files are excluded from Git to prevent accidental exposure of local configuration and secrets.

The repository includes `.env.example` files to show the required configuration.

| Variable | Purpose |
|---|---|
| `PORT` | Backend server port |
| `NODE_ENV` | Application environment |
| `MONGODB_URI` | MongoDB connection string |
| `VITE_API_BASE_URL` | Backend API base URL used by the frontend |

## 🧪 Development Commands

### Backend

```bash
npm run dev
```

```bash
npm start
```

### Frontend

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run lint
```

```bash
npm run preview
```

## 👨‍💻 Developer

**Developed by Muhammad Sharjeel Sarwar**

Built as a full-stack development portfolio project to demonstrate practical experience with React, Node.js, Express, MongoDB, REST APIs, and Docker.

---

⭐ If you find this project interesting, consider giving the repository a star!