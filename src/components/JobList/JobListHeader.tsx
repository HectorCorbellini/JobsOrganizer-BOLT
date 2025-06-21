import { Search, Filter, SortAsc } from 'lucide-react';

interface JobListHeaderProps {
  jobCount: number;
  totalJobs: number;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onToggleFilters: () => void;
  sortBy: string;
  onSortByChange: (sort: 'dateAdded' | 'priority' | 'company') => void;
}

const JobListHeader: React.FC<JobListHeaderProps> = ({ 
  jobCount, 
  totalJobs, 
  searchTerm, 
  onSearchTermChange, 
  onToggleFilters, 
  sortBy, 
  onSortByChange 
}) => (
  <div className="p-4 border-b border-border-primary">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-text-primary">Job Applications</h2>
      <span className="text-sm text-text-secondary">{jobCount} of {totalJobs} jobs</span>
    </div>

    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
      <input
        type="text"
        placeholder="Search jobs, companies, technologies..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-bg-primary border border-border-primary text-text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
      />
    </div>

    <div className="flex items-center justify-between">
      <button
        onClick={onToggleFilters}
        className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
      </button>
      <div className="flex items-center space-x-2">
        <SortAsc className="w-4 h-4 text-text-secondary" />
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value as 'dateAdded' | 'priority' | 'company')}
          className="text-sm bg-bg-primary border border-border-primary text-text-primary rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="dateAdded">Date Added</option>
          <option value="priority">Priority</option>
          <option value="company">Company</option>
        </select>
      </div>
    </div>
  </div>
);

export default JobListHeader;
