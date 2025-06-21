import { Router } from 'express';
import { jobService } from '../services/jobService';
import { validateJob, validateJobUpdate } from '../middleware/validation';


const router = Router();


// GET /api/jobs - Get all jobs
router.get('/', async (req, res, next) => {
  try {
    const jobs = await jobService.getAllJobs();
    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

// GET /api/jobs/:id - Get job by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const job = await jobService.getJobById(id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    next(error);
  }
});

// POST /api/jobs - Create new job
router.post('/', validateJob, async (req, res, next) => {
  try {
    const job = await jobService.createJob(req.body);

    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
});

// PUT /api/jobs/:id - Update job
router.put('/:id', validateJobUpdate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await jobService.updateJob(id, req.body);

    res.json(job);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/jobs/:id - Delete job
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    await jobService.deleteJob(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// PATCH /api/jobs/:id/status - Update job status
router.patch('/:id/status', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    const job = await jobService.updateJobStatus(id, status);

    res.json(job);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/jobs/:id/notes - Update job notes
router.patch('/:id/notes', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;
    const job = await jobService.updateJobNotes(id, notes);

    res.json(job);
  } catch (error) {
    next(error);
  }
});

export default router;