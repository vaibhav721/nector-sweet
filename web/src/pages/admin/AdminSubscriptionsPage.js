import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { Select } from '../../components/Select';
import { apiClient } from '../../lib/api';
export const AdminSubscriptionsPage = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const load = async () => {
        const response = await apiClient.get('/admin/subscriptions');
        setSubscriptions(response.data.data);
    };
    useEffect(() => {
        load();
    }, []);
    return (_jsxs("div", { className: "space-y-3", children: [_jsx("h1", { className: "font-heading text-3xl", children: "Subscription Management" }), subscriptions.map((subscription) => (_jsx(Card, { children: _jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [_jsxs("div", { children: [_jsxs("p", { className: "font-semibold", children: ["Subscription #", subscription._id.slice(-6)] }), _jsxs("p", { className: "text-sm text-neutral-500", children: ["Frequency ", subscription.frequency, " | Quantity ", subscription.quantity] })] }), _jsxs(Select, { defaultValue: subscription.status, onChange: (event) => apiClient.patch(`/admin/subscriptions/${subscription._id}`, {
                                status: event.target.value
                            }), children: [_jsx("option", { value: "ACTIVE", children: "ACTIVE" }), _jsx("option", { value: "PAUSED", children: "PAUSED" }), _jsx("option", { value: "CANCELLED", children: "CANCELLED" })] })] }) }, subscription._id)))] }));
};
