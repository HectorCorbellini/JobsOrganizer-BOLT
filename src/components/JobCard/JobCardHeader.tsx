import { Building, MapPin, DollarSign } from 'lucide-react';
import { Job } from '../../types/Job';
import { getStatusColor, formatStatus } from '../../utils/jobUtils';
import PriorityBadge from '../Common/PriorityBadge';

interface JobCardHeaderProps {
  job: Job;
}

const JobCardHeader: React.FC<JobCardHeaderProps> = ({ job }) => (
  <div className="flex justify-between items-start">
    <div className="flex-1">
      <h2 className="text-2xl font-bold text-text-primary mb-2">{job.title}</h2>
      <div className="flex items-center space-x-4 text-text-secondary">
        <div className="flex items-center space-x-1">
          <Building className="w-4 h-4" />
          <span>{job.company}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        {job.salary && (
          <div className="flex items-center space-x-1">
            <DollarSign className="w-4 h-4" />
            <span>{job.salary}</span>
          </div>
        )}
      </div>
    </div>
    <div className="flex flex-col space-y-2">
      <PriorityBadge priority={job.priority} />
      <span className={`px-3 py-1 rounded-full text-xs font-medium text-center ${getStatusColor(job.status)}`}>
        {formatStatus(job.status)}
      </span>
    </div>
  </div>
);

export default JobCardHeader;
