import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { LoadingState } from '../components/LoadingState';
import { Select } from '../components/Select';
import { Toast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { useCartStore } from '../context/CartStore';
import { apiClient } from '../lib/api';
export const ShopPage = () => {
    const { user } = useAuth();
    const addItem = useCartStore((state) => state.addItem);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const [categoryResponse, productResponse] = await Promise.all([
                apiClient.get('/catalog/categories'),
                apiClient.get('/catalog/products')
            ]);
            setCategories(categoryResponse.data.data);
            setProducts(productResponse.data.data);
            setLoading(false);
        };
        load();
    }, []);
    const filtered = useMemo(() => {
        if (!categoryId) {
            return products;
        }
        return products.filter((product) => product.categoryId === categoryId);
    }, [categoryId, products]);
    const addOneTime = async (variantId) => {
        await addItem({
            variantId,
            quantity: 1,
            purchaseMode: 'ONE_TIME'
        });
        setMessage('Added to cart');
    };
    const addSubscription = async (variantId) => {
        if (!user) {
            setMessage('Please login to start subscriptions.');
            return;
        }
        await addItem({
            variantId,
            quantity: 1,
            purchaseMode: 'SUBSCRIPTION',
            frequency: 'DAILY'
        });
        setMessage('Subscription item added to cart');
    };
    if (loading) {
        return _jsx(LoadingState, { label: "Loading products..." });
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [_jsxs("div", { children: [_jsx("h1", { className: "font-heading text-3xl font-bold tracking-tight text-neutral-900", children: "Shop Dairy Products" }), _jsx("p", { className: "mt-2 text-neutral-500", children: "Choose one-time or subscription per item." })] }), _jsxs("div", { className: "w-full md:w-72", children: [_jsx("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-500", children: "Filter by category" }), _jsxs(Select, { value: categoryId, onChange: (event) => setCategoryId(event.target.value), children: [_jsx("option", { value: "", children: "All categories" }), categories.map((category) => (_jsx("option", { value: category._id, children: category.name }, category._id)))] })] })] }), message ? _jsx(Toast, { message: message, tone: "success" }) : null, _jsx("div", { className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3", children: filtered.map((product) => (_jsxs(Card, { className: "flex flex-col gap-4 overflow-hidden p-0", children: [product.images?.[0] ? (_jsx("img", { src: `${import.meta.env.VITE_API_BASE_URL}${product.images[0]}`, alt: product.name, className: "h-48 w-full object-cover bg-neutral-100" })) : (_jsx("div", { className: "h-48 w-full bg-neutral-100 flex items-center justify-center", children: _jsx("span", { className: "text-neutral-400 text-sm", children: "No image" }) })), _jsxs("div", { className: "flex flex-col gap-4 p-5 flex-1", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-heading text-2xl font-bold text-neutral-900", children: product.name }), _jsx("p", { className: "mt-1 text-sm text-neutral-500 leading-relaxed", children: product.shortDescription })] }), _jsx("div", { className: "space-y-3", children: product.variants.map((variant) => (_jsx("div", { className: "rounded-xl border border-neutral-100 bg-neutral-50 p-4 text-sm transition-colors hover:border-primary/30", children: _jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-semibold text-neutral-900", children: variant.name }), _jsxs("div", { className: "mt-1 flex items-center gap-3", children: [_jsxs("p", { className: "text-xs font-medium text-neutral-500", children: ["One-time Rs ", variant.oneTimePrice] }), _jsxs("p", { className: "rounded bg-primary/10 px-1.5 py-0.5 text-xs font-semibold text-primary", children: ["Subscribe Rs ", variant.subscriptionPrice] })] })] }), _jsxs("div", { className: "flex w-24 flex-col gap-2", children: [_jsx(Button, { className: "w-full text-xs shadow-none py-1.5", onClick: () => addOneTime(variant._id), children: "Add" }), _jsx(Button, { className: "w-full text-xs shadow-none py-1.5 border border-primary/20 text-primary bg-white hover:bg-primary/5", variant: "ghost", onClick: () => addSubscription(variant._id), children: "Subscribe" })] })] }) }, variant._id))) }), _jsx(Link, { to: `/products/${product.slug}`, className: "mt-auto pt-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover", children: "View details \u2192" })] })] }, product._id))) })] }));
};
