import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { EmptyState } from '../../components/EmptyState';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { Select } from '../../components/Select';
import { apiClient } from '../../lib/api';
export const ActiveSubscriptionsPage = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [selected, setSelected] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [frequency, setFrequency] = useState('DAILY');
    const load = async () => {
        const response = await apiClient.get('/subscriptions');
        setSubscriptions(response.data.data);
    };
    useEffect(() => {
        load();
    }, []);
    if (!subscriptions.length) {
        return (_jsx(EmptyState, { title: "No active subscriptions", description: "Add subscription products from the shop to manage them here." }));
    }
    return (_jsxs("div", { className: "space-y-3", children: [subscriptions.map((subscription) => (_jsx(Card, { children: _jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [_jsxs("div", { children: [_jsxs("p", { className: "font-semibold", children: ["Subscription #", subscription._id.slice(-6)] }), _jsxs("p", { className: "text-sm text-neutral-500", children: ["Frequency: ", subscription.frequency, " | Quantity: ", subscription.quantity] }), _jsxs("p", { className: "text-sm text-neutral-600", children: ["Status: ", subscription.status] })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Button, { variant: "ghost", onClick: () => setSelected(subscription), children: "Edit" }), _jsx(Button, { variant: "secondary", onClick: async () => {
                                        await apiClient.post(`/subscriptions/${subscription._id}/skip`, {
                                            date: new Date().toISOString().slice(0, 10)
                                        });
                                    }, children: "Skip day" }), _jsx(Button, { onClick: async () => {
                                        await apiClient.post(`/subscriptions/${subscription._id}/extra`, {
                                            date: new Date().toISOString().slice(0, 10),
                                            extraQuantity: 1
                                        });
                                    }, children: "+1 for a day" }), _jsx(Button, { variant: "secondary", onClick: async () => {
                                        const from = new Date().toISOString().slice(0, 10);
                                        const until = new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10);
                                        await apiClient.post(`/subscriptions/${subscription._id}/pause`, { from, until });
                                        load();
                                    }, children: "Pause" })] })] }) }, subscription._id))), _jsx(Modal, { open: Boolean(selected), onClose: () => setSelected(null), title: "Edit subscription controls", children: _jsxs("div", { className: "space-y-3", children: [_jsx(Input, { type: "number", min: 1, value: quantity, onChange: (event) => setQuantity(Number(event.target.value)) }), _jsxs(Select, { value: frequency, onChange: (event) => setFrequency(event.target.value), children: [_jsx("option", { value: "DAILY", children: "Daily" }), _jsx("option", { value: "ALTERNATE_DAY", children: "Alternate day" }), _jsx("option", { value: "CUSTOM", children: "Custom" })] }), _jsx(Button, { onClick: async () => {
                                await apiClient.patch(`/subscriptions/${selected._id}`, {
                                    quantity,
                                    frequency
                                });
                                setSelected(null);
                                load();
                            }, children: "Save changes" })] }) })] }));
};
