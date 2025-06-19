import React from 'react';

interface JobCardSectionProps {
  title: string;
  children: React.ReactNode;
}

const JobCardSection: React.FC<JobCardSectionProps> = ({ title, children }) => (
  <div>
    <h3 className="text-sm font-semibold text-text-primary mb-2">{title}</h3>
    {children}
  </div>
);

export default JobCardSection;
