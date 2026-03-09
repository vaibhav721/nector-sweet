import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { Navbar } from '../components/Navbar';
export const MainLayout = ({ children }) => {
    return (_jsxs("div", { className: "min-h-screen pb-16 md:pb-0", children: [_jsx(Navbar, {}), _jsx("main", { className: "mx-auto max-w-6xl px-4 py-8 md:px-6", children: children }), _jsx(Footer, {}), _jsx(MobileNav, {})] }));
};
