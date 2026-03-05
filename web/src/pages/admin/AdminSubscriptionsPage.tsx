import { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { Select } from '../../components/Select';
import { apiClient } from '../../lib/api';

export const AdminSubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  const load = async () => {
    const response = await apiClient.get('/admin/subscriptions');
    setSubscriptions(response.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="font-heading text-3xl">Subscription Management</h1>
      {subscriptions.map((subscription) => (
        <Card key={subscription._id}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold">Subscription #{subscription._id.slice(-6)}</p>
              <p className="text-sm text-neutral-500">
                Frequency {subscription.frequency} | Quantity {subscription.quantity}
              </p>
            </div>
            <Select
              defaultValue={subscription.status}
              onChange={(event) =>
                apiClient.patch(`/admin/subscriptions/${subscription._id}`, {
                  status: event.target.value
                })
              }
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="PAUSED">PAUSED</option>
              <option value="CANCELLED">CANCELLED</option>
            </Select>
          </div>
        </Card>
      ))}
    </div>
  );
};
