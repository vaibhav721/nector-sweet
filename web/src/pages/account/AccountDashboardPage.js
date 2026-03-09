import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/Card';
import { EmptyState } from '../../components/EmptyState';
import { apiClient } from '../../lib/api';
export const AccountDashboardPage = () => {
    const [orders, setOrders] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    useEffect(() => {
        const load = async () => {
            const [ordersResponse, subscriptionsResponse] = await Promise.all([
                apiClient.get('/orders'),
                apiClient.get('/subscriptions')
            ]);
            setOrders(ordersResponse.data.data);
            setSubscriptions(subscriptionsResponse.data.data);
        };
        load();
    }, []);
    if (!orders.length && !subscriptions.length) {
        return (_jsx(EmptyState, { title: "Welcome to your account", description: "Your orders and subscriptions will appear here once you place your first order." }));
    }
    return (_jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs(Card, { children: [_jsx("h3", { className: "font-heading text-2xl", children: "Recent Orders" }), _jsx("p", { className: "mt-2 text-3xl font-bold", children: orders.length }), _jsx("p", { className: "text-sm text-neutral-600", children: "Total orders placed" }), _jsx(Link, { className: "mt-4 inline-block text-sm font-semibold text-[var(--color-primary)]", to: "/account/invoices", children: "View invoice history" })] }), _jsxs(Card, { children: [_jsx("h3", { className: "font-heading text-2xl", children: "Active Subscriptions" }), _jsx("p", { className: "mt-2 text-3xl font-bold", children: subscriptions.filter((item) => item.status === 'ACTIVE').length }), _jsx("p", { className: "text-sm text-neutral-600", children: "Running subscription lines" }), _jsx(Link, { className: "mt-4 inline-block text-sm font-semibold text-[var(--color-primary)]", to: "/account/subscriptions", children: "Manage subscriptions" })] }), _jsxs(Card, { className: "md:col-span-2", children: [_jsx("h3", { className: "font-heading text-2xl", children: "Quick Reorder" }), _jsx("p", { className: "mt-2 text-sm text-neutral-600", children: "Reorder from your invoice history in one click." }), _jsx(Link, { className: "mt-3 inline-block text-sm font-semibold text-[var(--color-primary)]", to: "/account/reorder", children: "Open reorder flow" })] })] }));
};
