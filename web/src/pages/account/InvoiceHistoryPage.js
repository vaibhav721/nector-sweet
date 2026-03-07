import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { EmptyState } from '../../components/EmptyState';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { apiClient } from '../../lib/api';
export const InvoiceHistoryPage = () => {
    const [invoices, setInvoices] = useState([]);
    const load = async () => {
        const response = await apiClient.get('/invoices');
        setInvoices(response.data.data);
    };
    useEffect(() => {
        load();
    }, []);
    if (!invoices.length) {
        return (_jsx(EmptyState, { title: "No invoices yet", description: "Once you place your first order, invoice history appears here with a reorder action." }));
    }
    return (_jsx("div", { className: "space-y-3", children: invoices.map((invoice) => (_jsx(Card, { children: _jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: invoice.invoiceNumber }), _jsxs("p", { className: "text-sm text-neutral-500", children: ["Order ID: ", invoice.orderId] }), _jsxs("p", { className: "text-sm text-neutral-600", children: ["Total Rs ", invoice.total.toFixed(2)] })] }), _jsx(Button, { onClick: async () => {
                            await apiClient.post(`/orders/${invoice.orderId}/reorder`);
                            window.location.href = '/cart';
                        }, children: "Reorder" })] }) }, invoice._id))) }));
};
