import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { EmptyState } from '../../components/EmptyState';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { Select } from '../../components/Select';
import { apiClient } from '../../lib/api';

export const ActiveSubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [frequency, setFrequency] = useState<'DAILY' | 'ALTERNATE_DAY' | 'CUSTOM'>('DAILY');

  const load = async () => {
    const response = await apiClient.get('/subscriptions');
    setSubscriptions(response.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  if (!subscriptions.length) {
    return (
      <EmptyState
        title="No active subscriptions"
        description="Add subscription products from the shop to manage them here."
      />
    );
  }

  return (
    <div className="space-y-3">
      {subscriptions.map((subscription) => (
        <Card key={subscription._id}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold">Subscription #{subscription._id.slice(-6)}</p>
              <p className="text-sm text-neutral-500">
                Frequency: {subscription.frequency} | Quantity: {subscription.quantity}
              </p>
              <p className="text-sm text-neutral-600">Status: {subscription.status}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="ghost" onClick={() => setSelected(subscription)}>
                Edit
              </Button>
              <Button
                variant="secondary"
                onClick={async () => {
                  await apiClient.post(`/subscriptions/${subscription._id}/skip`, {
                    date: new Date().toISOString().slice(0, 10)
                  });
                }}
              >
                Skip day
              </Button>
              <Button
                onClick={async () => {
                  await apiClient.post(`/subscriptions/${subscription._id}/extra`, {
                    date: new Date().toISOString().slice(0, 10),
                    extraQuantity: 1
                  });
                }}
              >
                +1 for a day
              </Button>
              <Button
                variant="secondary"
                onClick={async () => {
                  const from = new Date().toISOString().slice(0, 10);
                  const until = new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10);
                  await apiClient.post(`/subscriptions/${subscription._id}/pause`, { from, until });
                  load();
                }}
              >
                Pause
              </Button>
            </div>
          </div>
        </Card>
      ))}

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title="Edit subscription controls"
      >
        <div className="space-y-3">
          <Input
            type="number"
            min={1}
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
          />
          <Select value={frequency} onChange={(event) => setFrequency(event.target.value as any)}>
            <option value="DAILY">Daily</option>
            <option value="ALTERNATE_DAY">Alternate day</option>
            <option value="CUSTOM">Custom</option>
          </Select>
          <Button
            onClick={async () => {
              await apiClient.patch(`/subscriptions/${selected._id}`, {
                quantity,
                frequency
              });
              setSelected(null);
              load();
            }}
          >
            Save changes
          </Button>
        </div>
      </Modal>
    </div>
  );
};
