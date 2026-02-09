import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  metrics: string;
}

export interface Metric {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface GeneratedIdea {
  title: string;
  format: string;
  synopsis: string;
}