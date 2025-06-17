import React from 'react';
import Card from '../Common/Card';

interface ApplicationStatusProps {
  stats: {
    total: number;
    applied: number;
    offers: number;
    rejected: number;
    pending: number;
  };
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ stats }) => (
  <Card>
    <h3 className="text-lg font-semibold text-text-primary mb-4">Application Status</h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-green-400">{stats.offers}</div>
        <div className="text-xs text-text-secondary">Offers Received</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-red-400">{stats.rejected}</div>
        <div className="text-xs text-text-secondary">Rejected</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
        <div className="text-xs text-text-secondary">Awaiting Response</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-accent">{stats.total > 0 ? Math.round((stats.applied / stats.total) * 100) : 0}%</div>
        <div className="text-xs text-text-secondary">Application Rate</div>
      </div>
    </div>
  </Card>
);

export default ApplicationStatus;
