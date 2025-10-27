# Redstring Assignment

This repository contains a full-stack web application for managing candidate profiles, built with React (frontend) and Express/MongoDB (backend).

## Project Structure

```
redstring/
├── client/      # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── server/      # Express backend
│   ├── models/
│   ├── controller/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── ...
└── README.md
```

## Features
- Candidate profile listing and details
- Unlock and reject candidate profiles
- Responsive UI with modern design
- Backend REST API for profile management
- MongoDB for data storage
- CORS enabled for cross-origin requests

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or cloud)

### Setup

#### 1. Clone the repository
```
git clone https://github.com/tejash111/intern-assignment.git
cd redstring
```

#### 2. Install dependencies
```
cd client
npm install
cd ../server
npm install
```

#### 3. Configure environment variables
Create a `.env` file in the `server` directory:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

#### 4. Start the backend server
```
cd server
npm start
```

#### 5. Start the frontend
```
cd client
npm run dev
```

The frontend will run on `http://localhost:5173` and the backend on `http://localhost:5000` by default.

## API Endpoints

- `GET /api/profiles` - Get all candidate profiles
- `GET /api/profiles/:id` - Get a single candidate profile by ID
- `POST /api/profiles/unlock/:id` - Unlock a candidate profile

## Frontend
- Built with React and Vite
- Main components: `ProfileCard`, `ProfileData`, `UnlockModal`
- API calls handled via Axios in `client/src/services/api.js`

## Backend
- Built with Express.js
- MongoDB via Mongoose
- Main files: `server.js`, `controller/profileController.js`, `models/profileSchema.js`, `routes/route.js`

## Development Notes
- CORS is enabled for all origins
- Unlocking a profile updates its `unlocked` status in the database
- Responsive design for mobile and desktop

## License
MIT
