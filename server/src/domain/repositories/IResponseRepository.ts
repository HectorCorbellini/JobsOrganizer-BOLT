import { Prisma, Response as PrismaResponse } from '@prisma/client';

export interface IResponseRepository {
  findByJobId(jobId: string): Promise<PrismaResponse[]>;
  create(data: Prisma.ResponseUncheckedCreateInput): Promise<PrismaResponse>;
  remove(id: string): Promise<void>;
}
