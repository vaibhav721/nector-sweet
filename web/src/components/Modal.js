import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Modal = ({ open, onClose, title, children }) => {
    if (!open) {
        return null;
    }
    return (_jsx("div", { className: "fixed inset-0 z-40 flex items-center justify-center bg-black/25 p-4", children: _jsxs("div", { className: "w-full max-w-lg rounded-2xl bg-white p-5 shadow-soft", children: [_jsxs("div", { className: "mb-3 flex items-center justify-between", children: [_jsx("h3", { className: "font-heading text-xl", children: title }), _jsx("button", { onClick: onClose, className: "text-sm text-neutral-500", children: "Close" })] }), children] }) }));
};
