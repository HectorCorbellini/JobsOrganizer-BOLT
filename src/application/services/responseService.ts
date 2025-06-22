import { Response } from '../../domain/models/Job';

export interface IResponseService {
  getJobResponses(jobId: string): Promise<Response[]>;
  createResponse(input: { jobId: string; date: string; type: string; message: string; sender: string; }): Promise<Response>;
  deleteResponse(id: string): Promise<void>;
}
