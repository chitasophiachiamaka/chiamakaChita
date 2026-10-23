# Chiamaka Sophia Chita — Portfolio

A responsive portfolio built with Next.js, React, TypeScript, and Tailwind CSS. The student-results demo uses a separate read-only FastAPI service backed by PostgreSQL; the task and budget prototypes store sample entries in the visitor's browser.

## Requirements

- Node.js 20.9 or newer and pnpm
- Python 3.12
- Docker Desktop for the local PostgreSQL container, or another PostgreSQL 15+ database

## Local development

1. Install the frontend dependencies and make local configuration files:

   ```powershell
   pnpm install
   Copy-Item .env.example .env.local
   Copy-Item backend/.env.example backend/.env
   ```

2. Start local PostgreSQL, then create and seed the synthetic demo tables:

   ```powershell
   docker compose up -d postgres
   Get-Content backend/schema.sql | docker compose exec -T postgres psql -U portfolio -d portfolio
   Get-Content backend/seed.sql | docker compose exec -T postgres psql -U portfolio -d portfolio
   ```

3. Start the API in a second terminal:

   ```powershell
   Set-Location backend
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   pip install -r requirements-dev.txt
   uvicorn main:app --reload --env-file .env
   ```

   The interactive API docs are at `http://localhost:8000/docs`.

4. Start the portfolio in another terminal from the repository root:

   ```powershell
   pnpm dev
   ```

   Visit `http://localhost:3000`. The student-results page calls the local API at `http://localhost:8000` by default.

## Checks

From the repository root:

```powershell
pnpm lint
pnpm typecheck
pnpm build
```

For the API tests, activate the backend virtual environment and run `pytest` from `backend/`.

## Content and media

- Update education, skills, and project descriptions in `lib/portfolio.ts`.
- Replace or add photos under `public/images/`; keep useful alt text in the page source.
- The robotics image is AI-generated and is labeled as an illustration, not evidence of an actual session.
- The classroom results use fictional learner records. The API exposes GET-only endpoints and does not accept result changes.
- The task and ledger prototypes save data in localStorage. Their values remain on the current browser and are demonstration data, not Chiamaka's real task or financial records.
- The résumé page intentionally omits work experience. A downloadable PDF is not included.

## Deployment on Vercel

Deploy the frontend and API as two Vercel projects from this repository:

1. Create a frontend Vercel project using the repository root. Add `NEXT_PUBLIC_SITE_URL` with the final public site URL and `NEXT_PUBLIC_RESULTS_API_URL` with the deployed API base URL.
2. Create a second Vercel project from the same repository with its Root Directory set to `backend/`. Vercel detects the FastAPI application from `main.py`.
3. Provision PostgreSQL through a Vercel Marketplace provider such as Neon. Apply `schema.sql` and `seed.sql` once to that database.
4. Add the database connection string as the API project's `DATABASE_URL`. Set `ALLOWED_ORIGINS` to the exact frontend origin, such as `https://your-site.vercel.app`.
5. Deploy a preview, verify `/api/health` and the results demo, then promote the frontend and API only when ready.

Never commit `.env` or `.env.local` files. The included local Docker database password is only for development; use provider-generated credentials in Vercel. No deployment has been performed.

## Project structure

```text
app/                  Next.js pages, metadata, sitemap, robots, and 404
backend/              FastAPI read-only API, SQL schema/seed, and tests
components/           Header and interactive demos
lib/                  Editable portfolio, education, skills, and project data
public/images/        Portrait, classroom photos, and labeled AI illustration
```
