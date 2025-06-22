import { Request, Response, NextFunction } from 'express';

export const validateJob = (req: Request, res: Response, next: NextFunction) => {
  const { title, company, location, type, technologies, description, requirements } = req.body;

  if (!title || !company || !location || !type || !technologies || !description || !requirements) {
    return res.status(400).json({
      error: 'Missing required fields: title, company, location, type, technologies, description, requirements'
    });
  }

  if (!Array.isArray(technologies) || !Array.isArray(requirements)) {
    return res.status(400).json({
      error: 'Technologies and requirements must be arrays'
    });
  }

  const validTypes = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'REMOTE', 'HYBRID'];
  if (!validTypes.includes(type.toUpperCase())) {
    return res.status(400).json({
      error: `Invalid job type. Must be one of: ${validTypes.join(', ')}`
    });
  }

  next();
};

export const validateJobUpdate = (req: Request, res: Response, next: NextFunction) => {
  const { technologies, requirements, benefits } = req.body;

  if (technologies && !Array.isArray(technologies)) {
    return res.status(400).json({
      error: 'Technologies must be an array'
    });
  }

  if (requirements && !Array.isArray(requirements)) {
    return res.status(400).json({
      error: 'Requirements must be an array'
    });
  }

  if (benefits && !Array.isArray(benefits)) {
    return res.status(400).json({
      error: 'Benefits must be an array'
    });
  }

  next();
};

export const validateResponse = (req: Request, res: Response, next: NextFunction) => {
  const { jobId, date, type, message, sender } = req.body;

  if (!jobId || !date || !type || !message || !sender) {
    return res.status(400).json({
      error: 'Missing required fields: jobId, date, type, message, sender'
    });
  }

  const validTypes = ['EMAIL', 'PHONE', 'LINKEDIN', 'OTHER'];
  if (!validTypes.includes(type.toUpperCase())) {
    return res.status(400).json({
      error: `Invalid response type. Must be one of: ${validTypes.join(', ')}`
    });
  }

  next();
};