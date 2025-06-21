# A Step-by-Step Guide to Refactoring Your Application

This plan was designed to be executed in small, incremental steps. After each step, it was verified that the application was still working as expected before moving on to the next one.

---

### **Part 1: Backend Refactoring (Building a Solid Foundation)**

We'll start with the backend to establish a clean, layered architecture. This will make the backend more maintainable and easier to test.

- [x] **Step 1.1: Centralize the Prisma Client**
*   **Goal:** Ensure a single, efficient database connection.
*   **Action:**
    1.  Create a new file at `server/src/lib/prisma.ts`.
    2.  In this file, initialize and export a single instance of `PrismaClient`.
    3.  Update all files that use Prisma to import this shared instance instead of creating their own.
*   **Verification:** The application should start, and all API endpoints should function correctly.

- [x] **Step 1.2: Create a Repository Layer**
*   **Goal:** Isolate all database queries into a dedicated layer.
*   **Action:**
    1.  Create a new directory: `server/src/repositories`.
    2.  Create `jobRepository.ts` inside it and move all job-related Prisma queries there.
*   **Verification:** Test all job-related API endpoints (`/api/jobs`) to ensure they still work.

- [x] **Step 1.3: Create a Service Layer**
*   **Goal:** Separate business logic from the HTTP layer.
*   **Action:**
    1.  Create a new directory: `server/src/services`.
    2.  Create `jobService.ts` and move any job-related business logic into it. This service will call the `jobRepository`.
*   **Verification:** Re-test all job-related API endpoints.

- [x] **Step 1.4: Refactor the Route Handlers**
*   **Goal:** Make route handlers thin and focused on handling HTTP requests/responses.
*   **Action:**
    1.  Update the job route handlers to only call the `jobService`.
*   **Verification:** Perform a final test of all job-related API endpoints.

- [x] **Step 1.5: Refactor the Responses Endpoints**
*   **Goal:** Extract response repository and service and delegate all logic to the service layer.
*   **Action:**
    1.  Create `server/src/repositories/responseRepository.ts`.
    2.  Create `server/src/services/responseService.ts`.
    3.  Update `server/src/routes/responses.ts` to use `responseService` instead of direct Prisma calls.
*   **Verification:** Test all response-related API endpoints (`/api/responses`) to ensure they work.

---

### **Part 2: Frontend Refactoring (One Component at a Time)**

With a stable backend, we can now safely refactor the frontend. We will do this incrementally to avoid breaking the UI.

- [x] **Step 2.1: Install and Configure the Router**
*   **Goal:** Introduce a standard routing system.
*   **Action:**
    1.  Install `react-router-dom`.
    2.  Set up basic routes in `App.tsx` without changing the existing component structure yet.
*   **Verification:** The application should still render the main view, but now under a specific route (e.g., `/`).

- [x] **Step 2.2: Create a `MainLayout` Component**
*   **Goal:** Separate the overall page layout from the content.
*   **Action:**
    1.  Create `src/components/Layout/MainLayout.tsx`.
    2.  Move the main layout structure (sidebar and content area) from `App.tsx` into this new component.
*   **Verification:** The application's UI should look identical.

- [x] **Step 2.3: Extract the `Sidebar` Component**
*   **Goal:** Make the sidebar a self-contained, reusable component.
*   **Action:**
    1.  Create `src/components/Layout/Sidebar.tsx`.
    2.  Move the sidebar's JSX and logic into this new component.
*   **Verification:** The sidebar should still work correctly.

- [x] **Step 2.4: Create Page Components**
*   **Goal:** Separate page-level components from reusable ones.
*   **Action:**
    1.  Create a `src/pages` directory.
    2.  Move `Dashboard` and `JobList` into this directory.
*   **Verification:** Update the router to use these new page components. Navigation should work as expected.

- [x] **Step 2.5: Simplify `App.tsx`**
*   **Goal:** Make `App.tsx` responsible only for routing.
*   **Action:**
    1.  Remove any remaining data fetching or state logic from `App.tsx`.
*   **Verification:** The application should be fully functional with a clean `App.tsx`.

- [x] **Step 2.6: Clean Up Unused Files**
*   **Goal:** Keep the codebase tidy.
*   **Action:**
    1.  Delete the file `src/data/mockJobs.ts`.
*   **Verification:** The application should build and run without errors.

---
