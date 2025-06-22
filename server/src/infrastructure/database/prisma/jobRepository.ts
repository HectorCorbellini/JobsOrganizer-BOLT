import prisma from '../../../lib/prisma.js';
import { Prisma } from '@prisma/client';
import { JobWithRelations } from '../../../domain/entities/Job.js';
import { IJobRepository } from '../../../domain/repositories/IJobRepository.js';

const jobWithRelations = Prisma.validator<Prisma.JobDefaultArgs>()({
  include: {
    responses: {
      orderBy: {
        date: 'desc',
      },
    },
  },
});

export const jobRepository: IJobRepository = {
  async findAll(): Promise<JobWithRelations[]> {
    return prisma.job.findMany({ include: jobWithRelations.include, orderBy: { dateAdded: 'desc' } });
  },

  async findById(id: string): Promise<JobWithRelations | null> {
    return prisma.job.findUnique({ where: { id }, include: jobWithRelations.include });
  },

  async findByTitleAndCompany(title: string, company: string): Promise<JobWithRelations | null> {
    return prisma.job.findFirst({ where: { title, company }, include: jobWithRelations.include });
  },

  async create(data: Prisma.JobCreateInput): Promise<JobWithRelations> {
    return prisma.job.create({ data, include: jobWithRelations.include });
  },

  async update(id: string, data: Prisma.JobUpdateInput): Promise<JobWithRelations> {
    return prisma.job.update({ where: { id }, data, include: jobWithRelations.include });
  },

  async remove(id: string): Promise<void> {
    await prisma.job.delete({ where: { id } });
  },
};
