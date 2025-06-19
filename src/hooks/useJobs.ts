import { useState, useEffect } from 'react';
import { Job } from '../types/Job';
import { apiService } from '../services/api';
import { calculatePriority } from '../utils/jobUtils';

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedJobs = await apiService.getJobs();
      
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
      const updatedJob = await apiService.updateJobStatus(jobId, status);
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
      const updatedJob = await apiService.updateJobNotes(jobId, newNotes);
      
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

  const createJob = async (jobData: Omit<Job, 'id' | 'dateAdded' | 'responses'>) => {
    try {
      const newJob = await apiService.createJob(jobData);
      setJobs(prevJobs => [newJob, ...prevJobs]);
      return newJob;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create job');
      throw err;
    }
  };

  const deleteJob = async (jobId: string) => {
    try {
      await apiService.deleteJob(jobId);
      setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete job');
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
    createJob,
    deleteJob,
  };
};