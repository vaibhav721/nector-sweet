import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSearchParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
export const OrderSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('order');
    return (_jsxs(Card, { className: "mx-auto max-w-xl text-center", children: [_jsx("h1", { className: "font-heading text-4xl", children: "Order Confirmed" }), _jsx("p", { className: "mt-3 text-sm text-neutral-600", children: "Your order has been placed with payment status marked as pending/manual settlement." }), orderId ? _jsxs("p", { className: "mt-2 text-xs text-neutral-500", children: ["Order reference: ", orderId] }) : null, _jsx(Button, { className: "mt-4", onClick: () => (window.location.href = '/account/invoices'), children: "View invoice history" })] }));
};
