import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from './Button';
export const EmptyState = ({ title, description, ctaLabel, onCta }) => {
    return (_jsxs("div", { className: "rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center", children: [_jsx("h3", { className: "font-heading text-2xl", children: title }), _jsx("p", { className: "mt-2 text-sm text-neutral-600", children: description }), ctaLabel ? (_jsx(Button, { className: "mt-4", onClick: onCta, children: ctaLabel })) : null] }));
};
