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
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd job-tracker
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Set up the backend**
   ```bash
   cd server
   npm install
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/jobtracker?schema=public"
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

5. **Set up the database**
   ```bash
   cd server
   npm run db:generate  # Generate Prisma client
   npm run db:push      # Push schema to database
   npm run db:seed      # Seed with sample data
   ```

### Development

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   npm run dev
   ```

3. **Or run both simultaneously**
   ```bash
   npm run dev:full
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