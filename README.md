# JobTracker - Job Application Assistant

A full-stack application for managing job applications with a React frontend and Node.js/Express backend with PostgreSQL database.

## Features

- **Dashboard**: Overview of application progress and statistics
- **Job Management**: Track job applications with detailed information
- **Status Tracking**: Monitor application status from initial review to final outcome
- **Priority System**: Automatically calculate job priorities based on location, technologies, and compensation
- **Notes & Communication**: Track communication history and add personal notes
- **Suggestions**: AI-powered recommendations for improving applications

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Vite for development and building

### Backend
- Node.js with Express.js
- PostgreSQL database
- Prisma ORM
- TypeScript

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Docker and Docker Compose
- npm

### 1. Clone & Install

First, clone the repository and install all dependencies for both the frontend and backend with a single command from the project root.

```bash
git clone <repository-url>
cd <repository-folder>
npm install && (cd server && npm install)
```

### 2. Configure Environment

Next, create the environment file for the server and ensure it has the correct database connection string.

```bash
# From the project root
cd server
cp .env.example .env
```

Open the newly created `server/.env` file and make sure the `DATABASE_URL` is exactly as follows:

```env
DATABASE_URL="postgresql://jobtracker_user:jobtracker_password@localhost:5433/jobtracker?schema=public"
```

### 3. Start Database & Apply Schema

With the configuration in place, start the PostgreSQL database using Docker and apply the database schema with Prisma Migrate. Run these commands from the **project root**.

```bash
# Start the database container in the background
docker-compose up -d

# Apply the database schema
(cd server && npx prisma migrate dev --name init)
```

### 4. Run the Application

Finally, run the entire application (both frontend and backend) with a single command from the **project root**.

```bash
npm run dev:full
```

The servers will start concurrently. You can access the application at `http://localhost:5173` (or the port specified in the terminal).

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

## Deployment to GitHub

To upload this project to a new GitHub repository:

1. **Create a new repository on GitHub**
   - Go to [GitHub](https://github.com/new)
   - Choose a name for your repository (e.g., `JobsOrganizer-BOLT`)
   - Keep it public or private as per your preference
   - Do NOT initialize with a README, .gitignore, or license

2. **Initialize Git and push to GitHub**
   ```bash
   # Initialize git repository
   git init -b main
   
   # Add all files
   git add .
   
   # Make initial commit
   git commit -m "Initial commit"
   
   # Add the remote repository
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY-NAME.git
   
   # Push to GitHub
   git push -u origin main
   ```
   Replace `YOUR-USERNAME` with your GitHub username and `YOUR-REPOSITORY-NAME` with your repository name.

3. **Set up GitHub token (if required)**
   - If you get authentication errors, you'll need to create a personal access token:
     1. Go to GitHub > Settings > Developer settings > Personal access tokens > Tokens (classic)
     2. Generate a new token with 'repo' scope
     3. Use this token as your password when pushing

4. **For existing repositories**
   If you're adding to an existing repository, first pull any changes:
   ```bash
   git pull origin main --allow-unrelated-histories
   ```
   Then push your changes:
   ```bash
   git push -u origin main
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### API Endpoints

#### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `PATCH /api/jobs/:id/status` - Update job status
- `PATCH /api/jobs/:id/notes` - Update job notes

#### Responses
- DELETE /api/responses/:id - Delete response

#### Import
- POST /api/import/markdown - Import jobs from `JOBS_SOURCE.md` into the database. Returns JSON with counts of created and skipped jobs.
- `POST /api/responses` - Create new response
- `GET /api/responses/job/:jobId` - Get responses for a job
- `DELETE /api/responses/:id` - Delete response

### Database Schema

The application uses the following main entities:

- **Job**: Core job application data
- **Response**: Communication history for each job

See `server/prisma/schema.prisma` for the complete schema definition.

### Project Structure

```
├── src/                    # Frontend source code
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