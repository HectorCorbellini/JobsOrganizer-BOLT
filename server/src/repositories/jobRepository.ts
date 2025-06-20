import prisma from '../lib/prisma';
import { Job, Prisma } from '@prisma/client';

export const jobRepository = {
  async findFirst(where: Prisma.JobWhereInput): Promise<Job | null> {
    return prisma.job.findFirst({ where });
  },

  async create(data: Prisma.JobCreateInput): Promise<Job> {
    return prisma.job.create({ data });
  },
};
