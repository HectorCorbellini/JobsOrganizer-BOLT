import { useMemo } from 'react';
import { Job } from '../../domain/models/Job';

export const useDashboardStats = (jobs: Job[]) => {
  const stats = useMemo(() => ({
    total: jobs.length,
    applied: jobs.filter(j => j.status === 'applied').length,
    interviews: jobs.filter(j => j.status === 'interview_scheduled' || j.status === 'interviewed').length,
    rejected: jobs.filter(j => j.status === 'rejected').length,
    pending: jobs.filter(j => j.status === 'awaiting_response').length,
    offers: jobs.filter(j => j.status === 'offer_received').length,
  }), [jobs]);

  const priorityStats = useMemo(() => ({
    high: jobs.filter(j => j.priority === 'high').length,
    medium: jobs.filter(j => j.priority === 'medium').length,
    low: jobs.filter(j => j.priority === 'low').length,
  }), [jobs]);

  const recentActivity = useMemo(() => jobs
    .filter(j => j.responses.length > 0)
    .sort((a, b) => {
      const aLatest = Math.max(...a.responses.map(r => new Date(r.date).getTime()));
      const bLatest = Math.max(...b.responses.map(r => new Date(r.date).getTime()));
      return bLatest - aLatest;
    })
    .slice(0, 5), [jobs]);

  return { stats, priorityStats, recentActivity };
};
