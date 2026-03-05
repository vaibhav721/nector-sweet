import type { PropsWithChildren } from 'react';

export const Badge = ({ children }: PropsWithChildren) => (
  <span className="inline-flex rounded-full bg-[var(--color-secondary)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-text)]">
    {children}
  </span>
);
