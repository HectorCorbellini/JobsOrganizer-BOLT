# JobTracker Organizer - Python Reimplementation Prompt

This document describes the complete functionality, architecture, data model, and API of the JobTracker application. Use it as a guide or prompt for an AI agent to generate a full Python-based reimplementation.

---

## 1. Application Overview

JobTracker is a full-stack job application management tool. It allows users to:

- Import lists of job opportunities from markdown or JSON files.
- View a dashboard of application progress and key metrics.
- Browse, filter, and sort all job records.
- Select a single job to view details, update status, and add notes.
- Track communication history (responses) per job.
- Get AI-powered suggestions to improve applications.
- Export and re-import data in markdown or JSON format.


## 2. Core Features

1. **Data Import/Export**
   - Bulk import jobs from `JOBS_SOURCE.md` or JSON.
   - Prevent duplicates by matching on title + company.
   - Export current jobs back to markdown or JSON.

2. **Dashboard**
   - Summary cards: counts by status (applied, interviewing, offer, rejected).
   - Priority distribution chart.
   - Recent activity feed (notes or status changes).

3. **Job List**
   - Paginated list of all jobs.
   - Filters: status, priority, technologies, location.
   - Sort by date, priority, or custom fields.
   - Select a job to open detail panel.

4. **Job Detail View**
   - Display all fields: title, company, location, salary, technologies, description.
   - Update status badge (new, applied, interviewing, offer, rejected).
   - Add/edit notes.
   - View and delete previous responses.
   - Navigate to next/previous job in sorted order.

5. **AI Suggestions**
   - Analyze job description and user notes.
   - Provide actionable tips: resume keywords, email templates.

6. **Settings & Account** (placeholder)
   - Manage user preferences (future feature).


## 3. Data Model

All types below are Pydantic/SQLAlchemy models in Python.

### Job
```
id: UUID
title: str
company: str
location: str
salary: Optional[str]
status: Literal['new','applied','interviewing','offer','rejected']
priority: Literal['high','medium','low']
technologies: List[str]
description: str
contact_info: Optional[str]
created_at: datetime
due_date: Optional[date]
```

### Response
```
id: UUID
job_id: UUID  # foreign key
content: str
date: datetime
```  

### Note
```
id: UUID
job_id: UUID  # foreign key
text: str
created_at: datetime
```  

### User (future)
```
id: UUID
email: str
hashed_password: str
settings: JSON
```  


## 4. API Specification

Use FastAPI with Pydantic schemas for validation.

### Endpoints

#### Jobs
- `GET  /api/jobs`: list all jobs with query params: status, priority, tech, location
- `GET  /api/jobs/{job_id}`: get details
- `POST /api/jobs`: create new job
- `PUT  /api/jobs/{job_id}`: update any field
- `DELETE /api/jobs/{job_id}`: delete job
- `PATCH /api/jobs/{job_id}/status`: update status only
- `PATCH /api/jobs/{job_id}/notes`: add a note
- `PATCH /api/jobs/{job_id}/priority`: update priority

#### Responses
- `GET    /api/responses`: list all responses
- `GET    /api/responses/{id}`
- `POST   /api/responses`: create new response
- `DELETE /api/responses/{id}`

#### Import/Export
- `POST  /api/import/markdown`: read markdown, return import summary
- `GET   /api/export/markdown`: output current jobs as markdown
- `POST  /api/import/json`: read JSON payload
- `GET   /api/export/json`: output current jobs as JSON


## 5. Architecture & Implementation Details

This application follows a classic client-server architecture with a clear separation of concerns between the frontend (presentation) and backend (business logic and data persistence).

### Backend Characteristics (Python/FastAPI)

The backend should be a robust, async-first RESTful API built with FastAPI, designed following clean architecture principles.

- **API Design**: Purely RESTful. Use resource-oriented URLs (e.g., `/api/jobs`, `/api/responses`) and standard HTTP methods. All request and response bodies are JSON.
- **Framework**: Use **FastAPI** for its high performance, automatic OpenAPI/Swagger documentation, and dependency injection system.
- **Database Layer**: 
  - Use **SQLAlchemy Core** or **ORM** for database interaction with a PostgreSQL database.
  - Implement the **Repository Pattern**: Create a `crud.py` or `repositories/` directory to abstract all database queries. The business logic (services) should only interact with the repository, not directly with the ORM. This isolates the database and makes testing easier.
  - Use **Alembic** for managing database schema migrations. Migrations should be version-controlled.
- **Validation**: Leverage **Pydantic** extensively. Define strict schemas for all API inputs (request bodies, query parameters) and outputs (response models). This ensures data is validated at the boundaries of the application.
- **Business Logic (Services)**: Create a `services/` layer that sits between the API routes and the repositories. This layer contains the core application logic (e.g., calculating job priority, parsing markdown files, ensuring no duplicate jobs are created). It should be framework-agnostic.
- **Concurrency**: Write all database operations and external API calls as `async` functions to take full advantage of Python's `asyncio` and FastAPI's performance.
- **Configuration**: Use a `.env` file for all configuration (database URL, secrets, etc.) and load it using Pydantic's `BaseSettings`.
- **Testing**: Use `pytest` with `httpx` for integration testing the API endpoints and `unittest.mock` for unit testing services and repositories in isolation.

