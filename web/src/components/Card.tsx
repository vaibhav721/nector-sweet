import type { PropsWithChildren } from 'react';

export const Card = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => {
  return <div className={`rounded-2xl bg-white p-5 shadow-soft ${className}`}>{children}</div>;
};
