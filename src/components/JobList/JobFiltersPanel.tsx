import React from 'react';
import { Job, JobFilters } from '../../types/Job';
import { formatStatus } from '../../utils/jobUtils';

interface JobFiltersPanelProps {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
  statusCounts: Record<string, number>;
}

const JobFiltersPanel: React.FC<JobFiltersPanelProps> = ({ filters, onFiltersChange, statusCounts }) => (
  <div className="p-4 bg-bg-primary rounded-lg space-y-3">
    <div>
      <label className="block text-sm font-medium text-text-primary mb-1">Status</label>
      <div className="flex flex-wrap gap-2">
        {Object.keys(statusCounts).map(status => (
          <label key={status} className="flex items-center space-x-1">
            <input
              type="checkbox"
              checked={filters.status?.includes(status as Job['status']) || false}
              onChange={(e) => {
                const newStatus = filters.status || [];
                if (e.target.checked) {
                  onFiltersChange({ ...filters, status: [...newStatus, status as Job['status']] });
                } else {
                  onFiltersChange({ ...filters, status: newStatus.filter(s => s !== status) });
                }
              }}
              className="rounded border-border-primary text-accent focus:ring-accent"
            />
            <span className="text-sm text-text-secondary">
              {formatStatus(status)} ({statusCounts[status]})
            </span>
          </label>
        ))}
      </div>
    </div>
    <div>
      <label className="block text-sm font-medium text-text-primary mb-1">Priority</label>
      <div className="flex space-x-4">
        {['high', 'medium', 'low'].map(priority => (
          <label key={priority} className="flex items-center space-x-1">
            <input
              type="checkbox"
              checked={filters.priority?.includes(priority as Job['priority']) || false}
              onChange={(e) => {
                const newPriority = filters.priority || [];
                if (e.target.checked) {
                  onFiltersChange({ ...filters, priority: [...newPriority, priority as Job['priority']] });
                } else {
                  onFiltersChange({ ...filters, priority: newPriority.filter(p => p !== priority) });
                }
              }}
              className="rounded border-border-primary text-accent focus:ring-accent"
            />
            <span className="text-sm text-text-secondary capitalize">{priority}</span>
          </label>
        ))}
      </div>
    </div>
  </div>
);

export default JobFiltersPanel;
