import { Router } from 'express';
import { importService } from '../services/importService';

const router = Router();

// POST /api/import/markdown - Import jobs from JOBS_SOURCE.md
router.post('/', async (req, res, next) => {
  try {
    const result = await importService.importMarkdownJobs();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
