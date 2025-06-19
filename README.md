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
- Docker and Docker Compose (for running the PostgreSQL database)
- npm or yarn

### Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd job-tracker
    ```

2.  **Install all dependencies**

    This installs dependencies for both the root project (frontend) and the `server` (backend).
    ```bash
    npm install && (cd server && npm install)
    ```

3.  **Set up environment variables**

    Navigate to the server directory and create a `.env` file from the example.
    ```bash
    cd server
    cp .env.example .env
    ```
    The default `DATABASE_URL` in the `.env` file is configured to work with the Docker setup.

4.  **Start the database**

    A Docker Compose file is provided to easily run a PostgreSQL database in a container.
    ```bash
    docker-compose up -d
    ```

5.  **Set up the database schema**

    This command creates the necessary tables in your database.
    ```bash
    cd server
    npx prisma migrate dev --name init
    ```

6.  **Import job data (Optional)**

    To populate the database with the initial job listings from `JOBS_SOURCE.md`:
    ```bash
    cd server
    npm run db:import
    ```

### Running the Application

To run the entire application (both frontend and backend) with a single command, run the following from the **project root**:

```bash
npm run dev:full
```

This will start both servers concurrently. You can access the application in your browser at the URL provided in the terminal output (usually `http://localhost:5174` or similar).

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