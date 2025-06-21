# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New `Sidebar` component for improved navigation and code organization.
- Page components for better route-based rendering.
- React Context (`JobContext`) for centralized state management.

### Changed
- Refactored `App.tsx` to use React Router for navigation.
- Moved layout-related code from `App.tsx` to dedicated layout components.
- Updated `MainLayout` to use the new `Sidebar` component.

### Fixed
- Resolved issues with job selection and navigation in the job list view.

## [0.4.0] - 2025-06-19

### Fixed
- Resolved a series of critical bugs preventing the application from connecting to the database, including incorrect port mapping, credential mismatches, and stale Docker volumes.
- Ensured the database schema is correctly applied by `prisma migrate`, resolving the "table does not exist" error.
- The `POST /api/import/markdown` endpoint is now fully functional and verified.

### Changed
- Overhauled the `README.md` "Getting Started" guide for clarity, accuracy, and a more streamlined setup flow.
- Documentation now includes explicit instructions for the `.env` configuration and both methods for importing data (CLI script and API endpoint).

## [0.3.0] - 2025-06-19

### Added
- Created a new, standardized data source `JOBS_SOURCE.md` for reliable data imports.

### Changed
- Completely refactored the markdown import script (`importMarkdown.ts`) to be simpler, more robust, and parse the new `JOBS_SOURCE.md` file.
- The import script now clears the database before every import to prevent duplicate entries.
- Updated `STEPS.md` to reference the new `JOBS_SOURCE.md` file.

### Removed
- Deleted the old and unreliable `ALL_JOBS.md` file.

## [0.2.0] - 2025-06-19

### Added
- Dynamic port fallback for the backend server. If the default port (3001) is in use, the server will automatically find and start on a free port.
- Vite dev server proxy to seamlessly connect the frontend to the backend API, eliminating CORS issues and hard-coded ports in development.

### Fixed
- Resolved persistent database connection errors by correcting the setup process.
- Terminated stray server processes to free up default ports.
- Corrected the `DATABASE_URL` to match the Docker container's exposed port.

### Changed
- Updated `README.md` with clear instructions for setting up the `.env` file and running database migrations.

## [0.1.0] - 2025-06-18

### Added
- Initial project setup with React (Vite + TypeScript) frontend and Node.js (Express + TypeScript) backend.
- PostgreSQL database with Prisma ORM.
- Full CRUD API for managing job applications.
- Frontend components for displaying a job dashboard, job lists, and job details.
- Seed script to populate the database with mock data.
- Basic project documentation (`README.md`, `STEPS.md`).
