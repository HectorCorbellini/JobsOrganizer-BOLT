import { Router } from 'express';
import { responseService } from '../services/responseService';
import { validateResponse } from '../middleware/validation';

const router = Router();


// POST /api/responses - Create new response
router.post('/', validateResponse, async (req, res, next) => {
  try {
    const newResponse = await responseService.create(req.body);
    res.status(201).json(newResponse);
  } catch (error) {
    next(error);
  }
});

// GET /api/responses/job/:jobId - Get responses for a job
router.get('/job/:jobId', async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const responses = await responseService.getByJobId(jobId);
    res.json(responses);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/responses/:id - Delete response
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await responseService.delete(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;