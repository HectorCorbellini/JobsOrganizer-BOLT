# Action Plan for Code & Architecture Improvements

This document outlines the recommended steps to refactor the application, enhancing its maintainability, scalability, and adherence to Clean Architecture principles.

---

### 1. Refactor the Backend Architecture (High Priority)

The current backend implementation mixes routing, business logic, and data access within the route handlers. Separating these concerns into distinct layers is crucial for a scalable and testable application.

#### Steps:

1.  **Centralize Prisma Client:**
    *   Create a new file `server/src/db.ts` or `server/src/lib/prisma.ts`.
    *   Instantiate a single, shared `PrismaClient` instance and export it.
    *   Update all files that use Prisma to import this shared instance instead of creating a new one.

2.  **Create a Service Layer:**
    *   Create a new directory: `server/src/services`.
    *   For each feature (e.g., `import`), create a service file (e.g., `server/src/services/importService.ts`).
    *   Move all business logic (e.g., reading and parsing the markdown file) from the route handler into functions within this service file.

3.  **Create a Repository Layer:**
    *   Create a new directory: `server/src/repositories`.
    *   Create a repository file for the `Job` model (e.g., `server/src/repositories/jobRepository.ts`).
    *   Move all Prisma queries (e.g., `prisma.job.create`, `prisma.job.findFirst`) into methods within this repository file.

4.  **Connect the Layers:**
    *   The **Route Handler** (`routes/import.ts`) should only be responsible for handling the HTTP request and response. It should call the appropriate method in the **Service Layer**.
    *   The **Service Layer** (`services/importService.ts`) will contain the core business logic. It will call methods from the **Repository Layer** to interact with the database.
    *   The **Repository Layer** (`repositories/jobRepository.ts`) will be the only layer that directly interacts with the database via the Prisma client.

---

### 2. Remove Dead Code (Medium Priority)

To keep the codebase clean and avoid confusion, unused files should be removed.

#### Steps:

1.  **Delete Mock Data File:**
    *   The file `src/data/mockJobs.ts` contains old, static data that is no longer used since the application is connected to a live database. This file should be deleted.

---

### 3. Enhance Frontend State Management (Future-Proofing)

The current frontend state management using the `useJobs` custom hook is excellent for the application's current size. For future scalability, consider adopting a more powerful data-fetching library.

#### Recommendation:

*   When the application requires more advanced features like caching, automatic background refetching, or optimistic updates, consider migrating from the custom `useJobs` hook to a dedicated library like **React Query (TanStack Query)** or **SWR**.
*   This is not an urgent change but a strategic consideration for future development.
