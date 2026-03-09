import { jsx as _jsx } from "react/jsx-runtime";
export const Card = ({ children, className = '' }) => {
    return _jsx("div", { className: `rounded-2xl border border-neutral-100 bg-white p-5 shadow-card transition-all hover:shadow-soft ${className}`, children: children });
};
