import { Request, Response, NextFunction } from 'express';
import { importService } from '../../application/use-cases/importService.js';

export const importMarkdownJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await importService.importMarkdownJobs();
    res.json(result);
  } catch (err) {
    next(err);
  }
};
