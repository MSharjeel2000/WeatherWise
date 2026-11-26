# WeatherWise 🌤️

A modern, responsive full-stack weather application built with **React.js, Node.js, Express.js, and MongoDB**.

WeatherWise allows users to search for cities, explore current weather conditions, view hourly and 7-day forecasts, and save their favourite locations. Weather data is provided by the Open-Meteo API.

## 🌐 Live Demo

**[Explore WeatherWise](https://weatherwise-frontend.vercel.app/)**

## 💻 Source Code

**[View GitHub Repository](https://github.com/MSharjeel2000/WeatherWise)**

## ✨ Features

- **City Search:** Search for cities and explore matching locations.
- **Current Weather:** View current temperature and weather conditions.
- **Feels-Like Temperature:** Check how the temperature actually feels.
- **Weather Details:** View humidity, wind speed, visibility, and other weather information.
- **Hourly Forecast:** Explore upcoming hourly weather conditions.
- **7-Day Forecast:** View weather predictions for the next seven days.
- **Favourite Cities:** Save frequently visited locations.
- **Persistent Storage:** Favourite cities are stored in MongoDB.
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
- **Loading and Error States:** Helpful feedback during API requests and when errors occur.

## 🛠️ Technology Stack

### Frontend
- **React.js 19** – Component-based user interface.
- **JavaScript (ES6+)** – Application logic.
- **Tailwind CSS 4** – Responsive styling and design.
- **Vite** – Frontend development server and build tool.
- **React Router** – Client-side navigation.
- **Fetch API** – Communication with the backend REST API.

### Backend
- **Node.js** – JavaScript runtime.
- **Express.js 5** – Backend framework and REST API development.
- **Mongoose** – MongoDB object data modeling.
- **Native Fetch API** – Requests to the external weather service.

### Database
- **MongoDB** – NoSQL database for storing favourite cities.
- **MongoDB Atlas** – Managed cloud database for production.

### External API
- **[Open-Meteo](https://open-meteo.com/)** – City geocoding and weather forecast data.

### Development & Deployment Tools
- **Docker** – Application containerization.
- **Docker Compose** – Multi-container application management.
- **Docker Hub** – Docker image hosting.
- **Git & GitHub** – Version control and source code hosting.
- **Vercel** – Application deployment.
- **Postman** – API testing.
- **MongoDB Compass** – Visual database management.
- **VS Code** – Code editor.

## 🏗️ Application Architecture

WeatherWise follows a client-server architecture.

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
          +--------+--------+
          |                 |
          v                 v
     OPEN-METEO           MONGODB
     Weather API        Favourite Cities
          |                 |
          +--------+--------+
                   |
                   v
          JSON API Responses
                   |
                   v
          REACT FRONTEND
                   |
                   v
             USER INTERFACE
```

### How It Works

1. Users interact with the React frontend to search for cities or view saved favourites.
2. The frontend sends HTTP requests to the Express backend.
3. The backend communicates with Open-Meteo to retrieve location and weather information.
4. Mongoose handles database operations for saving, retrieving, and deleting favourite cities.
5. The backend returns structured JSON responses.
6. React updates the interface with the retrieved information.

The backend keeps external API communication and database operations separate from the frontend.

## 📁 Project Structure

```text
WeatherWise/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── weatherController.js
│   │   │   └── favoriteController.js
│   │   │
│   │   ├── middleware/
│   │   │
│   │   ├── models/
│   │   │   └── Favorite.js
│   │   │
│   │   ├── routes/
│   │   │   ├── weatherRoutes.js
│   │   │   └── favoriteRoutes.js
│   │   │
│   │   ├── services/
│   │   │   └── weatherService.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

## Getting Started

Follow these instructions to run WeatherWise locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (Node.js 22 recommended)
- npm
- [MongoDB](https://www.mongodb.com/try/download/community) or a MongoDB Atlas database
- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for Docker setup)

### 1. Clone the Repository

```bash
git clone https://github.com/MSharjeel2000/WeatherWise.git

cd WeatherWise
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/weatherwise
```

If you use MongoDB Atlas, replace the local MongoDB connection string with your own Atlas connection string.

Start the backend development server:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

## 🐳 Running with Docker

WeatherWise supports Docker Compose to run the frontend, backend, and MongoDB together.

### Prerequisites

Make sure Docker Desktop is installed and running.

### Start the Application

From the root project directory, pull the published images:

```bash
docker compose pull
```

Start all services:

```bash
docker compose up -d
```

### Application URLs

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |
| Backend Health Check | http://localhost:5000/api/health |
| MongoDB | localhost:27018 |

MongoDB is accessible on port `27018` from the host machine and uses the internal Docker network for backend communication.

### Useful Docker Commands

View running containers:

```bash
docker compose ps
```

View application logs:

```bash
docker compose logs
```

View backend logs:

```bash
docker compose logs backend
```

View frontend logs:

```bash
docker compose logs frontend
```

Stop the application:

```bash
docker compose down
```

Stop the application and remove its containers and network:

```bash
docker compose down
```

The MongoDB data volume is used to preserve database data between container restarts.

### Docker Hub Images

WeatherWise images are published on Docker Hub:

- **Backend:** [sharjeel10/weatherwise-backend](https://hub.docker.com/r/sharjeel10/weatherwise-backend)
- **Frontend:** [sharjeel10/weatherwise-frontend](https://hub.docker.com/r/sharjeel10/weatherwise-frontend)

## 🔌 REST API Documentation

The backend exposes REST API endpoints for weather information and favourite city management.

Base URL:

```text
http://localhost:5000/api
```

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Check backend availability |

### Weather Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/weather/search?q={city}` | Search for matching cities |
| GET | `/weather/forecast?latitude={lat}&longitude={lon}` | Retrieve weather forecast |

### Favourite City Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/favorites` | Retrieve saved favourite cities |
| POST | `/favorites` | Add a city to favourites |
| DELETE | `/favorites/:id` | Remove a favourite city |

### Example Requests

**Search for a city**

```http
GET /api/weather/search?q=London
```

**Retrieve weather forecast**

```http
GET /api/weather/forecast?latitude=51.5072&longitude=-0.1276
```

**Add a favourite city**

```http
POST /api/favorites
Content-Type: application/json
```

Request body:

```json
{
  "name": "London",
  "country": "United Kingdom",
  "latitude": 51.5072,
  "longitude": -0.1276
}
```

**Retrieve favourite cities**

```http
GET /api/favorites
```

**Remove a favourite city**

```http
DELETE /api/favorites/:id
```

## 🌦️ Weather Data Provider

WeatherWise uses [Open-Meteo](https://open-meteo.com/) for weather information.

Open-Meteo provides:

- Geocoding and city search.
- Current weather conditions.
- Hourly weather forecasts.
- Daily weather forecasts.
- Weather-related measurements such as temperature, humidity, and wind speed.

Open-Meteo does not require an API key for its standard non-commercial API usage.

Weather requests are handled by the backend rather than directly by the frontend.

## ☁️ Production Deployment

WeatherWise is deployed using Vercel and MongoDB Atlas.

| Component | Platform | Details |
|---|---|---|
| Frontend | Vercel | React application |
| Backend | Vercel | Express REST API |
| Database | MongoDB Atlas | Cloud-hosted MongoDB |
| Weather Service | Open-Meteo | External weather data |
| Container Images | Docker Hub | Published frontend and backend images |
| Source Code | GitHub | Project repository |

### Production Links

- **Live Application:** https://weatherwise-frontend.vercel.app/
- **Backend API:** https://backend-eight-nu-96.vercel.app
- **GitHub Repository:** https://github.com/MSharjeel2000/WeatherWise

### Environment Variables

The application uses environment variables to configure its services.

**Backend**

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `NODE_ENV` | Application environment |
| `MONGODB_URI` | MongoDB connection string |
| `FRONTEND_URL` | Allowed frontend origin for CORS |

**Frontend**

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API base URL |

Actual environment files and database credentials are not included in the GitHub repository.

## 🔒 Security Considerations

- Database credentials are stored in environment variables.
- Environment files are excluded from version control.
- The frontend communicates with the backend through REST APIs.
- CORS is configured to allow the deployed frontend origin.
- MongoDB Atlas database access is configured separately from application source code.

## 👨‍💻 Developer

**Developed by Muhammad Sharjeel Sarwar**

- GitHub: [MSharjeel2000](https://github.com/MSharjeel2000)
- Project: [WeatherWise](https://github.com/MSharjeel2000/WeatherWise)

---

If you find this project useful, consider giving the repository a ⭐ on GitHub!