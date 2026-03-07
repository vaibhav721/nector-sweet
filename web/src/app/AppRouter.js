import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AccountLayout } from '../layouts/AccountLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { MainLayout } from '../layouts/MainLayout';
import { AuthPage } from '../pages/AuthPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { OrderSuccessPage } from '../pages/OrderSuccessPage';
import { OurStoryPage } from '../pages/OurStoryPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { ServiceabilityPage } from '../pages/ServiceabilityPage';
import { ShopPage } from '../pages/ShopPage';
import { SubscriptionPlannerPage } from '../pages/SubscriptionPlannerPage';
import { WaitlistPage } from '../pages/WaitlistPage';
import { AccountDashboardPage } from '../pages/account/AccountDashboardPage';
import { ActiveSubscriptionsPage } from '../pages/account/ActiveSubscriptionsPage';
import { InvoiceHistoryPage } from '../pages/account/InvoiceHistoryPage';
import { ProfilePage } from '../pages/account/ProfilePage';
import { ReorderPage } from '../pages/account/ReorderPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminExpiryPage } from '../pages/admin/AdminExpiryPage';
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { AdminOrdersPage } from '../pages/admin/AdminOrdersPage';
import { AdminProductsPage } from '../pages/admin/AdminProductsPage';
import { AdminServiceabilityPage } from '../pages/admin/AdminServiceabilityPage';
import { AdminStockPage } from '../pages/admin/AdminStockPage';
import { AdminSubscriptionsPage } from '../pages/admin/AdminSubscriptionsPage';
import { AdminUsersPage } from '../pages/admin/AdminUsersPage';
import { AdminWaitlistPage } from '../pages/admin/AdminWaitlistPage';
const MainShell = () => (_jsx(MainLayout, { children: _jsx(Outlet, {}) }));
const AccountShell = () => (_jsx(AccountLayout, { children: _jsx(Outlet, {}) }));
const RequireCustomerAuth = () => {
    const { user, loading } = useAuth();
    if (loading) {
        return null;
    }
    if (!user) {
        return _jsx(Navigate, { to: "/auth", replace: true });
    }
    return _jsx(Outlet, {});
};
const RequireAdmin = () => {
    const role = localStorage.getItem('nectar_dev_role');
    if (role !== 'admin') {
        return _jsx(Navigate, { to: "/admin/login", replace: true });
    }
    return _jsx(Outlet, {});
};
const router = createBrowserRouter([
    {
        path: '/',
        element: _jsx(MainShell, {}),
        children: [
            { index: true, element: _jsx(HomePage, {}) },
            { path: 'shop', element: _jsx(ShopPage, {}) },
            { path: 'products/:slug', element: _jsx(ProductDetailPage, {}) },
            { path: 'subscription-planner', element: _jsx(SubscriptionPlannerPage, {}) },
            { path: 'serviceability', element: _jsx(ServiceabilityPage, {}) },
            { path: 'waitlist', element: _jsx(WaitlistPage, {}) },
            { path: 'our-story', element: _jsx(OurStoryPage, {}) },
            { path: 'auth', element: _jsx(AuthPage, {}) },
            { path: 'cart', element: _jsx(CartPage, {}) },
            { path: 'checkout', element: _jsx(CheckoutPage, {}) },
            { path: 'order-success', element: _jsx(OrderSuccessPage, {}) },
            {
                path: 'account',
                element: _jsx(RequireCustomerAuth, {}),
                children: [
                    {
                        element: _jsx(AccountShell, {}),
                        children: [
                            { index: true, element: _jsx(AccountDashboardPage, {}) },
                            { path: 'invoices', element: _jsx(InvoiceHistoryPage, {}) },
                            { path: 'reorder', element: _jsx(ReorderPage, {}) },
                            { path: 'subscriptions', element: _jsx(ActiveSubscriptionsPage, {}) },
                            { path: 'profile', element: _jsx(ProfilePage, {}) }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: '/admin/login',
        element: _jsx(AdminLoginPage, {})
    },
    {
        path: '/admin',
        element: _jsx(RequireAdmin, {}),
        children: [
            {
                element: _jsx(AdminLayout, { children: _jsx(Outlet, {}) }),
                children: [
                    { index: true, element: _jsx(AdminDashboardPage, {}) },
                    { path: 'products', element: _jsx(AdminProductsPage, {}) },
                    { path: 'stock', element: _jsx(AdminStockPage, {}) },
                    { path: 'orders', element: _jsx(AdminOrdersPage, {}) },
                    { path: 'subscriptions', element: _jsx(AdminSubscriptionsPage, {}) },
                    { path: 'serviceability', element: _jsx(AdminServiceabilityPage, {}) },
                    { path: 'waitlist', element: _jsx(AdminWaitlistPage, {}) },
                    { path: 'expiry', element: _jsx(AdminExpiryPage, {}) },
                    { path: 'users', element: _jsx(AdminUsersPage, {}) }
                ]
            }
        ]
    },
    {
        path: '*',
        element: (_jsx(MainLayout, { children: _jsx(NotFoundPage, {}) }))
    }
]);
export const AppRouter = () => {
    return _jsx(RouterProvider, { router: router });
};
