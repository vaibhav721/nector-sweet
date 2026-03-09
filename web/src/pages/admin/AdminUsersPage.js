import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { apiClient } from '../../lib/api';
export const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const load = async () => {
            const response = await apiClient.get('/admin/users/new', {
                params: {
                    days: 30
                }
            });
            setUsers(response.data.data);
        };
        load();
    }, []);
    return (_jsxs("div", { className: "space-y-3", children: [_jsx("h1", { className: "font-heading text-3xl", children: "New Users Listing" }), users.map((user) => (_jsxs(Card, { children: [_jsx("p", { className: "font-semibold", children: user.name }), _jsx("p", { className: "text-sm text-neutral-500", children: user.email || user.phone || 'No contact info' }), _jsxs("p", { className: "text-xs text-neutral-500", children: ["Joined ", new Date(user.createdAt).toLocaleString()] })] }, user._id)))] }));
};
