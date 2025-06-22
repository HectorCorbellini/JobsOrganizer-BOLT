import { Job } from '../../domain/models/Job';

export interface IJobService {
  getJobs(): Promise<Job[]>;
  getJob(id: string): Promise<Job>;
  createJob(job: Omit<Job, 'id' | 'dateAdded' | 'responses'>): Promise<Job>;
  updateJob(id: string, job: Partial<Job>): Promise<Job>;
  updateJobStatus(id: string, status: Job['status']): Promise<Job>;
  updateJobNotes(id: string, notes: string): Promise<Job>;
  deleteJob(id: string): Promise<void>;
}
