import prisma from '../../../lib/prisma.js';
import { Prisma, Response } from '@prisma/client';
import { IResponseRepository } from '../../../domain/repositories/IResponseRepository.js';

export const responseRepository: IResponseRepository = {
  async findByJobId(jobId: string): Promise<Response[]> {
    return prisma.response.findMany({
      where: { jobId },
      orderBy: { date: 'desc' },
    });
  },

  async create(data: Prisma.ResponseUncheckedCreateInput): Promise<Response> {
    return prisma.response.create({ data });
  },

  async remove(id: string): Promise<void> {
    await prisma.response.delete({
      where: { id },
    });
  },
};
