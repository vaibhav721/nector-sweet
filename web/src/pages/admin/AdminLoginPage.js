import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
export const AdminLoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('admin@nectarsweet.com');
    return (_jsx("div", { className: "mx-auto max-w-md", children: _jsxs(Card, { className: "space-y-4", children: [_jsx("h1", { className: "font-heading text-3xl", children: "Admin Login" }), _jsx("p", { className: "text-sm text-neutral-600", children: "MVP admin access. In production, this should use Firebase admin auth and RBAC." }), _jsx(Input, { value: email, onChange: (event) => setEmail(event.target.value) }), _jsx(Button, { className: "w-full", onClick: () => {
                        localStorage.setItem('nectar_dev_role', 'admin');
                        localStorage.setItem('nectar_dev_uid', 'admin-dev');
                        localStorage.setItem('nectar_dev_email', email);
                        navigate('/admin');
                    }, children: "Continue as admin" })] }) }));
};
