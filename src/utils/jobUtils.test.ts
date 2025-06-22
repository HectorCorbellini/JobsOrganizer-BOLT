import { describe, it, expect } from 'vitest';
import { calculatePriority, getPriorityColor, getStatusColor, formatStatus } from './jobUtils';
import type { Job, Priority } from '../domain/models/Job';

// Mock job data for testing
const baseJob: Omit<Job, 'priority'> & { priority?: Priority } = {
  id: '1',
  title: 'Test Role',
  company: 'TestCo',
  location: 'Remote',
  salary: '$1000',
  status: 'new',
  technologies: ['Java'],
  description: 'Test description',
  contactInfo: { email: 'test@example.com' },
  dateAdded: new Date(),
  dueDate: null,
  responses: [],
};

describe('calculatePriority', () => {
  it('assigns high priority for Uruguay + Java + paid', () => {
    const job = { ...baseJob, location: 'Montevideo, Uruguay' };
    const priority = calculatePriority(job as Job);
    expect(priority).toBe('high');
  });

  it('assigns medium priority for remote + Java', () => {
    const job = { ...baseJob, location: 'Remote', salary: '' };
    const priority = calculatePriority(job as Job);
    expect(priority).toBe('medium');
  });

  it('assigns low priority otherwise', () => {
    const job = { ...baseJob, location: 'London', technologies: [], salary: '' };
    const priority = calculatePriority(job as Job);
    expect(priority).toBe('low');
  });
});

describe('getPriorityColor', () => {
  it('returns correct class for each priority', () => {
    expect(getPriorityColor('high')).toContain('text-red');
    expect(getPriorityColor('medium')).toContain('text-yellow');
    expect(getPriorityColor('low')).toContain('text-green');
  });
});

describe('getStatusColor', () => {
  it('maps known statuses correctly', () => {
    expect(getStatusColor('new')).toContain('text-blue');
    expect(getStatusColor('offer_received')).toContain('text-green');
  });
  it('defaults to gray for unknown status', () => {
    expect(getStatusColor('unknown')).toContain('text-gray');
  });
});

describe('formatStatus', () => {
  it('formats snake_case to Title Case', () => {
    expect(formatStatus('awaiting_response')).toBe('Awaiting Response');
  });
});
