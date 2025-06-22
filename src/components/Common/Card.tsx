import React, { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => (
  <div className={`bg-bg-secondary p-6 rounded-lg shadow-lg border border-border-primary ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
