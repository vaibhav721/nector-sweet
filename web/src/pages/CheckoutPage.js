import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Toast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../lib/api';
export const CheckoutPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [preview, setPreview] = useState(null);
    const [slotId, setSlotId] = useState('');
    const [message, setMessage] = useState('');
    useEffect(() => {
        if (!user) {
            return;
        }
        const load = async () => {
            const response = await apiClient.post('/checkout/preview');
            setPreview(response.data.data);
            setSlotId(response.data.data.availableSlots[0]?.id || '');
        };
        load().catch((error) => {
            setMessage(error.response?.data?.error?.message || 'Unable to load checkout.');
        });
    }, [user]);
    if (!user) {
        return (_jsxs(Card, { children: [_jsx("h1", { className: "font-heading text-3xl", children: "Login required" }), _jsx("p", { className: "mt-2 text-sm text-neutral-600", children: "Please login to place an order or start subscriptions." }), _jsx(Button, { className: "mt-4", onClick: () => navigate('/auth'), children: "Go to login" })] }));
    }
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("h1", { className: "font-heading text-4xl", children: "Checkout" }), message ? _jsx(Toast, { tone: "error", message: message }) : null, preview ? (_jsxs(Card, { className: "space-y-3 md:max-w-2xl", children: [_jsx("p", { className: "text-sm text-neutral-700", children: preview.paymentMode.note }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-neutral-500", children: "Delivery slot" }), _jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: preview.availableSlots.map((slot) => (_jsx("button", { className: `rounded-xl px-4 py-2 text-sm font-semibold transition-colors active:scale-95 ${slotId === slot.id ? 'bg-primary text-white shadow-sm' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`, onClick: () => setSlotId(slot.id), children: slot.label }, slot.id))) })] }), preview.shortages?.length ? (_jsx(Toast, { tone: "info", message: "Some subscription items may have temporary stock shortage. Our team will notify you." })) : null, _jsxs("div", { className: "text-sm text-neutral-700", children: [_jsxs("p", { children: ["Subtotal: Rs ", preview.cart.subtotal.toFixed(2)] }), _jsxs("p", { children: ["Tax: Rs ", preview.cart.tax.toFixed(2)] }), _jsxs("p", { className: "font-semibold", children: ["Total: Rs ", preview.cart.total.toFixed(2)] })] }), _jsx(Button, { onClick: async () => {
                            const response = await apiClient.post('/checkout/place', { deliverySlotId: slotId });
                            navigate(`/order-success?order=${response.data.data.order._id}`);
                        }, children: "Place order (payment pending)" })] })) : null] }));
};
