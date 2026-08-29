# Nyota Funds Kenya

A humanitarian grant platform with M-Pesa payment via Paylor.

## Project Structure

```
nyota-funds/
├── frontend/       → React + Vite + Tailwind (deploy on Vercel)
└── backend/        → Node + Express (deploy on Render)
```

## Frontend Setup (Vercel)

1. Set **Root Directory** to `frontend`
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add environment variable:
   - `VITE_API_URL` = your Render backend URL

## Backend Setup (Render)

1. Set **Root Directory** to `backend`
2. Start command: `node server.js`
3. Add environment variables (from `.env.example`):
   - `PAYLOR_API_KEY` = your Paylor API key
   - `PAYLOR_BASE_URL` = Paylor base URL (check their docs)
   - `BACKEND_URL` = your Render URL (for Paylor callback)

## Local Development

**Backend:**
```bash
cd backend
cp .env.example .env   # fill in your values
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Notes

- Paylor STK Push endpoint URL needs to be confirmed from their docs
- Payments tracked in memory (no database needed)
- 12 grant tiers from KES 22,500 (fee 375) to KES 105,000 (fee 1,335)
