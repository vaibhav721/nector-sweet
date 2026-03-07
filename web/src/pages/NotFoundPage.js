import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
export const NotFoundPage = () => {
    return (_jsxs(Card, { className: "mx-auto max-w-lg text-center", children: [_jsx("h1", { className: "font-heading text-5xl", children: "404" }), _jsx("p", { className: "mt-2 text-neutral-600", children: "The page you are looking for is not available." }), _jsx(Link, { to: "/", className: "mt-5 inline-block", children: _jsx(Button, { children: "Return home" }) })] }));
};
