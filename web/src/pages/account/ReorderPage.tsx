import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { EmptyState } from '../../components/EmptyState';
import { apiClient } from '../../lib/api';

export const ReorderPage = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const response = await apiClient.get('/orders');
      setOrders(response.data.data);
    };

    load();
  }, []);

  if (!orders.length) {
    return <EmptyState title="No past orders" description="Place an order first to use reorder." />;
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <Card key={order._id}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold">{order.orderNumber}</p>
              <p className="text-sm text-neutral-500">{new Date(order.createdAt).toLocaleString()}</p>
              <p className="text-sm text-neutral-600">{order.items?.length || 0} items</p>
            </div>
            <Button
              onClick={async () => {
                await apiClient.post(`/orders/${order._id}/reorder`);
                window.location.href = '/cart';
              }}
            >
              Reorder this
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
