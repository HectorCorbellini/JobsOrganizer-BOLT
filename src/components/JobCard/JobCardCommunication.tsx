import { Job } from '../../types/Job';

interface JobCardCommunicationProps {
  responses: Job['responses'];
}

const JobCardCommunication: React.FC<JobCardCommunicationProps> = ({ responses }) => (
  <div>
    <h3 className="text-sm font-semibold text-text-primary mb-3">Communication History</h3>
    <div className="space-y-3">
      {responses.map((response) => (
        <div key={response.id} className="bg-bg-primary rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">{response.sender}</span>
            <span className="text-xs text-text-secondary">
              {new Date(response.date).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-text-secondary">{response.message}</p>
        </div>
      ))}
    </div>
  </div>
);

export default JobCardCommunication;
