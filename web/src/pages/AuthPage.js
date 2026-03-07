import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Toast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
export const AuthPage = () => {
    const navigate = useNavigate();
    const { signInEmail, signUpEmail, signInGoogle, sendPhoneOtp, confirmPhoneOtp } = useAuth();
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [verificationId, setVerificationId] = useState('');
    const [message, setMessage] = useState('');
    const submitEmail = async (event) => {
        event.preventDefault();
        if (mode === 'login') {
            await signInEmail(email, password);
            setMessage('Login successful');
        }
        else {
            await signUpEmail(email, password);
            setMessage('Account created');
        }
        navigate('/account');
    };
    return (_jsxs("div", { className: "mx-auto max-w-md space-y-4", children: [_jsx("h1", { className: "font-heading text-4xl", children: "Login / Signup" }), message ? _jsx(Toast, { message: message, tone: "success" }) : null, _jsxs(Card, { className: "space-y-4", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: mode === 'login' ? 'primary' : 'ghost', onClick: () => setMode('login'), children: "Login" }), _jsx(Button, { variant: mode === 'signup' ? 'primary' : 'ghost', onClick: () => setMode('signup'), children: "Signup" })] }), _jsxs("form", { onSubmit: submitEmail, className: "space-y-3", children: [_jsx(Input, { type: "email", value: email, onChange: (event) => setEmail(event.target.value), placeholder: "Email", required: true }), _jsx(Input, { type: "password", value: password, onChange: (event) => setPassword(event.target.value), placeholder: "Password", required: true }), _jsx(Button, { type: "submit", className: "w-full", children: mode === 'login' ? 'Login with Email' : 'Create Account' })] }), _jsx(Button, { className: "w-full", variant: "secondary", onClick: () => signInGoogle().then(() => navigate('/account')), children: "Continue with Google" }), _jsxs("div", { className: "space-y-2 rounded-xl border border-neutral-200 p-3", children: [_jsx("p", { className: "text-sm font-semibold", children: "Phone OTP" }), _jsx("div", { id: "recaptcha-container" }), _jsx(Input, { placeholder: "Phone (+91...)", value: phone, onChange: (event) => setPhone(event.target.value) }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "ghost", onClick: async () => {
                                            const id = await sendPhoneOtp(phone, 'recaptcha-container');
                                            setVerificationId(id);
                                            setMessage('OTP sent');
                                        }, children: "Send OTP" }), _jsx(Input, { placeholder: "OTP", value: otp, onChange: (event) => setOtp(event.target.value) }), _jsx(Button, { onClick: async () => {
                                            if (!verificationId)
                                                return;
                                            await confirmPhoneOtp(verificationId, otp);
                                            navigate('/account');
                                        }, children: "Verify" })] })] })] })] }));
};
