# Candidate Tracker

A simple full-stack candidate tracking app built with React, Vite, Express, and SQLite. The frontend lets you add candidates, view their details, add notes, and delete records. The backend exposes a small REST API backed by a local SQLite database.

## Project Structure

- `backend/` - Express API and SQLite database setup
- `frontend/` - React app built with Vite

## Features

- Add candidates with a name and role
- View all saved candidates
- Open a candidate detail page
- Add notes to a candidate
- Delete a candidate and its notes

## Requirements

- Node.js 18+ recommended
- npm

## Setup

Install dependencies in both apps:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Running the App

Start the backend from the `backend/` folder:

```bash
node server.js
```

The API runs on `http://localhost:5000`.

Start the frontend from the `frontend/` folder:

```bash
npm run dev
```

The Vite app runs on `http://localhost:5173` by default.

## Backend API

### `GET /`
Returns a simple health message.

### `GET /candidates`
Returns all candidates.

### `POST /candidates`
Creates a new candidate.

Request body:

```json
{
  "name": "Tony Stark",
  "role": "Full Stack Developer"
}
```

### `GET /candidates/:id`
Returns one candidate by ID.

### `DELETE /candidates/:id`
Deletes a candidate and any notes linked to that candidate.

### `GET /candidates/:id/notes`
Returns all notes for a candidate.

### `POST /candidates/:id/notes`
Creates a note for a candidate.

Request body:

```json
{
  "content": "Strong communication skills"
}
```

## Database

The backend creates a local SQLite database file named `candidate.db` in the backend directory. It contains two tables:

- `candidates` with `id`, `name`, and `role`
- `notes` with `id`, `candidate_id`, and `note`

## Frontend Routes

- `/` - Candidate list and add form
- `/candidates/:id` - Candidate details and notes

## Notes

- The frontend currently points to `http://localhost:5000` for API requests.
- If you change the backend port, update the API URLs in the frontend accordingly.
