import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { copyBlocks } from '@nectar-sweet/shared';
import { Link } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
const controls = [
    'Pause subscription',
    'Skip one day',
    'Add extra quantity for one day',
    'Change frequency',
    'Edit quantity anytime'
];
export const SubscriptionPlannerPage = () => {
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx(Badge, { children: "Flexible Planner" }), _jsx("h1", { className: "mt-3 font-heading text-4xl", children: "Subscription Planner" }), _jsx("p", { className: "mt-2 max-w-2xl text-neutral-600", children: copyBlocks.subscriptionNote })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs(Card, { children: [_jsx("h2", { className: "font-heading text-2xl", children: "Frequencies" }), _jsxs("ul", { className: "mt-3 space-y-2 text-sm text-neutral-700", children: [_jsx("li", { children: "Daily deliveries" }), _jsx("li", { children: "Alternate-day deliveries" }), _jsx("li", { children: "Custom days for your weekly pattern" })] })] }), _jsxs(Card, { children: [_jsx("h2", { className: "font-heading text-2xl", children: "Control panel after purchase" }), _jsx("ul", { className: "mt-3 space-y-2 text-sm text-neutral-700", children: controls.map((item) => (_jsx("li", { children: item }, item))) })] })] }), _jsx(Link, { className: "inline-block text-sm font-semibold text-[var(--color-primary)]", to: "/shop", children: "Add subscription products from shop" })] }));
};
