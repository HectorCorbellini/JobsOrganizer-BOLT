import { Router } from 'express';
import * as responseController from '../controllers/responseController.js';
import { validateResponse } from '../middleware/validation.js';

const router = Router();

// POST /api/responses - Create new response
router.post('/', validateResponse, responseController.createResponse);

// GET /api/responses/job/:jobId - Get responses for a job
router.get('/job/:jobId', responseController.getResponsesByJob);

// DELETE /api/responses/:id - Delete response
router.delete('/:id', responseController.deleteResponse);

export default router;