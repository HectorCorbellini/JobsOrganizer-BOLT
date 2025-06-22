# Clean Architecture Refactoring Guide for JobTracker

This document outlines a plan to refactor the JobTracker application to align with the principles of **Clean Architecture**. The goal is to create a more maintainable, scalable, and testable codebase by separating concerns and establishing a clear dependency flow.

## 1. Current Architecture Analysis

The project is a monorepo with a React frontend and a Node.js/Express backend. Both have a logical structure, but they can be improved by formalizing the layers of abstraction.

### Backend (Server)

The backend currently follows a layered architecture, which is a great starting point:

-   `routes/`: Handles HTTP requests and routing.
-   `services/`: Contains the business logic.
-   `repositories/`: Manages data access using Prisma.
-   `middleware/`: Express middleware for concerns like logging and error handling.

**Strengths:**
-   Good separation of concerns between HTTP handling, business logic, and data access.

**Weaknesses:**
-   **Loose Dependency Rule:** There's no strict enforcement of dependencies. For example, `routes` might directly access `repositories`, or `services` might contain framework-specific code.
-   **Domain Logic Scattered:** The core business rules (the "domain") are not explicitly defined and are often mixed within the `services`.

### Frontend (Client)

The frontend uses a standard component-based architecture:

-   `pages/`: Top-level components for each route.
-   `components/`: Reusable UI components.
-   `services/`: Handles API communication.
-   `hooks/`: Custom React hooks for shared logic.
-   `context/`: State management.

**Strengths:**
-   Well-organized component structure.
-   Separation of API calls from UI components.

**Weaknesses:**
-   **Business Logic in UI:** Application logic is often tightly coupled with React components and hooks, making it hard to test independently of the UI.
-   **No Formal Domain:** Core data structures and rules are not formally defined, leading to potential inconsistencies.

## 2. Proposed Clean Architecture

We will introduce a more formal, four-layered architecture for both the backend and frontend. The fundamental rule is the **Dependency Rule**: *source code dependencies can only point inwards*. Nothing in an inner circle can know anything at all about something in an outer circle.

