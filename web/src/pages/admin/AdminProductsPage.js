import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { apiClient } from '../../lib/api';
export const AdminProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({
        categoryId: '',
        type: 'MILK',
        name: '',
        slug: '',
        shortDescription: ''
    });
    const load = async () => {
        const [productsResponse, categoriesResponse] = await Promise.all([
            apiClient.get('/admin/products'),
            apiClient.get('/catalog/categories')
        ]);
        setProducts(productsResponse.data.data);
        setCategories(categoriesResponse.data.data);
        if (!newProduct.categoryId && categoriesResponse.data.data[0]) {
            setNewProduct((prev) => ({ ...prev, categoryId: categoriesResponse.data.data[0]._id }));
        }
    };
    useEffect(() => {
        load();
    }, []);
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("h1", { className: "font-heading text-3xl", children: "Product Management" }), _jsxs(Card, { className: "space-y-2", children: [_jsx("h2", { className: "font-semibold", children: "Add product" }), _jsx(Select, { value: newProduct.categoryId, onChange: (event) => setNewProduct({ ...newProduct, categoryId: event.target.value }), children: categories.map((category) => (_jsx("option", { value: category._id, children: category.name }, category._id))) }), _jsxs(Select, { value: newProduct.type, onChange: (event) => setNewProduct({ ...newProduct, type: event.target.value }), children: [_jsx("option", { value: "MILK", children: "Milk" }), _jsx("option", { value: "CURD", children: "Curd" }), _jsx("option", { value: "PANEER", children: "Paneer" }), _jsx("option", { value: "GHEE", children: "Desi Ghee" })] }), _jsx(Input, { placeholder: "Name", value: newProduct.name, onChange: (event) => setNewProduct({ ...newProduct, name: event.target.value }) }), _jsx(Input, { placeholder: "Slug", value: newProduct.slug, onChange: (event) => setNewProduct({ ...newProduct, slug: event.target.value }) }), _jsx(Input, { placeholder: "Short description", value: newProduct.shortDescription, onChange: (event) => setNewProduct({ ...newProduct, shortDescription: event.target.value }) }), _jsx(Button, { onClick: async () => {
                            await apiClient.post('/admin/products', newProduct);
                            setNewProduct({ ...newProduct, name: '', slug: '', shortDescription: '' });
                            load();
                        }, children: "Create product" })] }), products.map((product) => (_jsxs(Card, { className: "space-y-3", children: [_jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: product.name }), _jsx("p", { className: "text-sm text-neutral-500", children: product.shortDescription })] }), _jsx(Button, { variant: "danger", onClick: async () => {
                                    await apiClient.delete(`/admin/products/${product._id}`);
                                    load();
                                }, children: "Archive" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-sm font-semibold", children: "Variants and pricing" }), product.variants.map((variant) => (_jsxs("div", { className: "rounded-lg border border-neutral-200 p-3 text-sm", children: [_jsx("p", { className: "font-semibold", children: variant.name }), _jsxs("p", { children: ["One-time Rs ", variant.oneTimePrice, " | Subscription Rs ", variant.subscriptionPrice] })] }, variant._id)))] })] }, product._id)))] }));
};
