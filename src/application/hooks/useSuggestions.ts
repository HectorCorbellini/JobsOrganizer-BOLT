import { Job } from '../../domain/models/Job';

export interface ApplicationStrategy {
  method: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export const useSuggestions = (job: Job) => {
  const getCvSuggestions = (): string[] => {
    const suggestions: string[] = [];

    if (job.technologies.includes('Java')) {
      suggestions.push('Highlight Java development experience and Spring Framework expertise');
      suggestions.push('Include specific Java projects with microservices architecture');
    }

    if (job.location.includes('Uruguay')) {
      suggestions.push('Emphasize local presence and Spanish/English fluency');
      suggestions.push('Mention familiarity with Uruguayan business culture');
    }

    if (job.type === 'Remote') {
      suggestions.push('Highlight remote work experience and self-management skills');
      suggestions.push('Include home office setup and communication tools proficiency');
    }

    return suggestions;
  };

  const getApplicationStrategy = (): ApplicationStrategy[] => {
    const strategies: ApplicationStrategy[] = [];

    if (job.contactInfo?.email) {
      strategies.push({
        method: 'Direct Email',
        description: 'Send a personalized email with CV and cover letter',
        priority: 'high',
      });
    }

    if (job.contactInfo?.linkedin) {
      strategies.push({
        method: 'LinkedIn Message',
        description: 'Connect with hiring manager and send a brief, professional message',
        priority: 'medium',
      });
    }

    strategies.push({
      method: 'Company Website',
      description: 'Apply through their careers page if available',
      priority: 'medium',
    });

    return strategies;
  };

  const getLinkedInContentSuggestions = (): string[] => {
    const suggestions: string[] = [];

    if (job.technologies.includes('Java')) {
      suggestions.push('Share an article about Java best practices or new features');
      suggestions.push('Post about a recent Java project or learning experience');
    }

    if (job.company.toLowerCase().includes('startup')) {
      suggestions.push('Share insights about startup development challenges');
      suggestions.push('Post about agile development methodologies');
    }

    suggestions.push(`Write about trends in ${job.technologies[0]} development`);

    return suggestions;
  };

  const getFollowUpTips = (): string[] => [
    'Send application confirmation email within 24 hours',
    'Follow up after 1 week if no response received',
    'Connect with company employees on LinkedIn',
    'Set calendar reminder for application deadline',
    'Research company news for conversation starters',
  ];

  const cvSuggestions = getCvSuggestions();
  const applicationStrategies = getApplicationStrategy();
  const linkedinSuggestions = getLinkedInContentSuggestions();
  const followUpTips = getFollowUpTips();

  return { cvSuggestions, applicationStrategies, linkedinSuggestions, followUpTips };
};
