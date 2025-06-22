import { Request, Response, NextFunction } from 'express';
import { jobService } from '../../application/use-cases/jobService.js';

export const getAllJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobs = await jobService.getAllJobs();
    res.json(jobs);
  } catch (err) {
    next(err);
  }
};

export const getJobById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const job = await jobService.getJobById(id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    next(err);
  }
};

export const createJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const job = await jobService.createJob(req.body);
    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
};

export const updateJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const job = await jobService.updateJob(id, req.body);
    res.json(job);
  } catch (err) {
    next(err);
  }
};

export const deleteJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await jobService.deleteJob(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const updateJobStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    const job = await jobService.updateJobStatus(id, status);
    res.json(job);
  } catch (err) {
    next(err);
  }
};

export const updateJobNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;
    const job = await jobService.updateJobNotes(id, notes);
    res.json(job);
  } catch (err) {
    next(err);
  }
};
