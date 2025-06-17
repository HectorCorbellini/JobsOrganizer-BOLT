import React from 'react';
import { Job } from '../types/Job';
import { useDashboardStats } from '../hooks/useDashboardStats';
import StatsGrid from './Dashboard/StatsGrid';
import PriorityDistribution from './Dashboard/PriorityDistribution';
import ApplicationStatus from './Dashboard/ApplicationStatus';
import RecentActivity from './Dashboard/RecentActivity';

interface DashboardProps {
  jobs: Job[];
}

const Dashboard: React.FC<DashboardProps> = ({ jobs }) => {
  const { stats, priorityStats, recentActivity } = useDashboardStats(jobs);

  return (
    <div className="space-y-6">
      <StatsGrid stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PriorityDistribution priorityStats={priorityStats} />
        <ApplicationStatus stats={stats} />
      </div>
      <RecentActivity recentActivity={recentActivity} />
    </div>
  );
};

export default Dashboard;