import React from 'react';
import { BarChart3, CheckCircle, TrendingUp, Clock } from 'lucide-react';
import Card from '../Common/Card';

interface StatsGridProps {
  stats: {
    total: number;
    applied: number;
    interviews: number;
    pending: number;
  };
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">Total Jobs</p>
          <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
        </div>
        <BarChart3 className="w-8 h-8 text-accent" />
      </div>
    </Card>

    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">Applications Sent</p>
          <p className="text-2xl font-bold text-green-400">{stats.applied}</p>
        </div>
        <CheckCircle className="w-8 h-8 text-green-400" />
      </div>
    </Card>

    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">Interviews</p>
          <p className="text-2xl font-bold text-purple-400">{stats.interviews}</p>
        </div>
        <TrendingUp className="w-8 h-8 text-purple-400" />
      </div>
    </Card>

    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">Pending Response</p>
          <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
        </div>
        <Clock className="w-8 h-8 text-yellow-400" />
      </div>
    </Card>
  </div>
);

export default StatsGrid;
