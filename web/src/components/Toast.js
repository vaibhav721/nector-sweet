import { jsx as _jsx } from "react/jsx-runtime";
export const Toast = ({ message, tone = 'info' }) => {
    const classes = tone === 'error'
        ? 'border-rose-200 bg-rose-50 text-rose-700'
        : tone === 'success'
            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
            : 'border-neutral-200 bg-white text-neutral-700';
    return _jsx("div", { className: `rounded-xl border px-3 py-2 text-sm ${classes}`, children: message });
};
