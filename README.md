# JobTracker - Job Application Assistant

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0+-339933.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg)](https://www.postgresql.org/)

A full-stack application for managing job applications with a modern React frontend and Node.js/Express backend with PostgreSQL database.

A full-stack application for managing job applications with a React frontend and Node.js/Express backend with PostgreSQL database.

## ✨ Features

- **Modern Dashboard**: Clean, responsive interface with key metrics and statistics
- **Job Management**: Track all job applications with detailed information
- **Smart Priority System**: Automatic priority calculation based on multiple factors
- **Status Tracking**: Visual indicators for application status (applied, interviewing, offer, etc.)
- **Notes & Communication**: Track all interactions with potential employers
- **AI-Powered Suggestions**: Get recommendations for improving your applications
- **Responsive Design**: Works on desktop and mobile devices
- **Data Import/Export**: Easily import job listings and export your data

## Tech Stack

## 🛠 Tech Stack

### Frontend
- ⚛️ React 18 with TypeScript
- 🎨 Tailwind CSS for styling
- 🔍 React Router for navigation
- 📊 Recharts for data visualization
- 🎯 React Context API for state management
- ⚡ Vite for fast development and building

### Backend
- 🚀 Node.js with Express.js
- 🐘 PostgreSQL database with Docker
- 🔑 Prisma ORM for database operations
- 📦 TypeScript for type safety
- 🔄 RESTful API design

## 🚀 Getting Started

This project uses a monorepo structure with a single command to set up and run both frontend and backend services.

### Prerequisites

- **Node.js**: v18 or higher
- **Docker**: Docker and Docker Compose must be installed and running.
- **npm**: Included with Node.js.

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Configure the Environment

Next, create the environment file for the server. This only needs to be done once.

```bash
# From the project root, navigate to the server directory
cd server

# Copy the example environment file
cp .env.example .env
```

Open the newly created `server/.env` file and ensure the `DATABASE_URL` is set correctly:

```env
DATABASE_URL="postgresql://jobtracker_user:jobtracker_password@localhost:5433/jobtracker?schema=public"
```

### 3. Start the Application

With the setup complete, you can now start the entire application with a single command from the **project root**.

```bash
npm run start:app
```

This command will automatically:

1.  **Install all dependencies** for both the frontend and backend.
2.  **Start the PostgreSQL database** using Docker.
3.  **Set up the database schema** with Prisma.
4.  **Start the backend server**, automatically finding a free port if the default is busy.
5.  **Start the frontend server**, which waits for the backend to be ready before launching.

The application will be available at the URL shown in the terminal (usually `http://localhost:5173` or the next available port).

### 5. Populate the Database (Optional)

After starting the application, you can populate the database with the sample job data from `JOBS_SOURCE.md`. There are two ways to do this:

**Method 1: Using the Import Script**

Run the following command from the `server` directory. This is useful for the initial setup.

```bash
# From the server directory
npm run db:import
```

**Method 2: Using the API Endpoint**

While the application is running, you can trigger the import by sending a POST request to the API. This is useful for re-importing data without restarting the server.

```bash
curl -X POST http://localhost:3001/api/import/markdown
```
This will return a JSON response indicating the number of created and skipped jobs.

## Troubleshooting

### Port in Use Errors

If you encounter an error like `Error: listen EADDRINUSE: address already in use`, it means a previous server instance is still running. Before starting the application, it's a good practice to ensure all old processes are stopped.

You can do this by running the following command from the project root:

```bash
# This command forcefully stops any lingering server or vite processes.
pkill -f "(concurrently|tsx|vite)" || true
```

After running this, you can safely start the application with `npm run dev:full`.

## 📦 Deployment

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- Git

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/JobsOrganizer-BOLT.git
   cd JobsOrganizer-BOLT
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Start the development environment:
   ```bash
   # Install dependencies
   npm install
   
   # Start the application
   npm run dev
   ```

4. Open [http://localhost:5174](http://localhost:5174) in your browser.

### Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

### Docker Deployment

```bash
# Build and start containers
docker-compose up --build

# Stop containers
docker-compose down
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 📚 Documentation

### API Reference

#### Jobs
- `GET /api/jobs` - List all jobs with optional filtering
- `GET /api/jobs/:id` - Get job details by ID
- `POST /api/jobs` - Create a new job application
- `PUT /api/jobs/:id` - Update job details
- `DELETE /api/jobs/:id` - Delete a job application
- `PATCH /api/jobs/:id/status` - Update job status
- `PATCH /api/jobs/:id/priority` - Update job priority

#### Responses
- `GET /api/responses` - List all responses
- `GET /api/responses/:id` - Get response by ID
- `POST /api/responses` - Create new response
- `PUT /api/responses/:id` - Update response
- `DELETE /api/responses/:id` - Delete response
- `GET /api/responses/job/:jobId` - Get responses for a specific job

#### Import/Export
- `POST /api/import/markdown` - Import jobs from markdown
- `GET /api/export/markdown` - Export jobs to markdown format
- `POST /api/import/json` - Import jobs from JSON
- `GET /api/export/json` - Export jobs to JSON format

## 🗄 Database Schema

The application uses a PostgreSQL database with the following main entities:

- **Job**: Core job application data (title, company, status, etc.)
- **Response**: Communication history for each job
- **Note**: Additional notes for jobs
- **User**: Application users (for future authentication)

See `server/prisma/schema.prisma` for the complete schema definition.

### Migrations

To create and apply database migrations:

```bash
# Create a new migration
npx prisma migrate dev --name your_migration_name

# Apply pending migrations
npx prisma migrate deploy
```

## 🏗 Project Structure

```
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Common/        # Common UI components
│   │   ├── Dashboard/     # Dashboard-specific components
│   │   ├── JobCard/       # Job card related components
│   │   └── Layout/        # Layout components (sidebar, header, etc.)
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── services/         # API service layer
│   └── types/            # TypeScript type definitions
├── server/
│   ├── prisma/          # Database schema and migrations
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Express middleware
│   │   ├── routes/      # API route definitions
│   │   ├── services/    # Business logic
│   │   └── utils/       # Utility functions
│   └── .env             # Environment configuration
├── public/              # Static assets
├── .github/             # GitHub workflows and templates
├── .vscode/             # VS Code settings
├── .eslintrc.json       # ESLint configuration
├── .prettierrc          # Prettier configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies and scripts
│   ├── components/         # React components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API service layer
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── server/                # Backend source code
│   ├── src/
│   │   ├── routes/        # Express routes
│   │   ├── middleware/    # Express middleware
│   │   ├── utils/         # Utility functions
│   │   └── scripts/       # Database scripts
│   └── prisma/            # Database schema and migrations
└── public/                # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.