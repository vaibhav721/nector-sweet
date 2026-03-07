import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { Select } from '../../components/Select';
import { apiClient } from '../../lib/api';
export const AdminWaitlistPage = () => {
    const [rows, setRows] = useState([]);
    const load = async () => {
        const response = await apiClient.get('/admin/waitlist');
        setRows(response.data.data);
    };
    useEffect(() => {
        load();
    }, []);
    return (_jsxs("div", { className: "space-y-3", children: [_jsx("h1", { className: "font-heading text-3xl", children: "Waitlist Leads" }), rows.map((row) => (_jsx(Card, { children: _jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: row.name }), _jsxs("p", { className: "text-sm text-neutral-500", children: [row.city, ", ", row.area, " (", row.pincode, ")"] }), _jsx("p", { className: "text-sm text-neutral-500", children: row.email || row.phone || 'No contact' })] }), _jsxs(Select, { defaultValue: row.status, onChange: (event) => apiClient.patch(`/admin/waitlist/${row._id}`, {
                                status: event.target.value
                            }), children: [_jsx("option", { value: "NEW", children: "NEW" }), _jsx("option", { value: "CONTACTED", children: "CONTACTED" }), _jsx("option", { value: "CLOSED", children: "CLOSED" })] })] }) }, row._id)))] }));
};
