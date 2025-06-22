import { Prisma, Job as PrismaJob, Response as PrismaResponse, JobType, JobStatus, Priority } from '@prisma/client';

export type ApiJobDTO = {
  title: string;
  company: string;
  location: string;
  salary?: string | null;
  type?: string;
  technologies: string[];
  description: string;
  requirements?: string[];
  benefits?: string[];
  status?: string;
  priority?: string;
  applicationDeadline?: string;
  applicationDate?: string;
  lastContact?: string;
  notes?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    website?: string;
    linkedin?: string;
  };
};

type JobWithResponses = PrismaJob & {
  responses: PrismaResponse[];
};

export const transformJobFromDB = (job: JobWithResponses) => {
  return {
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    salary: job.salary,
    type: job.type.toLowerCase().replace('_', '-'),
    technologies: job.technologies,
    description: job.description,
    requirements: job.requirements,
    benefits: job.benefits,
    applicationDeadline: job.applicationDeadline?.toISOString(),
    status: job.status.toLowerCase().replace('_', '_'),
    priority: job.priority.toLowerCase(),
    dateAdded: job.dateAdded.toISOString(),
    applicationDate: job.applicationDate?.toISOString(),
    lastContact: job.lastContact?.toISOString(),
    notes: job.notes,
    contactInfo: {
      email: job.contactEmail,
      phone: job.contactPhone,
      website: job.contactWebsite,
      linkedin: job.contactLinkedin
    },
    responses: job.responses.map(response => ({
      id: response.id,
      date: response.date.toISOString(),
      type: response.type.toLowerCase(),
      message: response.message,
      sender: response.sender
    }))
  };
};

export const transformJobToDB = (job: ApiJobDTO): Prisma.JobCreateInput => {
  const data: Prisma.JobCreateInput = {
    title: job.title,
    company: job.company,
    location: job.location,
    salary: job.salary,
    type: job.type
      ? (job.type.toUpperCase().replace('-', '_') as JobType)
      : JobType.FULL_TIME,
    technologies: job.technologies,
    description: job.description,
    requirements: job.requirements,
    benefits: job.benefits || [],
    status: job.status
      ? (job.status.toUpperCase().replace('_', '_') as JobStatus)
      : JobStatus.NEW,
    priority: job.priority
      ? (job.priority.toUpperCase() as Priority)
      : Priority.MEDIUM
  };

  if (job.applicationDeadline) {
    data.applicationDeadline = new Date(job.applicationDeadline);
  }

  if (job.applicationDate) {
    data.applicationDate = new Date(job.applicationDate);
  }

  if (job.lastContact) {
    data.lastContact = new Date(job.lastContact);
  }

  if (job.notes) {
    data.notes = job.notes;
  }

  if (job.contactInfo) {
    data.contactEmail = job.contactInfo.email;
    data.contactPhone = job.contactInfo.phone;
    data.contactWebsite = job.contactInfo.website;
    data.contactLinkedin = job.contactInfo.linkedin;
  }

  return data;
};