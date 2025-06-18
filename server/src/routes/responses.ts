import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateResponse } from '../middleware/validation';

const router = Router();
const prisma = new PrismaClient();

// POST /api/responses - Create new response
router.post('/', validateResponse, async (req, res, next) => {
  try {
    const { jobId, date, type, message, sender } = req.body;

    const response = await prisma.response.create({
      data: {
        jobId,
        date: new Date(date),
        type: type.toUpperCase(),
        message,
        sender
      }
    });

    res.status(201).json({
      id: response.id,
      date: response.date.toISOString(),
      type: response.type.toLowerCase(),
      message: response.message,
      sender: response.sender
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/responses/job/:jobId - Get responses for a job
router.get('/job/:jobId', async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const responses = await prisma.response.findMany({
      where: { jobId },
      orderBy: { date: 'desc' }
    });

    const transformedResponses = responses.map(response => ({
      id: response.id,
      date: response.date.toISOString(),
      type: response.type.toLowerCase(),
      message: response.message,
      sender: response.sender
    }));

    res.json(transformedResponses);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/responses/:id - Delete response
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.response.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;