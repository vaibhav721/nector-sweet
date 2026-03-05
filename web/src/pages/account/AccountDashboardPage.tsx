import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/Card';
import { EmptyState } from '../../components/EmptyState';
import { apiClient } from '../../lib/api';

export const AccountDashboardPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const [ordersResponse, subscriptionsResponse] = await Promise.all([
        apiClient.get('/orders'),
        apiClient.get('/subscriptions')
      ]);

      setOrders(ordersResponse.data.data);
      setSubscriptions(subscriptionsResponse.data.data);
    };

    load();
  }, []);

  if (!orders.length && !subscriptions.length) {
    return (
      <EmptyState
        title="Welcome to your account"
        description="Your orders and subscriptions will appear here once you place your first order."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <h3 className="font-heading text-2xl">Recent Orders</h3>
        <p className="mt-2 text-3xl font-bold">{orders.length}</p>
        <p className="text-sm text-neutral-600">Total orders placed</p>
        <Link className="mt-4 inline-block text-sm font-semibold text-[var(--color-primary)]" to="/account/invoices">
          View invoice history
        </Link>
      </Card>

      <Card>
        <h3 className="font-heading text-2xl">Active Subscriptions</h3>
        <p className="mt-2 text-3xl font-bold">{subscriptions.filter((item) => item.status === 'ACTIVE').length}</p>
        <p className="text-sm text-neutral-600">Running subscription lines</p>
        <Link className="mt-4 inline-block text-sm font-semibold text-[var(--color-primary)]" to="/account/subscriptions">
          Manage subscriptions
        </Link>
      </Card>

      <Card className="md:col-span-2">
        <h3 className="font-heading text-2xl">Quick Reorder</h3>
        <p className="mt-2 text-sm text-neutral-600">
          Reorder from your invoice history in one click.
        </p>
        <Link className="mt-3 inline-block text-sm font-semibold text-[var(--color-primary)]" to="/account/reorder">
          Open reorder flow
        </Link>
      </Card>
    </div>
  );
};
