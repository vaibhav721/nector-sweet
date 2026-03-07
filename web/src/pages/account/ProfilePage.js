import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../lib/api';
export const ProfilePage = () => {
    const { user, signOutUser } = useAuth();
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        const load = async () => {
            const response = await apiClient.get('/auth/me');
            setProfile(response.data.data);
        };
        load();
    }, []);
    return (_jsxs(Card, { className: "space-y-3 md:max-w-xl", children: [_jsx("h2", { className: "font-heading text-2xl", children: "Basic Account Settings" }), _jsx(Input, { value: profile?.name || '', readOnly: true }), _jsx(Input, { value: profile?.email || user?.email || '', readOnly: true }), _jsx(Input, { value: profile?.phone || user?.phoneNumber || '', readOnly: true }), _jsx("p", { className: "text-xs text-neutral-500", children: "One user = one primary address in MVP." }), _jsx(Button, { variant: "ghost", onClick: async () => {
                    await signOutUser();
                    window.location.href = '/';
                }, children: "Logout" })] }));
};
