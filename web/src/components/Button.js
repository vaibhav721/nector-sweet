import { jsx as _jsx } from "react/jsx-runtime";
const variantClasses = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)] active:scale-95 shadow-sm',
    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:scale-95',
    ghost: 'bg-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 active:scale-95',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:scale-95 shadow-sm'
};
export const Button = ({ children, className, variant = 'primary', ...props }) => {
    return (_jsx("button", { className: `inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold transition ${variantClasses[variant]} ${className || ''}`, ...props, children: children }));
};
