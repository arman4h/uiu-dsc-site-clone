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

Frontend (from repo root):

```powershell
cd Frontend
npm install
# Start the app (common commands; see Frontend/README.md for the specific script)
npm run dev   # or: npm start
```

Backend (from repo root):

```powershell
cd Backend
npm install
# Start the server (see Backend/README.md for env vars and exact script)
npm run dev   # or: npm start
```

Run both services (frontend + backend) concurrently during local development if needed. The sub-README files contain environment configuration, ports and any extra setup.

## Notes

- This project was developed as a task for the UIU Data Science Club (IT Wing): cloning the club website using the stacks listed above.
- Each subfolder (`Frontend/` and `Backend/`) contains more detailed README files — refer there for environment variables, build and deployment instructions.

## Contribution & Contact

If you're a team member, open an issue or PR for changes. For quick questions, contact the project owner or the IT Wing leads.

---
Small, focused README — see the two sub-README files for full developer instructions.
