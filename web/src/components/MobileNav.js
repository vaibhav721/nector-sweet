import { jsx as _jsx } from "react/jsx-runtime";
import { NavLink } from 'react-router-dom';
const links = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/subscription-planner', label: 'Subs' },
    { to: '/cart', label: 'Cart' },
    { to: '/account', label: 'Account' }
];
export const MobileNav = () => {
    return (_jsx("div", { className: "fixed bottom-0 left-0 right-0 z-20 border-t border-neutral-200 bg-white md:hidden", children: _jsx("div", { className: "grid grid-cols-5", children: links.map((link) => (_jsx(NavLink, { to: link.to, className: ({ isActive }) => `flex flex-col items-center justify-center py-3 text-xs font-semibold transition-colors active:scale-95 ${isActive ? 'text-[var(--color-primary)]' : 'text-neutral-500 hover:text-neutral-900'}`, children: link.label }, link.to))) }) }));
};
