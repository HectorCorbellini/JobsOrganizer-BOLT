import { Request, Response, NextFunction } from 'express';
import { responseService } from '../../application/use-cases/responseService.js';

export const createResponse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newResponse = await responseService.create(req.body);
    res.status(201).json(newResponse);
  } catch (err) {
    next(err);
  }
};

export const getResponsesByJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobId } = req.params;
    const responses = await responseService.getByJobId(jobId);
    res.json(responses);
  } catch (err) {
    next(err);
  }
};

export const deleteResponse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await responseService.delete(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
