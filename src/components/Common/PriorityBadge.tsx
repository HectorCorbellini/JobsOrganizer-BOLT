import { Star } from 'lucide-react';
import { Job } from '../../types/Job';
import { getPriorityColor } from '../../utils/jobUtils';

interface PriorityBadgeProps {
  priority: Job['priority'];
  className?: string;
  variant?: 'full' | 'short';
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, className = '', variant = 'full' }) => {
  const content = variant === 'full' ? `${priority.toUpperCase()} PRIORITY` : priority.charAt(0).toUpperCase();
  const padding = variant === 'full' ? 'px-3 py-1' : 'px-2 py-1';

  return (
    <span className={`${padding} rounded-full text-xs font-medium ${getPriorityColor(priority)} ${className}`}>
      <Star className="w-3 h-3 inline mr-1" />
      {content}
    </span>
  );
};

export default PriorityBadge;
