import type { InputHTMLAttributes } from 'react';

export const Input = ({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none ring-[var(--color-primary)] transition focus:ring-2 ${className}`}
      {...props}
    />
  );
};
