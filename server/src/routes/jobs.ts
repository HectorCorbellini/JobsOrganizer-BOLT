import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateJob, validateJobUpdate } from '../middleware/validation';
import { transformJobFromDB, transformJobToDB } from '../utils/transformers';

const router = Router();
const prisma = new PrismaClient();

// GET /api/jobs - Get all jobs
router.get('/', async (req, res, next) => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        responses: {
          orderBy: { date: 'desc' }
        }
      },
      orderBy: { dateAdded: 'desc' }
    });

    const transformedJobs = jobs.map(transformJobFromDB);
    res.json(transformedJobs);
  } catch (error) {
    next(error);
  }
});

// GET /api/jobs/:id - Get job by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        responses: {
          orderBy: { date: 'desc' }
        }
      }
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(transformJobFromDB(job));
  } catch (error) {
    next(error);
  }
});

// POST /api/jobs - Create new job
router.post('/', validateJob, async (req, res, next) => {
  try {
    const jobData = transformJobToDB(req.body);
    
    const job = await prisma.job.create({
      data: jobData,
      include: {
        responses: true
      }
    });

    res.status(201).json(transformJobFromDB(job));
  } catch (error) {
    next(error);
  }
});

// PUT /api/jobs/:id - Update job
router.put('/:id', validateJobUpdate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const jobData = transformJobToDB(req.body);

    const job = await prisma.job.update({
      where: { id },
      data: jobData,
      include: {
        responses: {
          orderBy: { date: 'desc' }
        }
      }
    });

    res.json(transformJobFromDB(job));
  } catch (error) {
    next(error);
  }
});

// DELETE /api/jobs/:id - Delete job
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.job.delete({
      where: { id }
    });

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

    const updateData: any = { status: status.toUpperCase() };
    
    // Set application date when status changes to APPLIED
    if (status.toUpperCase() === 'APPLIED') {
      updateData.applicationDate = new Date();
    }

    const job = await prisma.job.update({
      where: { id },
      data: updateData,
      include: {
        responses: {
          orderBy: { date: 'desc' }
        }
      }
    });

    res.json(transformJobFromDB(job));
  } catch (error) {
    next(error);
  }
});

// PATCH /api/jobs/:id/notes - Update job notes
router.patch('/:id/notes', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const job = await prisma.job.update({
      where: { id },
      data: { notes },
      include: {
        responses: {
          orderBy: { date: 'desc' }
        }
      }
    });

    res.json(transformJobFromDB(job));
  } catch (error) {
    next(error);
  }
});

export default router;