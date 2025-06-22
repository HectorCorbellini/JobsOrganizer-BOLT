import { Router } from 'express';
import * as importController from '../controllers/importController.js';

const router = Router();

// POST /api/import/markdown - Import jobs from JOBS_SOURCE.md
router.post('/', importController.importMarkdownJobs);

export default router;
