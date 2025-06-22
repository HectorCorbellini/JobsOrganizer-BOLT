import { responseRepository } from '../../infrastructure/database/prisma/responseRepository.js';
import { Prisma, ResponseType } from '@prisma/client';

export const responseService = {
  async getByJobId(jobId: string) {
    const responses = await responseRepository.findByJobId(jobId);
    return responses.map(r => ({
      id: r.id,
      date: r.date.toISOString(),
      type: r.type.toLowerCase(),
      message: r.message,
      sender: r.sender,
    }));
  },

  async create(data: Prisma.ResponseUncheckedCreateInput) {
    const { jobId, date, type, message, sender } = data;
    const createData: Prisma.ResponseUncheckedCreateInput = {
      jobId,
      date: new Date(date),
      type: type.toUpperCase() as ResponseType,
      message,
      sender,
    };
    const response = await responseRepository.create(createData);
    return {
      id: response.id,
      date: response.date.toISOString(),
      type: response.type.toLowerCase(),
      message: response.message,
      sender: response.sender,
    };
  },

  async delete(id: string) {
    await responseRepository.remove(id);
  },
};
