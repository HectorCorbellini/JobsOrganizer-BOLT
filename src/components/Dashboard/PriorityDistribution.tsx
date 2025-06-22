import Card from '../Common/Card';

interface PriorityDistributionProps {
  priorityStats: {
    high: number;
    medium: number;
    low: number;
  };
}

const PriorityDistribution: React.FC<PriorityDistributionProps> = ({ priorityStats }) => (
  <Card>
    <h3 className="text-lg font-semibold text-text-primary mb-4">Priority Distribution</h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm font-medium text-text-secondary">High Priority</span>
        </div>
        <span className="text-sm text-text-secondary">{priorityStats.high} jobs</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-sm font-medium text-text-secondary">Medium Priority</span>
        </div>
        <span className="text-sm text-text-secondary">{priorityStats.medium} jobs</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-text-secondary">Low Priority</span>
        </div>
        <span className="text-sm text-text-secondary">{priorityStats.low} jobs</span>
      </div>
    </div>
  </Card>
);

export default PriorityDistribution;
