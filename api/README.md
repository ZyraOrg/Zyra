Zyra API (Next.js)

This folder contains a minimal Next.js app used as the Zyra backend API. It exposes:

- `/` — a simple page that shows the API is running
- `/api/status` — an API endpoint that returns JSON { status: 'ok', message: 'Zyra API is running' }

Run locally:

1. Install dependencies:
   npm install

2. Start dev server (runs on port 3001):
   npm run dev

From the repository root you can also run the backend with:

   npm run dev:backend

(Added as a script in the root `package.json`.)
