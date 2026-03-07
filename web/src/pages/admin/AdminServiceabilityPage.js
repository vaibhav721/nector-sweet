import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { apiClient } from '../../lib/api';
export const AdminServiceabilityPage = () => {
    const [data, setData] = useState({ cities: [], areas: [], pincodes: [] });
    const [cityId, setCityId] = useState('');
    const [areaId, setAreaId] = useState('');
    const [pincode, setPincode] = useState('');
    const load = async () => {
        const response = await apiClient.get('/admin/serviceability');
        setData(response.data.data);
        if (response.data.data.cities[0])
            setCityId(response.data.data.cities[0]._id);
        if (response.data.data.areas[0])
            setAreaId(response.data.data.areas[0]._id);
    };
    useEffect(() => {
        load();
    }, []);
    return (_jsxs("div", { className: "space-y-3", children: [_jsx("h1", { className: "font-heading text-3xl", children: "Serviceable Pin Code Management" }), _jsxs(Card, { className: "space-y-2 md:max-w-xl", children: [_jsx("p", { className: "text-sm text-neutral-600", children: "Add and control active pin codes." }), _jsx(Select, { value: cityId, onChange: (event) => setCityId(event.target.value), children: data.cities.map((city) => (_jsx("option", { value: city._id, children: city.label }, city._id))) }), _jsx(Select, { value: areaId, onChange: (event) => setAreaId(event.target.value), children: data.areas
                            .filter((area) => area.cityId === cityId)
                            .map((area) => (_jsx("option", { value: area._id, children: area.label }, area._id))) }), _jsx(Input, { placeholder: "Pincode", value: pincode, onChange: (event) => setPincode(event.target.value) }), _jsx(Button, { onClick: async () => {
                            await apiClient.post('/admin/serviceability/pincodes', {
                                cityId,
                                areaId,
                                pincode,
                                etaLabel: 'Next day morning',
                                isActive: true
                            });
                            setPincode('');
                            load();
                        }, children: "Add pincode" })] }), data.pincodes.map((row) => (_jsx(Card, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: row.pincode }), _jsx("p", { className: "text-sm text-neutral-500", children: row.isActive ? 'Active' : 'Inactive' })] }), _jsx(Button, { variant: "ghost", onClick: async () => {
                                await apiClient.patch(`/admin/serviceability/pincodes/${row._id}`, {
                                    isActive: !row.isActive
                                });
                                load();
                            }, children: "Toggle" })] }) }, row._id)))] }));
};
