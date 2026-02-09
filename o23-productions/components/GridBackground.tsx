import React from 'react';

export const GridBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none z-0 grid-bg ${className}`} />
  );
};
