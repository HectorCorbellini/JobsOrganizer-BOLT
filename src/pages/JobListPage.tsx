
import { useJobContext } from '../context/JobContext';
import JobList from '../components/JobList';
import JobCard from '../components/JobCard';
import { LoadingSpinner } from '../components/Common/LoadingSpinner';
import { ConnectionError } from '../components/Common/ConnectionError';
import { Briefcase } from 'lucide-react';

const JobListPage: React.FC = () => {
  const { prioritizedJobs, selectedJob, handleSelectJob, loading, error, handleStatusChange, handleAddNote } = useJobContext();
  if (loading) return <LoadingSpinner message="Loading..." />;
  if (error) return <ConnectionError message={error} suggestion="Make sure the backend server is running on port 3001" />;

  return (
    <div className="flex">
      <div className="w-1/3 border-r border-border-primary overflow-y-auto">
        <JobList
          jobs={prioritizedJobs}
          onSelectJob={handleSelectJob}
          selectedJobId={selectedJob?.id}
        />
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        {selectedJob ? (
          <JobCard
            job={selectedJob}
            onStatusChange={handleStatusChange}
            onAddNote={handleAddNote}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Briefcase className="w-16 h-16 mx-auto text-border-primary mb-4" />
              <h2 className="text-xl font-semibold text-text-primary">Select a Job</h2>
              <p className="text-text-secondary mt-2">Choose a job from the list to view its details.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListPage;
