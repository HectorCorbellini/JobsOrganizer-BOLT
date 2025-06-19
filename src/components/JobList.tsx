import React, { useState } from 'react';
import { Building } from 'lucide-react';
import { Job } from '../types/Job';
import { useJobList } from '../hooks/useJobList';
import JobListHeader from './JobList/JobListHeader';
import JobFiltersPanel from './JobList/JobFiltersPanel';
import JobListItem from './JobList/JobListItem';

interface JobListProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  selectedJobId?: string;
}

const JobList: React.FC<JobListProps> = ({ jobs, onSelectJob, selectedJobId }) => {
  const [showFilters, setShowFilters] = useState(false);
  const {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    sortedJobs,
    statusCounts,
  } = useJobList(jobs);

  return (
    <div className="bg-bg-secondary rounded-lg shadow-lg border border-border-primary h-full flex flex-col">
      <JobListHeader
        jobCount={sortedJobs.length}
        totalJobs={jobs.length}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onToggleFilters={() => setShowFilters(!showFilters)}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      {showFilters && (
        <div className="p-4 border-b border-border-primary">
          <JobFiltersPanel
            filters={filters}
            onFiltersChange={setFilters}
            statusCounts={statusCounts}
          />
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {sortedJobs.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">
            <Building className="w-12 h-12 mx-auto mb-4 text-border-primary" />
            <p>No jobs found matching your criteria.</p>
          </div>
        ) : (
          <div className="divide-y divide-border-primary">
            {sortedJobs.map((job) => (
              <JobListItem
                key={job.id}
                job={job}
                onSelectJob={onSelectJob}
                isSelected={selectedJobId === job.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;