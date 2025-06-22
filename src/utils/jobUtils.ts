import { Job, Priority } from '../domain/models/Job';

export const calculatePriority = (job: Job): Priority => {
  let score = 0;
  
  // Location priority (Uruguay gets highest priority)
  if (job.location.toLowerCase().includes('uruguay') || job.location.toLowerCase().includes('montevideo')) {
    score += 3;
  } else if (job.location.toLowerCase().includes('remote') || job.location.toLowerCase().includes('latin america')) {
    score += 2;
  } else {
    score += 1;
  }
  
  // Technology stack (Java gets priority)
  if (job.technologies.some(tech => tech.toLowerCase().includes('java'))) {
    score += 2;
  }
  
  // Compensation (paid positions get priority)
  if (job.salary && job.salary.includes('$')) {
    score += 1;
  }
  
  if (score >= 5) return 'high';
  if (score >= 3) return 'medium';
  return 'low';
};

export const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case 'high': return 'text-red-600 bg-red-50';
    case 'medium': return 'text-yellow-600 bg-yellow-50';
    case 'low': return 'text-green-600 bg-green-50';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'new': return 'text-blue-600 bg-blue-50';
    case 'reviewing': return 'text-purple-600 bg-purple-50';
    case 'applied': return 'text-indigo-600 bg-indigo-50';
    case 'interview_scheduled': return 'text-orange-600 bg-orange-50';
    case 'interviewed': return 'text-cyan-600 bg-cyan-50';
    case 'awaiting_response': return 'text-yellow-600 bg-yellow-50';
    case 'offer_received': return 'text-green-600 bg-green-50';
    case 'rejected': return 'text-red-600 bg-red-50';
    case 'withdrawn': return 'text-gray-600 bg-gray-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

export const formatStatus = (status: string): string => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};