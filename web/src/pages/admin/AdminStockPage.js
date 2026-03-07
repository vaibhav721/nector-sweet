import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { apiClient } from '../../lib/api';
export const AdminStockPage = () => {
    const [rows, setRows] = useState([]);
    const load = async () => {
        const response = await apiClient.get('/admin/stock');
        setRows(response.data.data);
    };
    useEffect(() => {
        load();
    }, []);
    return (_jsxs("div", { className: "space-y-3", children: [_jsx("h1", { className: "font-heading text-3xl", children: "Stock Availability Management" }), rows.map((row) => (_jsx(Card, { children: _jsxs("div", { className: "grid items-center gap-3 md:grid-cols-[1fr_120px_120px_120px]", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: row.variantId?.name }), _jsx("p", { className: "text-xs text-neutral-500", children: row.variantId?.productId?.name })] }), _jsx(Input, { type: "number", defaultValue: row.availableQty, onBlur: (event) => {
                                apiClient.patch(`/admin/stock/${row.variantId?._id || row.variantId}`, {
                                    availableQty: Number(event.target.value)
                                });
                            } }), _jsx(Input, { type: "number", defaultValue: row.reservedQty, onBlur: (event) => {
                                apiClient.patch(`/admin/stock/${row.variantId?._id || row.variantId}`, {
                                    reservedQty: Number(event.target.value)
                                });
                            } }), _jsx(Button, { variant: row.inStock ? 'secondary' : 'primary', onClick: async () => {
                                await apiClient.patch(`/admin/stock/${row.variantId?._id || row.variantId}`, {
                                    inStock: !row.inStock
                                });
                                load();
                            }, children: row.inStock ? 'Set OOS' : 'Set In Stock' })] }) }, row._id)))] }));
};
