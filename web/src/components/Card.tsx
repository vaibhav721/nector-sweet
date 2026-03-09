import type { PropsWithChildren } from 'react';

export const Card = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => {
  return <div className={`rounded-2xl border border-neutral-100 bg-white p-5 shadow-card transition-all hover:shadow-soft ${className}`}>{children}</div>;
};
