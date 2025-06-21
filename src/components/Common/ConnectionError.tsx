import { AlertCircle } from 'lucide-react';

interface ConnectionErrorProps {
  message: string;
  suggestion?: string;
}

export const ConnectionError: React.FC<ConnectionErrorProps> = ({ message, suggestion }) => {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-text-primary mb-2">Connection Error</h2>
        <p className="text-text-secondary mb-4">{message}</p>
        {suggestion && (
          <p className="text-sm text-text-secondary">{suggestion}</p>
        )}
      </div>
    </div>
  );
};
