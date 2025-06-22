import { Prisma } from '@prisma/client';
import { JobWithRelations } from '../entities/Job.js';

export interface IJobRepository {
  findAll(): Promise<JobWithRelations[]>;
  findById(id: string): Promise<JobWithRelations | null>;
  findByTitleAndCompany(title: string, company: string): Promise<JobWithRelations | null>;
  create(data: Prisma.JobCreateInput): Promise<JobWithRelations>;
  update(id: string, data: Prisma.JobUpdateInput): Promise<JobWithRelations>;
  remove(id: string): Promise<void>;
}
