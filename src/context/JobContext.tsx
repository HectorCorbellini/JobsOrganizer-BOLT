import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Job } from '../domain/models/Job';
import { useJobs } from '../application/hooks/useJobs';
import { apiService } from '../infrastructure/api/api';

interface IJobContext {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  selectedJob: Job | null;
  currentJobIndex: number;
  prioritizedJobs: Job[];
  handleSelectJob: (job: Job) => void;
  handleStatusChange: (jobId: string, status: Job['status']) => Promise<void>;
  handleAddNote: (jobId: string, note: string) => Promise<void>;
  navigateJob: (direction: 'prev' | 'next') => void;
  refetchJobs: () => void;
}

const JobContext = createContext<IJobContext | undefined>(undefined);

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { jobs, loading, error, updateJobStatus, addJobNote, refetch } = useJobs(apiService);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  useEffect(() => {
    if (jobs.length > 0 && !selectedJob) {
      const highPriorityJob = jobs.find(j => j.priority === 'high');
      if (highPriorityJob) {
        setSelectedJob(highPriorityJob);
        setCurrentJobIndex(jobs.findIndex(j => j.id === highPriorityJob.id));
      } else {
        setSelectedJob(jobs[0]);
        setCurrentJobIndex(0);
      }
    }
  }, [jobs, selectedJob]);

  const handleStatusChange = async (jobId: string, status: Job['status']) => {
    const updatedJob = await updateJobStatus(jobId, status);
    if (selectedJob?.id === jobId) {
      setSelectedJob(updatedJob);
    }
  };

  const handleAddNote = async (jobId: string, note: string) => {
    const updatedJob = await addJobNote(jobId, note);
    if (selectedJob?.id === jobId) {
      setSelectedJob(updatedJob);
    }
  };

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    setCurrentJobIndex(jobs.findIndex(j => j.id === job.id));
  };

  const navigateJob = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' ? currentJobIndex + 1 : currentJobIndex - 1;
    if (newIndex >= 0 && newIndex < jobs.length) {
      setCurrentJobIndex(newIndex);
      setSelectedJob(jobs[newIndex]);
    }
  };

  const prioritizedJobs = [...jobs].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const value = {
    jobs,
    loading,
    error,
    selectedJob,
    currentJobIndex,
    prioritizedJobs,
    handleSelectJob,
    handleStatusChange,
    handleAddNote,
    navigateJob,
    refetchJobs: refetch,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};
