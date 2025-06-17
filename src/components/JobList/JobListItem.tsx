import React from 'react';
import { Building, MapPin, Calendar } from 'lucide-react';
import { Job } from '../../types/Job';
import { getStatusColor, formatStatus } from '../../utils/jobUtils';
import PriorityBadge from '../Common/PriorityBadge';

interface JobListItemProps {
  job: Job;
  onSelectJob: (job: Job) => void;
  isSelected: boolean;
}

const JobListItem: React.FC<JobListItemProps> = ({ job, onSelectJob, isSelected }) => (
  <div
    onClick={() => onSelectJob(job)}
    className={`p-4 cursor-pointer transition-colors hover:bg-bg-primary ${
      isSelected ? 'bg-accent/10 border-r-4 border-accent' : ''
    }`}
  >
    <div className="flex items-start justify-between mb-2">
      <h3 className="font-semibold text-text-primary text-sm">{job.title}</h3>
      <div className="flex space-x-1">
        <PriorityBadge priority={job.priority} variant="short" />
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
          {formatStatus(job.status)}
        </span>
      </div>
    </div>
    
    <div className="space-y-1 text-xs text-text-secondary">
      <div className="flex items-center space-x-1">
        <Building className="w-3 h-3" />
        <span>{job.company}</span>
      </div>
      <div className="flex items-center space-x-1">
        <MapPin className="w-3 h-3" />
        <span>{job.location}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Calendar className="w-3 h-3" />
        <span>{new Date(job.dateAdded).toLocaleDateString()}</span>
      </div>
    </div>

    <div className="mt-2 flex flex-wrap gap-1">
      {job.technologies.slice(0, 3).map((tech, index) => (
        <span key={index} className="px-2 py-1 bg-accent/20 text-accent rounded text-xs">
          {tech}
        </span>
      ))}
      {job.technologies.length > 3 && (
        <span className="px-2 py-1 bg-bg-primary rounded text-xs text-text-secondary">
          +{job.technologies.length - 3} more
        </span>
      )}
    </div>
  </div>
);

export default JobListItem;
