import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Select } from '../../components/Select';
import { apiClient } from '../../lib/api';

const statuses = ['PLACED', 'CONFIRMED', 'PACKING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];

export const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);

  const load = async () => {
    const response = await apiClient.get('/admin/orders');
    setOrders(response.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="font-heading text-3xl">Orders Management</h1>
      {orders.map((order) => (
        <Card key={order._id}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold">{order.orderNumber}</p>
              <p className="text-sm text-neutral-500">
                {order.city}, {order.area} ({order.pincode})
              </p>
              <p className="text-sm">Total Rs {order.total.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-2">
              <Select
                defaultValue={order.status}
                onChange={(event) =>
                  apiClient.patch(`/admin/orders/${order._id}`, {
                    status: event.target.value
                  })
                }
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
              <Button
                variant="ghost"
                onClick={async () => {
                  await apiClient.patch(`/admin/orders/${order._id}`, {
                    paymentStatus: 'MANUAL_SETTLEMENT'
                  });
                  load();
                }}
              >
                Mark Manual
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
