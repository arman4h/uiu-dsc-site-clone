# UIU Data Science Club — Website (Clone)

A short, focused repository for the UIU Data Science Club website clone created as a task for the club's IT Wing.

This repo contains both the frontend and backend code in separate folders. Each folder has its own README with implementation details, so this file only gives a brief overview and quick-start notes.

## Tech snapshot

- Frontend: React, TanStack (query/router/etc.), Tailwind CSS, and related tooling.
- Backend: Express (Node.js) for API and server-side logic.

## Repository structure

- `Frontend/` — React-based UI. See `Frontend/README.md` for setup, scripts and environment details.
- `Backend/` — Express API server. See `Backend/README.md` for setup, environment variables and run instructions.

## Quick start (high level)

Prerequisites: Node.js (recommended v16+), npm or pnpm.

### Option 1: Start Both Servers at Once (PowerShell)
```powershell
# From the repo root:
.\start-dev.ps1
```
This will start both the backend (port 5000) and frontend (port 3000) in new terminal windows.

### Option 2: Start Servers Manually

**Frontend** (from repo root):
```powershell
cd Frontend
npm install
npm run dev   # Runs on http://localhost:3000
```

**Backend** (from repo root, in a separate terminal):
```powershell
cd Backend
npm install
npm start     # Runs on http://localhost:5000
```

## Important: Backend Server Must Be Running

The frontend fetches event data from `http://localhost:5000/api/events`. If you see a "Loading..." message on the Events page that never completes, it means:
1. The backend server is not running
2. Start it with `npm start` in the Backend folder
3. Then refresh the frontend page

## Notes

- This project was developed as a task for the UIU Data Science Club (IT Wing): cloning the club website using the stacks listed above.
- Each subfolder (`Frontend/` and `Backend/`) contains more detailed README files — refer there for environment variables, build and deployment instructions.

## Contribution & Contact

If you're a team member, open an issue or PR for changes. For quick questions, contact the project owner or the IT Wing leads.

---
Small, focused README — see the two sub-README files for full developer instructions.
