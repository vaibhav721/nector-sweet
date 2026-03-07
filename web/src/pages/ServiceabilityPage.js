import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { businessConfig } from '@nectar-sweet/shared';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Select } from '../components/Select';
import { Toast } from '../components/Toast';
import { apiClient } from '../lib/api';
export const ServiceabilityPage = () => {
    const [options, setOptions] = useState([]);
    const [cityId, setCityId] = useState('');
    const [areaId, setAreaId] = useState('');
    const [pincode, setPincode] = useState('');
    const [result, setResult] = useState(null);
    useEffect(() => {
        const load = async () => {
            const response = await apiClient.get('/serviceability/options');
            setOptions(response.data.data);
            if (response.data.data[0]) {
                setCityId(response.data.data[0].id);
            }
        };
        load();
    }, []);
    const city = useMemo(() => options.find((item) => item.id === cityId), [cityId, options]);
    const areas = city?.areas || [];
    const area = areas.find((item) => item.id === areaId);
    useEffect(() => {
        if (areas[0]) {
            setAreaId(areas[0].id);
        }
    }, [cityId, areas]);
    useEffect(() => {
        if (area?.pincodes[0]) {
            setPincode(area.pincodes[0]);
        }
    }, [areaId, area]);
    const check = async () => {
        const response = await apiClient.get('/serviceability/check', {
            params: {
                city: city?.name,
                area: area?.name,
                pincode
            }
        });
        setResult(response.data.data);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "font-heading text-4xl", children: "Serviceability Checker" }), _jsxs(Card, { className: "space-y-4 md:max-w-2xl", children: [_jsx("p", { className: "text-sm text-neutral-600", children: "Select city, area, and pincode. Final serviceability is decided by pincode." }), _jsxs("div", { className: "grid gap-3 md:grid-cols-3", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-xs font-semibold uppercase", children: "City" }), _jsx(Select, { value: cityId, onChange: (event) => setCityId(event.target.value), children: options.map((item) => (_jsx("option", { value: item.id, children: item.label }, item.id))) })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-xs font-semibold uppercase", children: "Area" }), _jsx(Select, { value: areaId, onChange: (event) => setAreaId(event.target.value), children: areas.map((item) => (_jsx("option", { value: item.id, children: item.label }, item.id))) })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-xs font-semibold uppercase", children: "Pincode" }), _jsx(Select, { value: pincode, onChange: (event) => setPincode(event.target.value), children: (area?.pincodes || []).map((pin) => (_jsx("option", { value: pin, children: pin }, pin))) })] })] }), _jsx(Button, { onClick: check, children: "Check serviceability" })] }), result ? (result.serviceable ? (_jsx(Toast, { tone: "success", message: result.message })) : (_jsxs("div", { className: "space-y-2", children: [_jsx(Toast, { tone: "info", message: result.message }), _jsx(Link, { className: "text-sm font-semibold text-[var(--color-primary)]", to: `/waitlist?pincode=${pincode}`, children: "Join waitlist" })] }))) : null, _jsxs("p", { className: "text-xs text-neutral-500", children: ["Current placeholder launch city: ", businessConfig.launchCity, ". Delivery slots are configurable from admin settings."] })] }));
};
