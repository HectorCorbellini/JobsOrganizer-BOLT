import prisma from '../lib/prisma';
import { Prisma } from '@prisma/client';

const jobWithRelations = Prisma.validator<Prisma.JobDefaultArgs>()({
  include: {
    responses: {
      orderBy: {
        date: 'desc',
      },
    },
  },
});

export type JobWithRelations = Prisma.JobGetPayload<typeof jobWithRelations>;

export const jobRepository = {
  async findAll(): Promise<JobWithRelations[]> {
    return prisma.job.findMany({
      ...jobWithRelations,
      orderBy: { dateAdded: 'desc' },
    });
  },

  async findById(id: string): Promise<JobWithRelations | null> {
    return prisma.job.findUnique({
      where: { id },
      ...jobWithRelations,
    });
  },

  async create(data: Prisma.JobCreateInput): Promise<JobWithRelations> {
    return prisma.job.create({
      data,
      ...jobWithRelations,
    });
  },

  async update(id: string, data: Prisma.JobUpdateInput): Promise<JobWithRelations> {
    return prisma.job.update({
      where: { id },
      data,
      ...jobWithRelations,
    });
  },

  async remove(id: string): Promise<void> {
    await prisma.job.delete({
      where: { id },
    });
  },
};
