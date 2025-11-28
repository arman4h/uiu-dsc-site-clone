# Backend API (Express.js)

This folder contains the backend API for the UIU Data Science Club site, built with Node.js and Express.

## Features
- Basic Express.js setup
- RESTful routes for events and other resources
- CORS enabled
- Organized route files in `/routes`

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Install dependencies
```bash
npm install
```

### Run the server
```bash
npm start
```
Or for development with auto-reload:
```bash
npm run dev
```

### Folder Structure
```
Backend/
├── routes/           # Express route files
├── models/           # Mongoose models (if using MongoDB)
├── controllers/      # Route handler logic
├── app.js            # Main Express app
├── package.json      # Project metadata and scripts
```

## Example API Endpoints
- `GET /api/events` — List all events
- `POST /api/events` — Create a new event
- `GET /api/events/:id` — Get event by ID

## Environment Variables
Create a `.env` file for secrets and config (e.g. database URI).

## License
MIT
