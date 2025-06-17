import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FileText,
  List,
  Settings,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Target
} from 'lucide-react';
import { Job } from './types/Job';
import { mockJobs } from './data/mockJobs';
import { calculatePriority } from './utils/jobUtils';
import Dashboard from './components/Dashboard';
import JobCard from './components/JobCard';
import JobList from './components/JobList';
import Suggestions from './components/Suggestions';

type View = 'dashboard' | 'jobs' | 'current' | 'suggestions';

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  useEffect(() => {
    const jobsWithPriorities = mockJobs.map(job => ({
      ...job,
      priority: calculatePriority(job)
    }));
    setJobs(jobsWithPriorities);

    const highPriorityJob = jobsWithPriorities.find(j => j.priority === 'high');
    if (highPriorityJob) {
      setSelectedJob(highPriorityJob);
      setCurrentJobIndex(jobsWithPriorities.findIndex(j => j.id === highPriorityJob.id));
    } else if (jobsWithPriorities.length > 0) {
      setSelectedJob(jobsWithPriorities[0]);
      setCurrentJobIndex(0);
    }
  }, []);

  const handleStatusChange = (jobId: string, status: Job['status']) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId
          ? { ...job, status, applicationDate: status === 'applied' ? new Date().toISOString() : job.applicationDate }
          : job
      )
    );

    if (selectedJob?.id === jobId) {
      setSelectedJob(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleAddNote = (jobId: string, note: string) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId
          ? { ...job, notes: job.notes ? `${job.notes}\n${note}` : note }
          : job
      )
    );

    if (selectedJob?.id === jobId) {
      setSelectedJob(prev => prev ? { ...prev, notes: prev.notes ? `${prev.notes}\n${note}` : note } : null);
    }
  };

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    setCurrentJobIndex(jobs.findIndex(j => j.id === job.id));
    setCurrentView('current');
  };

  const navigateJob = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' ? currentJobIndex + 1 : currentJobIndex - 1;
    if (newIndex >= 0 && newIndex < jobs.length) {
      setCurrentJobIndex(newIndex);
      setSelectedJob(jobs[newIndex]);
    }
  };

  const prioritizedJobs = [...jobs].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'current', label: 'Current Job', icon: Target },
    { id: 'jobs', label: 'All Jobs', icon: List },
    { id: 'suggestions', label: 'Suggestions', icon: FileText },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="flex-1 p-6">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
              <p className="text-text-secondary mt-1">An overview of your job application progress.</p>
            </div>
            <Dashboard jobs={jobs} />
          </div>
        );
      case 'jobs':
        return (
          <>
            <div className="w-1/3 border-r border-border-primary overflow-y-auto">
              <JobList
                jobs={prioritizedJobs}
                onSelectJob={handleSelectJob}
                selectedJobId={selectedJob?.id}
              />
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              {selectedJob ? (
                <JobCard
                  job={selectedJob}
                  onStatusChange={handleStatusChange}
                  onAddNote={handleAddNote}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Briefcase className="w-16 h-16 mx-auto text-border-primary mb-4" />
                    <h2 className="text-xl font-semibold text-text-primary">Select a Job</h2>
                    <p className="text-text-secondary mt-2">Choose a job from the list to view its details.</p>
                  </div>
                </div>
              )}
            </div>
          </>
        );
      case 'current':
        return (
          <div className="flex-1 p-6 overflow-y-auto">
            {selectedJob ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-text-primary">{selectedJob.title}</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigateJob('prev')}
                      disabled={currentJobIndex === 0}
                      className="p-2 rounded-md bg-bg-secondary border border-border-primary text-text-secondary hover:bg-bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => navigateJob('next')}
                      disabled={currentJobIndex === jobs.length - 1}
                      className="p-2 rounded-md bg-bg-secondary border border-border-primary text-text-secondary hover:bg-bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <JobCard
                  job={selectedJob}
                  onStatusChange={handleStatusChange}
                  onAddNote={handleAddNote}
                />
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Target className="w-16 h-16 mx-auto text-border-primary mb-4" />
                  <h2 className="text-xl font-semibold text-text-primary">No Job Selected</h2>
                  <p className="text-text-secondary mt-2">Please select a job from the list to see its details.</p>
                </div>
              </div>
            )}
          </div>
        );
      case 'suggestions':
        return (
          <div className="flex-1 p-6 overflow-y-auto">
            {selectedJob ? (
              <>
                <div className="mb-10">
                  <h1 className="text-3xl font-bold text-text-primary">Suggestions for {selectedJob.title}</h1>
                  <p className="text-text-secondary mt-1">AI-powered recommendations to improve your application.</p>
                </div>
                <Suggestions job={selectedJob} />
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto text-border-primary mb-4" />
                  <h2 className="text-xl font-semibold text-text-primary">No Job Selected</h2>
                  <p className="text-text-secondary mt-2">Select a job to see personalized application suggestions.</p>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex">
      <div className="w-64 bg-bg-secondary shadow-lg border-r border-border-primary flex flex-col">
        <div className="p-6 border-b border-border-primary">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">JobTracker</h1>
              <p className="text-sm text-text-secondary">Application Assistant</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentView(item.id as View)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                      currentView === item.id
                        ? 'bg-accent/10 text-accent'
                        : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-border-primary">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium text-text-secondary hover:bg-bg-primary hover:text-text-primary">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </div>

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;