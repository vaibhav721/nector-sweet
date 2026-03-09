import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { EmptyState } from '../../components/EmptyState';
import { apiClient } from '../../lib/api';
export const ReorderPage = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const load = async () => {
            const response = await apiClient.get('/orders');
            setOrders(response.data.data);
        };
        load();
    }, []);
    if (!orders.length) {
        return _jsx(EmptyState, { title: "No past orders", description: "Place an order first to use reorder." });
    }
    return (_jsx("div", { className: "space-y-3", children: orders.map((order) => (_jsx(Card, { children: _jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: order.orderNumber }), _jsx("p", { className: "text-sm text-neutral-500", children: new Date(order.createdAt).toLocaleString() }), _jsxs("p", { className: "text-sm text-neutral-600", children: [order.items?.length || 0, " items"] })] }), _jsx(Button, { onClick: async () => {
                            await apiClient.post(`/orders/${order._id}/reorder`);
                            window.location.href = '/cart';
                        }, children: "Reorder this" })] }) }, order._id))) }));
};
