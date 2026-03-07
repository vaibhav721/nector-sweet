import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { apiClient } from '../../lib/api';
export const AdminDashboardPage = () => {
    const [summary, setSummary] = useState(null);
    useEffect(() => {
        const load = async () => {
            const response = await apiClient.get('/admin/dashboard');
            setSummary(response.data.data);
        };
        load();
    }, []);
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("h1", { className: "font-heading text-3xl", children: "Dashboard" }), summary ? (_jsxs("div", { className: "grid gap-3 md:grid-cols-3", children: [_jsxs(Card, { children: [_jsx("p", { className: "text-sm text-neutral-500", children: "Today's deliveries" }), _jsx("p", { className: "mt-1 text-3xl font-bold", children: summary.todaysDeliveries })] }), _jsxs(Card, { children: [_jsx("p", { className: "text-sm text-neutral-500", children: "Subscription count" }), _jsx("p", { className: "mt-1 text-3xl font-bold", children: summary.activeSubscriptions })] }), _jsxs(Card, { children: [_jsx("p", { className: "text-sm text-neutral-500", children: "New users" }), _jsx("p", { className: "mt-1 text-3xl font-bold", children: summary.newUsers })] })] })) : null] }));
};
