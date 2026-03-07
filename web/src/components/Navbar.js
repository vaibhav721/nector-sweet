import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
export const Navbar = () => {
    const { user } = useAuth();
    return (_jsx("header", { className: "sticky top-0 z-30 border-b border-neutral-100 bg-white/90 backdrop-blur-md transition-all", children: _jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6", children: [_jsx(Link, { to: "/", className: "transition-opacity hover:opacity-90", children: _jsx(Logo, {}) }), _jsxs("nav", { className: "hidden items-center gap-6 text-sm font-semibold md:flex", children: [_jsx(NavLink, { to: "/shop", className: "hover:text-[var(--color-primary)]", children: "Shop" }), _jsx(NavLink, { to: "/subscription-planner", className: "hover:text-[var(--color-primary)]", children: "Subscription" }), _jsx(NavLink, { to: "/serviceability", className: "hover:text-[var(--color-primary)]", children: "Serviceability" }), _jsx(NavLink, { to: "/our-story", className: "hover:text-[var(--color-primary)]", children: "Our Story" }), _jsx(NavLink, { to: "/cart", className: "hover:text-[var(--color-primary)]", children: "Cart" }), user ? (_jsx(NavLink, { to: "/account", className: "hover:text-[var(--color-primary)]", children: "Account" })) : (_jsx(NavLink, { to: "/auth", className: "hover:text-[var(--color-primary)]", children: "Login" }))] })] }) }));
};
