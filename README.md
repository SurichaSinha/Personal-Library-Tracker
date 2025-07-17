# Personal Library Tracker

A full-stack MERN application for managing and tracking your personal book library.

## Features

- JWT-based authentication (register/login)
- Passwords hashed with bcrypt
- Protected book management (CRUD) for logged-in users
- Book cover image upload (Multer)
- Filter/search books by status, title, or author
- Google Books API integration (search and import)
- Public user profiles with public book lists
- React frontend with Material UI (dark mode toggle)
- Toast notifications for feedback

## Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer, Bcrypt
- **Frontend:** React, Material UI, Axios, React Router, React Toastify

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Backend Setup
1. `cd backend`
2. `npm install`
3. Create a `.env` file in `backend/` with:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. `npm run dev`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm start`

### Usage
- Register and log in.
- Add, edit, delete, and filter your books.
- Upload cover images for books.
- Search Google Books and import books to your library.
- View your public profile and others' public book lists.
- Toggle dark mode in the navbar.

## API Endpoints (Backend)
- `POST /api/auth/register` — Register
- `POST /api/auth/login` — Login
- `GET /api/books` — Get books (with filters)
- `POST /api/books` — Add book
- `PUT /api/books/:id` — Edit book
- `DELETE /api/books/:id` — Delete book
- `GET /api/google-books?query=...` — Google Books search
- `GET /api/users/:username` — Public profile

## Folder Structure
```
backend/
frontend/
```

## License
MIT 