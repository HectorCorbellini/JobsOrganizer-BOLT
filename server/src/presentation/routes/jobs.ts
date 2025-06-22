import { Router } from 'express';
import * as jobController from '../controllers/jobController.js';
import { validateJob, validateJobUpdate } from '../middleware/validation.js';


const router = Router();


// GET /api/jobs - Get all jobs
router.get('/', jobController.getAllJobs);

// GET /api/jobs/:id - Get job by ID
router.get('/:id', jobController.getJobById);

// POST /api/jobs - Create new job
router.post('/', validateJob, jobController.createJob);

// PUT /api/jobs/:id - Update job
router.put('/:id', validateJobUpdate, jobController.updateJob);

// DELETE /api/jobs/:id - Delete job
router.delete('/:id', jobController.deleteJob);

// PATCH /api/jobs/:id/status - Update job status
router.patch('/:id/status', jobController.updateJobStatus);

// PATCH /api/jobs/:id/notes - Update job notes
router.patch('/:id/notes', jobController.updateJobNotes);

export default router;