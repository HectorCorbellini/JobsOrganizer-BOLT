import { Job as PrismaJob, Response as PrismaResponse } from '@prisma/client';

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

export const transformJobToDB = (job: any) => {
  const data: any = {
    title: job.title,
    company: job.company,
    location: job.location,
    salary: job.salary,
    type: job.type.toUpperCase().replace('-', '_'),
    technologies: job.technologies,
    description: job.description,
    requirements: job.requirements,
    benefits: job.benefits || [],
    status: job.status ? job.status.toUpperCase().replace('_', '_') : 'NEW',
    priority: job.priority ? job.priority.toUpperCase() : 'MEDIUM'
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