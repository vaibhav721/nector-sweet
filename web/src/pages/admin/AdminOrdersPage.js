import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Select } from '../../components/Select';
import { apiClient } from '../../lib/api';
const statuses = ['PLACED', 'CONFIRMED', 'PACKING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];
export const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const load = async () => {
        const response = await apiClient.get('/admin/orders');
        setOrders(response.data.data);
    };
    useEffect(() => {
        load();
    }, []);
    return (_jsxs("div", { className: "space-y-3", children: [_jsx("h1", { className: "font-heading text-3xl", children: "Orders Management" }), orders.map((order) => (_jsx(Card, { children: _jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: order.orderNumber }), _jsxs("p", { className: "text-sm text-neutral-500", children: [order.city, ", ", order.area, " (", order.pincode, ")"] }), _jsxs("p", { className: "text-sm", children: ["Total Rs ", order.total.toFixed(2)] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Select, { defaultValue: order.status, onChange: (event) => apiClient.patch(`/admin/orders/${order._id}`, {
                                        status: event.target.value
                                    }), children: statuses.map((status) => (_jsx("option", { value: status, children: status }, status))) }), _jsx(Button, { variant: "ghost", onClick: async () => {
                                        await apiClient.patch(`/admin/orders/${order._id}`, {
                                            paymentStatus: 'MANUAL_SETTLEMENT'
                                        });
                                        load();
                                    }, children: "Mark Manual" })] })] }) }, order._id)))] }));
};
