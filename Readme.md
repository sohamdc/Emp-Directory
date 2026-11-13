# Employee Directory

A simple app to add, view, edit, and delete employees, with search and pagination.

**Stack:** React + TypeScript (Vite), Axios, Node.js + Express, PostgreSQL (Neon)

## Project structure

```
backend/    Express API (models, controllers, routes)
frontend/   React app (components, services, types)
```

## Setup

## Database choice

This project uses **PostgreSQL hosted online on [Neon](https://neon.tech)**, instead of a local install.

Note: Neon's free tier suspends the database when idle, so the first request after a pause can take a couple of seconds.

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env    
npm run dev
```

Runs at http://localhost:5000

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Runs at http://localhost:5173


## Screenshot

![Employee Directory](screenshots/home.png)