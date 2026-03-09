import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { EmptyState } from '../components/EmptyState';
import { Input } from '../components/Input';
import { useCartStore } from '../context/CartStore';
export const CartPage = () => {
    const navigate = useNavigate();
    const cart = useCartStore((state) => state.cart);
    const fetchCart = useCartStore((state) => state.fetchCart);
    const updateItem = useCartStore((state) => state.updateItem);
    const removeItem = useCartStore((state) => state.removeItem);
    const setLocation = useCartStore((state) => state.setLocation);
    const [locationDraft, setLocationDraft] = useState({ city: '', area: '', pincode: '' });
    useEffect(() => {
        fetchCart();
    }, [fetchCart]);
    useEffect(() => {
        if (cart) {
            setLocationDraft({
                city: cart.city || '',
                area: cart.area || '',
                pincode: cart.pincode || ''
            });
        }
    }, [cart]);
    if (!cart || !cart.items?.length) {
        return (_jsx(EmptyState, { title: "Your cart is empty", description: "Add milk and dairy products to get started.", ctaLabel: "Go to shop", onCta: () => navigate('/shop') }));
    }
    return (_jsxs("div", { className: "grid gap-8 md:grid-cols-[1fr_320px] max-w-5xl mx-auto", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h1", { className: "font-heading text-3xl font-bold tracking-tight text-neutral-900", children: "Cart" }), cart.items.map((item) => (_jsx(Card, { className: "p-4 border-none shadow-sm ring-1 ring-neutral-100", children: _jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold text-neutral-900", children: item.productName }), _jsx("p", { className: "text-sm text-neutral-500", children: item.variantName }), _jsx("p", { className: "mt-1 inline-block rounded bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600", children: item.purchaseMode.replace('_', ' ') })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Input, { className: "w-20 text-center", type: "number", value: item.quantity, min: 1, onChange: (event) => updateItem(item.id, { quantity: Number(event.target.value) }) }), _jsx(Button, { variant: "ghost", className: "text-red-500 hover:text-red-600 hover:bg-red-50", onClick: () => removeItem(item.id), children: "Remove" })] })] }) }, item.id)))] }), _jsxs(Card, { className: "h-fit space-y-5 border-none shadow-sm ring-1 ring-neutral-100 p-6 bg-neutral-50/50", children: [_jsx("h2", { className: "font-heading text-xl font-bold text-neutral-900", children: "Order Summary" }), _jsxs("div", { className: "space-y-2 text-sm text-neutral-600", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("p", { children: "Subtotal:" }), " ", _jsxs("p", { children: ["Rs ", cart.subtotal.toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between text-primary", children: [_jsx("p", { children: "Subscription Discount:" }), " ", _jsxs("p", { children: ["- Rs ", cart.subscriptionDiscount.toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("p", { children: "Tax:" }), " ", _jsxs("p", { children: ["Rs ", cart.tax.toFixed(2)] })] }), _jsxs("div", { className: "pt-3 mt-3 border-t border-neutral-200 flex justify-between items-center", children: [_jsx("p", { className: "font-bold text-neutral-900 uppercase tracking-wide text-xs", children: "Total" }), _jsxs("p", { className: "font-bold text-xl text-neutral-900", children: ["Rs ", cart.total.toFixed(2)] })] })] }), _jsxs("div", { className: "space-y-3 pt-4 border-t border-neutral-200", children: [_jsx("p", { className: "text-xs font-bold uppercase tracking-wide text-neutral-500", children: "Delivery location" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Input, { placeholder: "City", value: locationDraft.city, onChange: (event) => setLocationDraft((prev) => ({ ...prev, city: event.target.value })) }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx(Input, { placeholder: "Area", value: locationDraft.area, onChange: (event) => setLocationDraft((prev) => ({ ...prev, area: event.target.value })) }), _jsx(Input, { placeholder: "Pincode", value: locationDraft.pincode, onChange: (event) => setLocationDraft((prev) => ({ ...prev, pincode: event.target.value })) })] })] }), _jsx(Button, { variant: "secondary", className: "w-full text-xs", onClick: () => setLocation(locationDraft), children: "Save location" })] }), _jsx(Link, { to: "/checkout", className: "block mt-6", children: _jsx(Button, { className: "w-full py-3 text-base shadow-sm", children: "Proceed to checkout" }) })] })] }));
};
