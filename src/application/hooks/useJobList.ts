import { useState, useMemo } from 'react';
import { Job, JobFilters } from '../../domain/models/Job';

export const useJobList = (jobs: Job[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<JobFilters>({});
  const [sortBy, setSortBy] = useState<'dateAdded' | 'priority' | 'company'>('dateAdded');

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = !filters.status?.length || filters.status.includes(job.status);
      const matchesPriority = !filters.priority?.length || filters.priority.includes(job.priority);
      const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesTechnologies = !filters.technologies?.length || filters.technologies.some(tech => job.technologies.includes(tech));
      const matchesCompany = !filters.company || job.company.toLowerCase().includes(filters.company.toLowerCase());

      return matchesSearch && matchesStatus && matchesPriority && matchesLocation && matchesTechnologies && matchesCompany;
    });
  }, [jobs, searchTerm, filters]);

  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      switch (sortBy) {
        case 'priority': {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        case 'company':
          return a.company.localeCompare(b.company);
        case 'dateAdded':
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });
  }, [filteredJobs, sortBy]);

  const statusCounts = useMemo(() => {
    return jobs.reduce((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [jobs]);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    sortedJobs,
    statusCounts,
  };
};
