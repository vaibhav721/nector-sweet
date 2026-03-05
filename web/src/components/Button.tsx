import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-[var(--color-primary)] text-white hover:opacity-95',
  secondary: 'bg-[var(--color-secondary)] text-[var(--color-text)] hover:brightness-95',
  ghost: 'bg-white/60 text-[var(--color-text)] border border-neutral-200 hover:bg-white',
  danger: 'bg-rose-600 text-white hover:bg-rose-700'
};

export const Button = ({
  children,
  className,
  variant = 'primary',
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: Variant;
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold transition ${variantClasses[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};
