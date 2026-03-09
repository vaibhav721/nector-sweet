import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from 'react-router-dom';
import { MainLayout } from './MainLayout';
const tabs = [
    { to: '/account', label: 'Dashboard' },
    { to: '/account/invoices', label: 'Invoice History' },
    { to: '/account/subscriptions', label: 'Subscriptions' },
    { to: '/account/profile', label: 'Profile' }
];
export const AccountLayout = ({ children }) => {
    return (_jsx(MainLayout, { children: _jsxs("div", { className: "space-y-5", children: [_jsx("h1", { className: "font-heading text-3xl", children: "Your Account" }), _jsx("div", { className: "flex flex-wrap gap-2", children: tabs.map((tab) => (_jsx(NavLink, { to: tab.to, end: tab.to === '/account', className: ({ isActive }) => `rounded-full px-4 py-2 text-sm font-semibold ${isActive ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-neutral-600'}`, children: tab.label }, tab.to))) }), children] }) }));
};
