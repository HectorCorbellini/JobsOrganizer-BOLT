type JobStatus = 
  | 'new' 
  | 'reviewing' 
  | 'applied' 
  | 'interview_scheduled' 
  | 'interviewed' 
  | 'awaiting_response' 
  | 'offer_received' 
  | 'rejected' 
  | 'withdrawn';

interface Response {
  id: string;
  date: string;
  type: 'email' | 'phone' | 'linkedin' | 'other';
  message: string;
  sender: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Hybrid';
  technologies: string[];
  description: string;
  requirements: string[];
  benefits?: string[];
  applicationDeadline?: string;
  status: JobStatus;
  priority: Priority;
  dateAdded: string;
  applicationDate?: string;
  lastContact?: string;
  notes: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    website?: string;
    linkedin?: string;
  };
  responses: Response[];
}

export type Priority = 'high' | 'medium' | 'low';

export interface JobFilters {
  status?: JobStatus[];
  priority?: Priority[];
  location?: string;
  technologies?: string[];
  company?: string;
}