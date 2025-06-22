
import { useJobContext } from '../context/JobContext';
import Suggestions from '../components/Suggestions';
import { LoadingSpinner } from '../components/Common/LoadingSpinner';
import { ConnectionError } from '../components/Common/ConnectionError';

const SuggestionsPage: React.FC = () => {
  const { selectedJob, loading, error } = useJobContext();

  if (loading) return <LoadingSpinner message="Loading..." />;
  if (error) return <ConnectionError message={error} suggestion="Make sure the backend server is running on port 3001" />;

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {selectedJob && <Suggestions job={selectedJob} />}
    </div>
  );
};

export default SuggestionsPage;