### Frontend Characteristics (React/Vite or Jinja2/HTMX)

The frontend should be a responsive, single-page application (SPA) that provides a smooth and intuitive user experience.

- **UI/UX Philosophy**: The design should be clean, modern, and data-driven. Key information should be readily accessible. The layout should be responsive, working well on both desktop and mobile screens.
- **Framework**: A modern JavaScript framework like **React with Vite and TypeScript** is ideal. Alternatively, for a simpler server-rendered approach, use **Jinja2** templates with **HTMX** or Alpine.js for dynamic interactions.
- **Component Structure (React Example)**:
  - `MainLayout.tsx`: A top-level component containing the fixed `Sidebar` and the main content area where pages are rendered.
  - `Sidebar.tsx`: Contains navigation links (`NavLink` from React Router), the application logo, and action buttons like "Import Jobs" and "Settings."
  - `pages/`: Directory for top-level page components like `DashboardPage.tsx`, `JobListPage.tsx`, etc. These components are responsible for fetching data for that specific view.
  - `components/Dashboard/`: A set of widgets for the dashboard, such as `StatsGrid.tsx` (for key numbers), `PriorityDistribution.tsx` (for charts, using a library like Recharts), and `RecentActivity.tsx`.
  - `components/JobList/`: Components for the main job list view, including filters and individual list items.
  - `components/JobCard/`: A detailed view panel for a single selected job. It shows all data fields and includes forms for updating status or adding notes.
  - `components/Common/`: Reusable, generic components like `LoadingSpinner.tsx`, `ConnectionError.tsx`, and `PriorityBadge.tsx`.
- **State Management**: Use a centralized state management solution. **React Context** is sufficient for this application's complexity. A `JobProvider` context can wrap the application and manage the global state: the list of all jobs, the currently selected job, loading status, and error messages. This avoids prop-drilling.
- **Routing**: Use **React Router** to handle client-side routing. Define routes for `/`, `/jobs`, `/suggestions`, etc., mapping each path to its corresponding page component.
- **Styling**: Use **Tailwind CSS** for a utility-first styling approach. This allows for rapid development of custom designs without writing custom CSS.
- **API Interaction**: Create a dedicated service layer (e.g., `services/api.ts`) that centralizes all `fetch` or `axios` calls to the backend. This service will handle API requests, responses, and error handling.

### CV Architecture & Processing

To fully align with the project's original vision, the application will incorporate a robust system for handling user CVs. This system will allow users to upload their CV, which will then be parsed and used to generate highly personalized suggestions for each job application.

The detailed plan for this functionality, including the proposed data models, API endpoints, and service logic, is outlined in a separate document.

**[See the full CV Architecture Plan](./CV_ARCH.md)**

This architecture will be a core component of the Python reimplementation.

## 6. Recommended Folder Structure

```
backend/                  # Python FastAPI service
├── app/
│   ├── main.py           # FastAPI entry
│   ├── models.py         # SQLAlchemy models
│   ├── schemas.py        # Pydantic schemas
│   ├── crud.py           # DB operations
│   ├── api/
│   │   ├── jobs.py       # routers
│   │   └── responses.py
│   └── utils.py          # import/export logic
├── migrations/           # Alembic migration scripts
└── Dockerfile

frontend/                 # (Optional) Jinja2 templates or React SPA
├── templates/            # Jinja2 HTML + Tailwind
├── static/               # CSS, JS
└── package.json

shared/                   # domain types or client SDK

tests/                    # pytest suites for each layer

.env                      # environment variables
docker-compose.yml        # for Postgres + FastAPI service
```

## 7. Implementation Guidelines for AI Agent

1. **Project Init**: Create Python virtual env, install FastAPI, Uvicorn, SQLAlchemy, Pydantic, Alembic, Markdown parser.
2. **Models & Migrations**: Define SQLAlchemy models and run Alembic auto-generate.
3. **CRUD & Schemas**: Implement `crud.py` and Pydantic schemas for validation.
4. **Routers**: Set up FastAPI routers under `app/api`.
5. **Import Logic**: Use `markdown` or `mistune` to parse imports; deduplicate on title+company.
6. **Frontend**: Build simple Jinja2 templates with Tailwind for UI or scaffold React/Vite if SPA.
7. **Testing**: Write pytest for models, crud, and API endpoints.
8. **Docker**: Containerize service and database, orchestrate with docker-compose.

---

Use this spec as a comprehensive prompt to recreate the JobTracker Organizer application entirely in Python.

## JOBS_SOURCE.md Contents

`JOBS_SOURCE.md` contains the raw markdown listings of job opportunities. It is structured with:

- Section headings naming each project and organization
- Bullet points for details such as location, stipend/salary, required technologies, project description, and contact info
- Nested lists for additional notes and links to resources
- Plain markdown format, ready for parsing or manual review

