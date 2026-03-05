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

const MainShell = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

const AccountShell = () => (
  <AccountLayout>
    <Outlet />
  </AccountLayout>
);

const RequireCustomerAuth = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

const RequireAdmin = () => {
  const role = localStorage.getItem('nectar_dev_role');

  if (role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'products/:slug', element: <ProductDetailPage /> },
      { path: 'subscription-planner', element: <SubscriptionPlannerPage /> },
      { path: 'serviceability', element: <ServiceabilityPage /> },
      { path: 'waitlist', element: <WaitlistPage /> },
      { path: 'our-story', element: <OurStoryPage /> },
      { path: 'auth', element: <AuthPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'order-success', element: <OrderSuccessPage /> },
      {
        path: 'account',
        element: <RequireCustomerAuth />,
        children: [
          {
            element: <AccountShell />,
            children: [
              { index: true, element: <AccountDashboardPage /> },
              { path: 'invoices', element: <InvoiceHistoryPage /> },
              { path: 'reorder', element: <ReorderPage /> },
              { path: 'subscriptions', element: <ActiveSubscriptionsPage /> },
              { path: 'profile', element: <ProfilePage /> }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />
  },
  {
    path: '/admin',
    element: <RequireAdmin />,
    children: [
      {
        element: <AdminLayout><Outlet /></AdminLayout>,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: 'products', element: <AdminProductsPage /> },
          { path: 'stock', element: <AdminStockPage /> },
          { path: 'orders', element: <AdminOrdersPage /> },
          { path: 'subscriptions', element: <AdminSubscriptionsPage /> },
          { path: 'serviceability', element: <AdminServiceabilityPage /> },
          { path: 'waitlist', element: <AdminWaitlistPage /> },
          { path: 'expiry', element: <AdminExpiryPage /> },
          { path: 'users', element: <AdminUsersPage /> }
        ]
      }
    ]
  },
  {
    path: '*',
    element: (
      <MainLayout>
        <NotFoundPage />
      </MainLayout>
    )
  }
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
