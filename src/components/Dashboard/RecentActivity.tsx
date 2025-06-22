import { AlertCircle } from 'lucide-react';
import { Job } from '../../types/Job';
import Card from '../Common/Card';

interface RecentActivityProps {
  recentActivity: Job[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ recentActivity }) => (
  <Card>
    <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h3>
    {recentActivity.length === 0 ? (
      <p className="text-text-secondary text-center py-4">No recent activity</p>
    ) : (
      <div className="space-y-4">
        {recentActivity.map((job) => {
          const latestResponse = job.responses[job.responses.length - 1];
          return (
            <div key={job.id} className="flex items-start space-x-3 p-3 bg-bg-primary rounded-lg">
              <AlertCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">
                  {job.company} - {job.title}
                </p>
                <p className="text-sm text-text-secondary truncate">{latestResponse.message}</p>
                <p className="text-xs text-text-secondary mt-1">
                  {new Date(latestResponse.date).toLocaleDateString()} by {latestResponse.sender}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </Card>
);

export default RecentActivity;
