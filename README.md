# ECHT Retail Leasing OS - Deployment Guide

Welcome to the PropTech Leasing & Portfolio Management Platform. This MVP provides a full-stack Next.js web application engineered to manage retail leasing operations, infused with Gemini AI insights.

## Prerequisites
- Node.js (v18+)
- Local or Cloud PostgreSQL Database
- Docker (optional, for running the local DB)

## 1. Environment Setup
Rename your `.env` or verify the configuration:
```env
# Point this to your PostgreSQL database
DATABASE_URL="postgresql://proptech:password@localhost:5432/proptech_db?schema=public"

# Insert your active Gemini API key to activate the intelligent AI features
GEMINI_API_KEY="your-gemini-key"
```

## 2. Database Initialization
If Docker is installed, spin up the local PostgreSQL database:
```bash
docker-compose up -d
```

Run Prisma schema migrations to build your tables:
```bash
npx prisma db push
# or
npx prisma migrate dev --name init
```

*Note: The platform is built robustly. If a database connection cannot be established (e.g., during initial UX review), the API routes and UI will automatically and silently fall back to a rich mock dataset so the platform remains 100% operational as a front-end demo.*

## 3. Running the App
Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to view the ECHT Advisory Leasing OS.

## 4. Cloud Deployment (Vercel)
This Next.js application is strictly "Cloud Ready" and optimized for [Vercel](https://vercel.com/):
1. Push this repository to GitHub.
2. Import the project in Vercel.
3. Add the `DATABASE_URL` and `GEMINI_API_KEY` to Vercel's Environment Variables settings.
4. Set the Build Command to: `prisma generate && next build`
5. Deploy.
