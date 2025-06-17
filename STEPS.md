# Plan for Data Migration and Future-Proofing

This document outlines the steps to transition the Job Organizer application from static mock data to a database-driven backend, while also providing a way to import new opportunities from markdown files.

## Phase 1: Enhance Mock Data

The goal of this phase is to improve the quality and quantity of the mock data to better reflect the opportunities listed in `ALL_JOBS.md`.

1.  **Analyze `ALL_JOBS.md`:** Review the file to identify distinct opportunities that can be transformed into structured job objects.
2.  **Define a Mapping Strategy:** For each entry, determine how to map its information to the `Job` interface. This will require making some assumptions for missing fields:
    *   **`id`**: Generate a unique ID (e.g., incrementing number).
    *   **`title`**: Use the project name (e.g., "Contributor at MegaDetector").
    *   **`company`**: Use the organization's name (e.g., "Microsoft AI for Earth").
    *   **`location`**: Set to "Remote" or a specific location if mentioned.
    *   **`salary`**: Set to "Varies" or a specific stipend if available (e.g., Outreachy).
    *   **`status`**: Default to `new`.
    *   **`priority`**: Default to `medium`.
    *   **`technologies`**: Extract from the tech stack listed.
    *   **`description`**: Use the project overview.
    *   **`contactInfo`**: Use the provided website or contact email.
3.  **Update `mockJobs.ts`:** Manually create ~18 job entries based on this mapping and replace the existing content of `src/data/mockJobs.ts`.

## Phase 2: Database Integration

This phase involves setting up a backend service and a database to manage job data dynamically.

1.  **Choose a Tech Stack:**
    *   **Backend:** Node.js with Express.js is a lightweight and popular choice.
    *   **Database:** PostgreSQL is a robust relational database, but a NoSQL option like MongoDB could also work well given the semi-structured nature of job data.
    *   **ORM/Driver:** Use an ORM like Prisma or a driver like `pg` to interact with the database.
2.  **Set Up the Backend:**
    *   Initialize a new Node.js project in a `server` directory.
    *   Create an Express server with API endpoints for CRUD (Create, Read, Update, Delete) operations on jobs (e.g., `GET /api/jobs`, `POST /api/jobs`, `PUT /api/jobs/:id`).
    *   Define the database schema to match the `Job` interface.
3.  **Migrate Data:**
    *   Write a one-time script to read the updated `mockJobs.ts` file and insert the data into the database.
4.  **Update the Frontend:**
    *   In `App.tsx`, replace the `useEffect` hook that loads mock data with a `fetch` call to the new backend API (`GET /api/jobs`).
    *   Update all functions that modify job state (`handleStatusChange`, `addNote`, etc.) to make API calls to the backend instead of manipulating local state directly.

## Phase 3: Markdown Importer Tool

This phase focuses on creating a reusable tool to parse `ALL_JOBS.md` and similar files to populate the database.

1.  **Create a Parsing Script:**
    *   Develop a Node.js script that reads the `ALL_JOBS.md` file.
    *   Use a library like `marked` or `unified` to parse the markdown into a structured format (Abstract Syntax Tree).
    *   Traverse the AST to identify sections, headings, list items, and links that correspond to job opportunities.
2.  **Implement Data Transformation Logic:**
    *   Apply the mapping strategy from Phase 1 to convert the parsed markdown content into JSON objects that match the `Job` schema.
3.  **Build an Import API Endpoint:**
    *   Create a new endpoint on the backend (e.g., `POST /api/import/markdown`).
    *   This endpoint will accept a file path or content, execute the parsing script, and insert the transformed job data into the database.
    *   **Crucially, it should include logic to prevent duplicate entries.** Before inserting a new job, it should check if a job with the same title and company already exists.
4.  **Create a Simple UI (Optional):**
    *   For ease of use, a simple admin page could be added to the frontend with a file upload button that calls the import API. This would allow for easily adding new job lists in the future without manual database entry.

By following these steps, the application will evolve from a static prototype into a dynamic, data-driven tool with a clear path for future expansion.
