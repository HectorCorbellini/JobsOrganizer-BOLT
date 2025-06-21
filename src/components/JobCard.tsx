import { Job } from '../types/Job';
import JobCardHeader from './JobCard/JobCardHeader';
import JobCardSection from './JobCard/JobCardSection';
import JobCardDates from './JobCard/JobCardDates';
import JobCardCommunication from './JobCard/JobCardCommunication';
import JobCardNotes from './JobCard/JobCardNotes';
import JobCardContact from './JobCard/JobCardContact';
import { formatStatus } from '../utils/jobUtils';

interface JobCardProps {
  job: Job;
  onStatusChange: (jobId: string, status: Job['status']) => void;
  onAddNote: (jobId: string, note: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onStatusChange, onAddNote }) => {
  const statusOptions: Job['status'][] = [
    'new', 'reviewing', 'applied', 'interview_scheduled',
    'interviewed', 'awaiting_response', 'offer_received', 'rejected', 'withdrawn'
  ];

  return (
    <div className="bg-bg-secondary rounded-lg shadow-lg border border-border-primary p-6 space-y-6">
      <JobCardHeader job={job} />

      <JobCardSection title="Technologies">
        <div className="flex flex-wrap gap-2">
          {job.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </JobCardSection>

      <JobCardSection title="Description">
        <p className="text-text-secondary leading-relaxed">{job.description}</p>
      </JobCardSection>

      <JobCardSection title="Requirements">
        <ul className="list-disc list-inside space-y-1 text-text-secondary">
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </JobCardSection>

      {job.benefits && job.benefits.length > 0 && (
        <JobCardSection title="Benefits">
          <ul className="list-disc list-inside space-y-1 text-text-secondary">
            {job.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </JobCardSection>
      )}

      {job.contactInfo && <JobCardContact contactInfo={job.contactInfo} />}

      <JobCardDates job={job} />

      {job.responses.length > 0 && <JobCardCommunication responses={job.responses} />}

      <JobCardNotes jobId={job.id} notes={job.notes} onAddNote={onAddNote} />

      <JobCardSection title="Update Status">
        <select
          value={job.status}
          onChange={(e) => onStatusChange(job.id, e.target.value as Job['status'])}
          className="w-full px-3 py-2 bg-bg-primary border border-border-primary text-text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        >
          {statusOptions.map(status => (
            <option key={status} value={status}>{formatStatus(status)}</option>
          ))}
        </select>
      </JobCardSection>


    </div>
  );
};

export default JobCard;