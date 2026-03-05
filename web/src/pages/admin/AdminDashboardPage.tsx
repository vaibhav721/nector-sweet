import { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { apiClient } from '../../lib/api';

export const AdminDashboardPage = () => {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const response = await apiClient.get('/admin/dashboard');
      setSummary(response.data.data);
    };
    load();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-3xl">Dashboard</h1>

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
