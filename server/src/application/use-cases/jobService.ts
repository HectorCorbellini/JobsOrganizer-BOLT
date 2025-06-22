import { jobRepository } from '../../infrastructure/database/prisma/jobRepository.js';
import { transformJobFromDB, transformJobToDB, ApiJobDTO } from '../../utils/transformers.js';
import { JobWithRelations } from '../../domain/entities/Job.js';
import { Job, Prisma, JobStatus } from '@prisma/client';

export const jobService = {
  async getAllJobs() {
    const jobs = await jobRepository.findAll();
    return jobs.map(transformJobFromDB);
  },

  async getJobById(id: string) {
    const job = await jobRepository.findById(id);
    if (!job) {
      return null;
    }
    return transformJobFromDB(job);
  },

  async createJob(jobData: ApiJobDTO) {
    const transformedData = transformJobToDB(jobData);
    const newJob = await jobRepository.create(transformedData);
    return transformJobFromDB(newJob);
  },

  async updateJob(id: string, jobData: ApiJobDTO) {
    const transformedData = transformJobToDB(jobData);
    const updatedJob = await jobRepository.update(id, transformedData);
    return transformJobFromDB(updatedJob);
  },

  async deleteJob(id: string) {
    return jobRepository.remove(id);
  },

  async updateJobStatus(id: string, status: string) {
    const updateData: Prisma.JobUpdateInput = { status: status.toUpperCase() as JobStatus };
    if (status.toUpperCase() === 'APPLIED') {
      updateData.applicationDate = new Date();
    }
    const updatedJob = await jobRepository.update(id, updateData);
    return transformJobFromDB(updatedJob);
  },

  async updateJobNotes(id: string, notes: string) {
    const updatedJob = await jobRepository.update(id, { notes });
    return transformJobFromDB(updatedJob);
  },
};
