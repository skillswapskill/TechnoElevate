# TechnoElevate Private Limited Website

Basic business website built with **Next.js** (client) and **Express** (server).

## Features
- Modern responsive landing page with Navy/Cream/Coral frosted-glass UI
- Lightweight CSS/SVG animations and native scroll reveals with a simplified mobile rendering budget
- Interactive four-step project journey with a progress ring, animated bars, celebratory details, and reduced-motion support
- Gradient reading-progress indicator and animated, accessible form feedback
- Static SSR HTML, structured data, canonical URLs, sitemap, robots, and social images
- Services pages: Digital Marketing, Website Building, LLM Training, Data Leveling, Outsourcing, Corporate Contracting
- Service inquiry forms that submit leads to backend
- Password-protected admin dashboard at `/admin` with metrics, searchable records, and user activity
- Admin portal displays collected leads and career applications with detailed candidate profiles
- Careers page at `/careers` with searchable/filterable job openings and online applications
- Mobile/tablet bottom bar for one-hand operation
- SkillSwap product link in navigation (`https://skillswap.company`)

## Project Structure
```text
client/   # Next.js frontend
server/   # Express backend API + JSON lead storage
```

## Setup

### 1. Server
```bash
cd server
npm install
cp .env.example .env   # optional on Windows: copy .env.example .env
npm run dev
```
Server runs on `http://localhost:5100`.

### 2. Client
```bash
cd client
npm install
npm run dev
```
Client runs on `http://localhost:3000`.

## Admin Portal
- URL: `http://localhost:3000/admin`
- Default password: `Techno@Admin123` (set in `server/.env` as `ADMIN_PASSWORD`)

## Configuration
- Business details: `client/src/lib/config.js`
  - Replace the `address` value with the full office address. The Google Maps links on the website are generated automatically from this value.
- Production site URL: set `NEXT_PUBLIC_SITE_URL` in `client/.env.local` (defaults to `https://technoelevate.tech`).
- Theme/colors: `client/src/app/globals.css` (`:root` CSS variables)
  - Navy `#14213D`, Cream `#F4EDE0`, Coral `#FF6B5B`.
- Lead storage: `server/data/leads.json`
- Career application storage: `server/data/applications.json`
- Job listings: `client/src/lib/jobs.js`

## Notes
- The admin portal is not linked in public navigation; access it directly at `/admin`.
- The office address image could not be read by the model during generation. Replace the address placeholder in `client/src/lib/config.js` with the exact address.
