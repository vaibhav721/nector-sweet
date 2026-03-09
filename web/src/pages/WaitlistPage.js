import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { copyBlocks } from '@nectar-sweet/shared';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Toast } from '../components/Toast';
import { apiClient } from '../lib/api';
export const WaitlistPage = () => {
    const [searchParams] = useSearchParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('Lucknow');
    const [area, setArea] = useState('');
    const [pincode, setPincode] = useState(searchParams.get('pincode') || '');
    const [message, setMessage] = useState('');
    const submit = async (event) => {
        event.preventDefault();
        await apiClient.post('/waitlist', {
            name,
            email: email || undefined,
            phone: phone || undefined,
            city,
            area,
            pincode
        });
        setMessage('Thanks! We have saved your interest and will update you soon.');
    };
    return (_jsxs("div", { className: "space-y-5", children: [_jsx("h1", { className: "font-heading text-4xl", children: "Join Waitlist" }), _jsxs(Card, { className: "space-y-3 md:max-w-2xl", children: [_jsx("p", { className: "text-sm text-neutral-700", children: copyBlocks.unavailableServiceMessage }), _jsxs("form", { onSubmit: submit, className: "space-y-3", children: [_jsx(Input, { placeholder: "Name", value: name, onChange: (event) => setName(event.target.value), required: true }), _jsx(Input, { type: "email", placeholder: "Email (optional)", value: email, onChange: (event) => setEmail(event.target.value) }), _jsx(Input, { placeholder: "Phone (optional)", value: phone, onChange: (event) => setPhone(event.target.value) }), _jsx(Select, { value: city, onChange: (event) => setCity(event.target.value), children: _jsx("option", { value: "Lucknow", children: "Lucknow" }) }), _jsx(Input, { placeholder: "Area", value: area, onChange: (event) => setArea(event.target.value), required: true }), _jsx(Input, { placeholder: "Pincode", value: pincode, onChange: (event) => setPincode(event.target.value), required: true }), _jsx(Button, { type: "submit", children: "Submit interest" })] })] }), message ? _jsx(Toast, { tone: "success", message: message }) : null] }));
};
