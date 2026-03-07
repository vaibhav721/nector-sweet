import { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { Toast } from '../../components/Toast';
import { apiClient } from '../../lib/api';

export const AdminDashboardPage = () => {
  const [summary, setSummary] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const response = await apiClient.get('/admin/dashboard');
        setSummary(response.data.data);
        setError('');
      } catch (err: any) {
        setError(err.response?.data?.error?.message || 'Unable to load dashboard data');
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-3xl">Dashboard</h1>
      {error ? <Toast tone="error" message={error} /> : null}

      {summary ? (
        <div className="grid gap-3 md:grid-cols-3">
          <Card>
            <p className="text-sm text-neutral-500">Today's deliveries</p>
            <p className="mt-1 text-3xl font-bold">{summary.todaysDeliveries}</p>
          </Card>
          <Card>
            <p className="text-sm text-neutral-500">Subscription count</p>
            <p className="mt-1 text-3xl font-bold">{summary.activeSubscriptions}</p>
          </Card>
          <Card>
            <p className="text-sm text-neutral-500">New users</p>
            <p className="mt-1 text-3xl font-bold">{summary.newUsers}</p>
          </Card>
        </div>
      ) : null}
    </div>
  );
};
