import { Mail, Globe } from 'lucide-react';
import { Job } from '../../types/Job';

interface JobCardContactProps {
  contactInfo: Job['contactInfo'];
}

const JobCardContact: React.FC<JobCardContactProps> = ({ contactInfo }) => (
  <div>
    <h3 className="text-sm font-semibold text-text-primary mb-2">Contact Information</h3>
    <div className="space-y-1">
      {contactInfo?.email && (
        <div className="flex items-center space-x-2 text-text-secondary">
          <Mail className="w-4 h-4" />
          <a href={`mailto:${contactInfo.email}`} className="text-accent hover:underline">
            {contactInfo.email}
          </a>
        </div>
      )}
      {contactInfo?.website && (
        <div className="flex items-center space-x-2 text-text-secondary">
          <Globe className="w-4 h-4" />
          <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            Company Website
          </a>
        </div>
      )}
    </div>
  </div>
);

export default JobCardContact;
