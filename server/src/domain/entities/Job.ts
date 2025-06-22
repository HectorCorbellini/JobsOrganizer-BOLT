import { Job, Response } from '@prisma/client';

export type JobWithRelations = Job & {
  responses: Response[];
};
