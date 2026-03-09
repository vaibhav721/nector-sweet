import { jsx as _jsx } from "react/jsx-runtime";
export const LoadingState = ({ label = 'Loading...' }) => {
    return (_jsx("div", { className: "animate-pulse rounded-2xl bg-white p-6 text-center text-sm text-neutral-500 shadow-soft", children: label }));
};
