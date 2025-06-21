import { Calendar, User, Clock } from 'lucide-react';
import { Job } from '../../types/Job';

interface JobCardDatesProps {
  job: Job;
}

const JobCardDates: React.FC<JobCardDatesProps> = ({ job }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="flex items-center space-x-2 text-sm text-text-secondary">
      <Calendar className="w-4 h-4" />
      <span>Added: {new Date(job.dateAdded).toLocaleDateString()}</span>
    </div>
    {job.applicationDate && (
      <div className="flex items-center space-x-2 text-sm text-text-secondary">
        <User className="w-4 h-4" />
        <span>Applied: {new Date(job.applicationDate).toLocaleDateString()}</span>
      </div>
    )}
    {job.applicationDeadline && (
      <div className="flex items-center space-x-2 text-sm text-orange-400">
        <Clock className="w-4 h-4" />
        <span>Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</span>
      </div>
    )}
  </div>
);

export default JobCardDates;
