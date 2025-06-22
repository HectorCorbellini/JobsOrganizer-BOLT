import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LayoutDashboard, List, FileText } from 'lucide-react';
import { JobProvider, useJobContext } from './context/JobContext';
import MainLayout from './components/Layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import JobListPage from './pages/JobListPage';
import SuggestionsPage from './pages/SuggestionsPage';
import ErrorBoundary from './components/Common/ErrorBoundary';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, route: '/' },
  { id: 'jobs', label: 'All Jobs', icon: List, route: '/jobs' },
  { id: 'suggestions', label: 'Suggestions', icon: FileText, route: '/suggestions' },
];

const AppContent = () => {
  const { refetchJobs } = useJobContext();

  return (
    <MainLayout menuItems={menuItems} onImportSuccess={refetchJobs}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/jobs" element={<JobListPage />} />
        <Route path="/suggestions" element={<SuggestionsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </MainLayout>
  );
};

function App() {
  return (
    <Router>
      <JobProvider>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </JobProvider>
    </Router>
  );
}

export default App;