import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { LoadingState } from '../components/LoadingState';
import { Toast } from '../components/Toast';
import { useCartStore } from '../context/CartStore';
import { apiClient } from '../lib/api';
export const ProductDetailPage = () => {
    const { slug } = useParams();
    const addItem = useCartStore((state) => state.addItem);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState('');
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const response = await apiClient.get(`/catalog/products/${slug}`);
            setProduct(response.data.data);
            setLoading(false);
        };
        load();
    }, [slug]);
    if (loading) {
        return _jsx(LoadingState, { label: "Loading product..." });
    }
    if (!product) {
        return _jsx(Toast, { tone: "error", message: "Product unavailable" });
    }
    return (_jsxs("div", { className: "grid gap-6 md:grid-cols-[1.1fr_0.9fr]", children: [_jsxs(Card, { className: "overflow-hidden p-0", children: [product.images?.[0] ? (_jsx("img", { src: `${import.meta.env.VITE_API_BASE_URL}${product.images[0]}`, alt: product.name, className: "h-64 w-full object-cover bg-neutral-100" })) : (_jsx("div", { className: "h-48 w-full bg-neutral-100 flex items-center justify-center", children: _jsx("span", { className: "text-neutral-400 text-sm", children: "No image" }) })), _jsxs("div", { className: "p-6", children: [_jsx("h1", { className: "font-heading text-4xl", children: product.name }), _jsx("p", { className: "mt-3 leading-relaxed text-neutral-600", children: product.description || product.shortDescription }), _jsx("div", { className: "mt-8 space-y-4", children: product.variants.map((variant) => (_jsx("div", { className: "rounded-xl border border-neutral-100 bg-neutral-50 p-5", children: _jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold text-neutral-900", children: variant.name }), _jsxs("div", { className: "mt-1 flex items-center gap-3", children: [_jsxs("p", { className: "text-sm font-medium text-neutral-500", children: ["One-time Rs ", variant.oneTimePrice] }), _jsxs("p", { className: "rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary", children: ["Subscribe Rs ", variant.subscriptionPrice] })] }), _jsx("p", { className: "mt-2 inline-block rounded-full bg-neutral-200/50 px-2 py-0.5 text-xs font-medium text-neutral-500", children: variant.inventory?.inStock ? 'Available' : 'Out of stock' })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Button, { className: "w-28 text-xs py-2 shadow-sm", onClick: async () => {
                                                            await addItem({ variantId: variant._id, quantity: 1, purchaseMode: 'ONE_TIME' });
                                                            setToast('Added to cart');
                                                        }, children: "Add" }), _jsx(Button, { className: "w-28 text-xs py-2 shadow-none border border-primary/20 text-primary bg-white hover:bg-primary/5", variant: "ghost", onClick: async () => {
                                                            await addItem({
                                                                variantId: variant._id,
                                                                quantity: 1,
                                                                purchaseMode: 'SUBSCRIPTION',
                                                                frequency: 'DAILY'
                                                            });
                                                            setToast('Subscription item added');
                                                        }, children: "Subscribe" })] })] }) }, variant._id))) })] })] }), _jsxs(Card, { className: "h-fit", children: [_jsx("h2", { className: "font-heading text-2xl", children: "Simple product info for MVP" }), _jsx("p", { className: "mt-2 text-sm text-neutral-600", children: "This page focuses on product selection, pack variants, and ordering actions." })] }), toast ? _jsx(Toast, { message: toast, tone: "success" }) : null] }));
};
