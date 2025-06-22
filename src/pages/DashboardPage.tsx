
import { useJobContext } from '../context/JobContext';
import Dashboard from '../components/Dashboard';
import { LoadingSpinner } from '../components/Common/LoadingSpinner';
import { ConnectionError } from '../components/Common/ConnectionError';

const DashboardPage: React.FC = () => {
  const { jobs, loading, error } = useJobContext();
  if (loading) return <LoadingSpinner message="Loading..." />;
  if (error) return <ConnectionError message={error} suggestion="Make sure the backend server is running on port 3001" />;

  return (
    <div className="flex-1 p-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary mt-1">An overview of your job application progress.</p>
      </div>
      <Dashboard jobs={jobs} />
    </div>
  );
};

export default DashboardPage;
