# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New `Sidebar` component for improved navigation and code organization.
- Page components for better route-based rendering.
- React Context (`JobContext`) for centralized state management.
- Scaffolded backend controllers (`jobController.ts`, `responseController.ts`, `importController.ts`) in `server/src/presentation/controllers`. 
- Added Vitest tests for `jobUtils` utilities.
- Added `test` script and `vitest` devDependency.
- Defined `ApiJobDTO` type and tightened TypeScript types across importService, transformers, jobService, and responseService.


### Changed
- Refactored `App.tsx` to use React Router for navigation.
- Moved layout-related code from `App.tsx` to dedicated layout components.
- Updated `MainLayout` to use the new `Sidebar` component.
- Refactored backend presentation layer: replaced route handlers with controllers in `jobs.ts`, `responses.ts`, and `import.ts`.
- Moved documentation files into `/docs` folder and updated internal links.
- Updated `README.md` to include test instructions and documentation section.
- Configured TypeScript path aliases in `tsconfig.json` and `vite.config.ts`.
- Updated `package.json` with `test` script and `vitest` devDependency.
 

### Fixed
- Resolved issues with job selection and navigation in the job list view.
- Fixed TypeScript ES module resolution error by adding `.js` extensions in domain imports.
- Cleaned up duplicate imports and removed inline handlers to resolve lint errors in `responses.ts`.
- Eliminated `any` usages by fully typing DTOs, services, and error handlers.
- Updated test command to use `vitest run`, resolving hanging watch mode.
- Removed broken seed/import scripts and fixed trailing comma in `server/package.json` scripts.
 

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