![Clean Architecture Diagram](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

### Backend Refactoring Plan

We will restructure the `server/src` directory as follows:

```
server/src/
├── domain/               # 1. Domain Layer (Entities, Value Objects, Interfaces)
│   ├── entities/
│   ├── repositories/
│   └── ...
├── application/          # 2. Application Layer (Use Cases, DTOs)
│   ├── use-cases/
│   ├── dtos/
│   └── ...
├── infrastructure/       # 3. Infrastructure Layer (Database, External APIs)
│   ├── database/
│   │   └── prisma/
│   └── ...
└── presentation/         # 4. Presentation Layer (Express Routes, Controllers)
    ├── controllers/
    ├── routes/
    └── middleware/
```

**Layers Explained:**

1.  **Domain:** Contains the core business logic and entities (e.g., `Job`, `User`). It has **zero dependencies** on any other layer.
    -   **Action:** Define repository interfaces here (e.g., `IJobRepository`).

2.  **Application:** Contains the application-specific business rules (use cases). It orchestrates the flow of data between the domain and the infrastructure.
    -   **Action:** Move logic from the current `services/` here, structuring them as use cases (e.g., `CreateJob.ts`, `GetJobById.ts`). These use cases will depend on the repository interfaces from the Domain layer.

3.  **Infrastructure:** Implements the details. This includes the database, external APIs, etc. It implements the interfaces defined in the layers above it.
    -   **Action:** Move the Prisma-specific repository implementations from `repositories/` to `infrastructure/database/prisma/`. These implementations will conform to the `IJobRepository` interface.

4.  **Presentation:** The outermost layer. It's responsible for handling user interaction (API requests).
    -   **Action:** The current `routes/` will be part of this layer. We'll introduce controllers to decouple the Express framework from the use cases.

### Frontend Refactoring Plan

We will apply the same principles to the `src` directory:

```
src/
├── domain/               # 1. Domain Layer (Entities, Types)
│   ├── models/
│   └── ...
├── application/          # 2. Application Layer (State Management, Hooks)
│   ├── hooks/
│   ├── services/         # (Repository Interfaces)
│   └── ...
├── infrastructure/       # 3. Infrastructure Layer (API fetching)
│   └── api/
└── presentation/         # 4. Presentation Layer (React Components)
    ├── components/
    ├── pages/
    └── ...
```

**Layers Explained:**

1.  **Domain:** Core data structures and types (e.g., `Job` type). No framework dependencies.

2.  **Application:** Manages application state and logic. Custom hooks that represent use cases (e.g., `useJobApplication`) belong here. This layer will define interfaces for data fetching services (e.g., `IJobApi`).

3.  **Infrastructure:** Implements data fetching. The current `services/` will move here and implement the interfaces from the Application layer.

4.  **Presentation:** The UI. React components should be as "dumb" as possible, receiving data and callbacks from the Application layer (hooks).

## 3. Step-by-Step Refactoring Guide

### Phase 1: Backend Refactoring

1.  [x] **Create New Directories:** Create the `domain`, `application`, `infrastructure`, and `presentation` directories in `server/src`.
2.  [x] **Define Domain:**
    -   Move Prisma schema-defined types into `domain/entities`.
    -   Define repository interfaces in `domain/repositories` (e.g., `export interface IJobRepository { ... }`).
3.  [x] **Implement Infrastructure:**
    -   Move the current `repositories/` content into `infrastructure/database/prisma/`.
    -   Update these classes to implement the new interfaces (e.g., `class PrismaJobRepository implements IJobRepository { ... }`).
4.  [x] **Create Application Layer:**
    -   Refactor the logic from `services/` into use cases within `application/use-cases/`.
    -   Use dependency injection to provide repository implementations to the use cases.
5.  [x] **Update Presentation Layer:**
    -   Scaffold controller files (`jobController.ts`, `responseController.ts`, `importController.ts`) under `server/src/presentation/controllers/`.
    -   Replace each `routes/*.ts` file with a minimal router that imports and delegates to the correct controller (e.g. `import * as jobController from '../controllers/jobController.js'; router.get('/', jobController.getAllJobs);`).
    -   Run the server and verify each endpoint still works before proceeding.

### Phase 2: Frontend Refactoring

1.  [x] **Create New Directories:** Create the `domain`, `application`, `infrastructure`, and `presentation` directories in `src`.
2.  [x] **Define Domain:** Move shared types into `domain/models`.
3.  [x] **Separate Infrastructure:**
    -   [x] Move the API fetching logic from `services/` to `infrastructure/api/`.
    -   [x] Define interfaces for these services in the `application/services` directory and implement them in the infrastructure layer.
4.  **Refine Application Layer:**
    -   Ensure custom hooks in `application/hooks` are purely for application logic and state management, calling the infrastructure layer for data.
5.  **Clean Up Presentation Layer:**
    -   Move all UI-related components into `presentation/`.
    -   Ensure components are primarily concerned with rendering UI and delegating events to the application layer hooks.

By following this guide, the JobTracker application will have a robust, decoupled, and highly maintainable architecture that can easily adapt to future changes.

## 4. Detailed Frontend Refactoring Steps

This is a more granular breakdown of the Frontend Refactoring phase.

### Step 4: Refine Application Layer (Move Hooks)

4.1 Move and verify `useJobs` hook

1. Move the hook:
```bash
mv src/hooks/useJobs.ts src/application/hooks/useJobs.ts
```
2. Update import in `src/context/JobContext.tsx`:
```diff
-import { useJobs } from '../hooks/useJobs';
+import { useJobs } from '../application/hooks/useJobs';
```
3. Run and verify:
```bash
npm run dev:full
```

4.2 Move and verify `useJobList` hook

1. Move the hook:
```bash
mv src/hooks/useJobList.ts src/application/hooks/useJobList.ts
```
2. Update import in `src/components/JobList.tsx`:
```diff
-import { useJobList } from '../hooks/useJobList';
+import { useJobList } from '../application/hooks/useJobList';
```
3. Run and verify:
```bash
npm run dev:full
```

4.3 Move and verify `useDashboardStats` hook

1. Move the hook:
```bash
mv src/hooks/useDashboardStats.ts src/application/hooks/useDashboardStats.ts
```
2. Update import in `src/components/Dashboard.tsx`:
```diff
-import { useDashboardStats } from '../hooks/useDashboardStats';
+import { useDashboardStats } from '../application/hooks/useDashboardStats';
```
3. Run and verify:
```bash
npm run dev:full
```



### Step 5: Clean Up Presentation Layer (Move UI)

5.1 Move UI components

1. Move UI components:
```bash
mv src/components/* src/presentation/components/
```
2. Update import paths in `src/App.tsx` and relevant pages:
```diff
-import MainLayout from './components/Layout/MainLayout';
+import MainLayout from './presentation/components/Layout/MainLayout';
```
3. Run and verify:
```bash
npm run dev:full
```

5.2 Move pages

1. Move pages:
```bash
mv src/pages/* src/presentation/pages/
```
2. Update import paths in router (`src/App.tsx`):
```diff
-import DashboardPage from './pages/DashboardPage';
+import DashboardPage from './presentation/pages/DashboardPage';
```
3. Run and verify:
```bash
npm run dev:full
```

5.3 Tidy up

1. Remove now-empty directories:
```bash
rm -rf src/components src/pages
```
2. Final run:
```bash
npm run dev:full
```

DETAILED PHASE 2 FROM STEP 4
(SO RISKY)

— Phase 2, Step 4: Refine Application Layer (move hooks)
4.1 Move and verify useJobs
• 4.1.1 mv 
src/hooks/useJobs.ts
/home/uko/BOLTNEW-ORGANIZER/Organizer-/src/hooks/useJobs.ts
 → src/application/hooks/useJobs.ts
• 4.1.2 In 
src/context/JobContext.tsx
, update
diff     - import { useJobs } from '../hooks/useJobs';     + import { useJobs } from '../application/hooks/useJobs';     
• 4.1.3 Run dev, confirm JobContext compiles and pages load.

4.2 Move and verify useJobList
• 4.2.1 mv 
src/hooks/useJobList.ts
 → src/application/hooks/useJobList.ts
• 4.2.2 In 
src/components/JobList.tsx
, update
diff     - import { useJobList } from '../hooks/useJobList';     + import { useJobList } from '../application/hooks/useJobList';     
• 4.2.3 Run dev, confirm JobList renders.

4.3 Move and verify useDashboardStats
• 4.3.1 mv 
src/hooks/useDashboardStats.ts
 → src/application/hooks/useDashboardStats.ts
• 4.3.2 In 
src/components/Dashboard.tsx
, update
diff     - import { useDashboardStats } from '../hooks/useDashboardStats';     + import { useDashboardStats } from '../application/hooks/useDashboardStats';     
• 4.3.3 Run dev, confirm Dashboard renders.

— Phase 2, Step 5: Clean Up Presentation Layer (move UI)
5.1 Move UI components
• 5.1.1 mv src/components/* → src/presentation/components/
• 5.1.2 In 
src/App.tsx
 and any pages under src/presentation/pages (or soon-to-be moved), update imports, e.g.
diff     - import MainLayout from './components/Layout/MainLayout';     + import MainLayout from './presentation/components/Layout/MainLayout';     
• 5.1.3 Run dev, confirm layout and all child components load.

5.2 Move pages
• 5.2.1 mv src/pages/* → src/presentation/pages/
• 5.2.2 In your router (e.g. 
App.tsx
), update imports, e.g.
diff     - import DashboardPage from './pages/DashboardPage';     + import DashboardPage from './presentation/pages/DashboardPage';     
• 5.2.3 Run dev, click through each route to verify.

5.3 Tidy up
• 5.3.1 Remove now-empty src/components and src/pages directories.
• 5.3.2 Final dev run to ensure no stray imports remain.

Once you’ve verified each micro-step, you’ll end up with:

All hooks under src/application/hooks
All UI under src/presentation
A purely “presentation” layer with no business logic

</details>

> **Note on Step 5:** The last two steps in this guide (Phase 2 Step 5: moving UI into `presentation/` and deleting the original `src/components` and `src/pages` folders) are primarily a cosmetic folder-structure cleanup and are not strictly required to maintain a robust Clean Architecture. The core goals—separating domain, application, infrastructure, and presentation layers and enforcing inward dependencies—have already been achieved by your previous refactors. You can safely defer or skip Step 5 if it causes breakages. If you wish to tidy UI paths gradually, consider moving components/pages incrementally and/or using TypeScript path aliases (via `tsconfig.json`) to simplify import updates.