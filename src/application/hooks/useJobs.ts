import { useState, useEffect } from 'react';
import { Job } from '../../domain/models/Job';
import { apiService } from '../../infrastructure/api/api';
import { IJobService } from '../services/jobService';
import { calculatePriority } from '../../utils/jobUtils';

export const useJobs = (jobService: IJobService = apiService) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedJobs = await jobService.getJobs();
      
      // Calculate priorities for jobs that don't have them
      const jobsWithPriorities = fetchedJobs.map(job => ({
        ...job,
        priority: job.priority || calculatePriority(job)
      }));
      
      setJobs(jobsWithPriorities);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateJobStatus = async (jobId: string, status: Job['status']) => {
    try {
      const updatedJob = await jobService.updateJobStatus(jobId, status);
      setJobs(prevJobs =>
        prevJobs.map(job =>
          job.id === jobId ? updatedJob : job
        )
      );
      return updatedJob;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update job status');
      throw err;
    }
  };

  const addJobNote = async (jobId: string, note: string) => {
    try {
      const job = jobs.find(j => j.id === jobId);
      if (!job) throw new Error('Job not found');

      const newNotes = job.notes ? `${job.notes}\n${note}` : note;
      const updatedJob = await jobService.updateJobNotes(jobId, newNotes);
      
      setJobs(prevJobs =>
        prevJobs.map(j =>
          j.id === jobId ? updatedJob : j
        )
      );
      return updatedJob;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add note');
      throw err;
    }
  };


  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    loading,
    error,
    refetch: fetchJobs,
    updateJobStatus,
    addJobNote,
  };
};