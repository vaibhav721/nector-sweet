import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { apiClient } from '../../lib/api';
export const AdminExpiryPage = () => {
    const [records, setRecords] = useState([]);
    const [stockRows, setStockRows] = useState([]);
    const [variantId, setVariantId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [expiryDate, setExpiryDate] = useState('');
    const load = async () => {
        const [recordsResponse, stockResponse] = await Promise.all([
            apiClient.get('/admin/expiry'),
            apiClient.get('/admin/stock')
        ]);
        setRecords(recordsResponse.data.data);
        setStockRows(stockResponse.data.data);
        if (!variantId && stockResponse.data.data[0]) {
            setVariantId(stockResponse.data.data[0].variantId._id || stockResponse.data.data[0].variantId);
        }
    };
    useEffect(() => {
        load();
    }, []);
    return (_jsxs("div", { className: "space-y-3", children: [_jsx("h1", { className: "font-heading text-3xl", children: "Expiry Management" }), _jsxs(Card, { className: "space-y-2 md:max-w-xl", children: [_jsx(Select, { value: variantId, onChange: (event) => setVariantId(event.target.value), children: stockRows.map((row) => (_jsx("option", { value: row.variantId._id || row.variantId, children: row.variantId?.name || 'Variant' }, row._id))) }), _jsx(Input, { type: "number", value: quantity, onChange: (event) => setQuantity(Number(event.target.value)) }), _jsx(Input, { type: "date", value: expiryDate, onChange: (event) => setExpiryDate(event.target.value) }), _jsx(Button, { onClick: async () => {
                            await apiClient.post('/admin/expiry', { variantId, quantity, expiryDate });
                            setQuantity(1);
                            setExpiryDate('');
                            load();
                        }, children: "Add expiry record" })] }), records.map((record) => (_jsx(Card, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("p", { className: "font-semibold", children: ["Variant ID: ", record.variantId] }), _jsxs("p", { className: "text-sm text-neutral-500", children: ["Expiry: ", record.expiryDate.slice(0, 10)] })] }), _jsxs(Select, { defaultValue: record.status, onChange: (event) => apiClient.patch(`/admin/expiry/${record._id}`, {
                                status: event.target.value
                            }), children: [_jsx("option", { value: "ACTIVE", children: "ACTIVE" }), _jsx("option", { value: "EXPIRED", children: "EXPIRED" }), _jsx("option", { value: "DISCARDED", children: "DISCARDED" })] })] }) }, record._id)))] }));
};
