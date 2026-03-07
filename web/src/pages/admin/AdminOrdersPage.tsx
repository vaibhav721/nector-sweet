import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Select } from '../../components/Select';
import { Toast } from '../../components/Toast';
import { apiClient } from '../../lib/api';

const statuses = ['PLACED', 'CONFIRMED', 'PACKING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];

export const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const load = async () => {
    try {
      const response = await apiClient.get('/admin/orders');
      setOrders(response.data.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Unable to load orders');
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="font-heading text-3xl">Orders Management</h1>
      {error ? <Toast tone="error" message={error} /> : null}
      {message ? <Toast tone="success" message={message} /> : null}
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
                onChange={async (event) => {
                  try {
                    await apiClient.patch(`/admin/orders/${order._id}`, {
                      status: event.target.value
                    });
                    setMessage('Order status updated');
                    setError('');
                  } catch (err: any) {
                    setError(err.response?.data?.error?.message || 'Unable to update order status');
                  }
                }}
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
                  try {
                    await apiClient.patch(`/admin/orders/${order._id}`, {
                      paymentStatus: 'MANUAL_SETTLEMENT'
                    });
                    setMessage('Payment status updated');
                    setError('');
                    load();
                  } catch (err: any) {
                    setError(err.response?.data?.error?.message || 'Unable to update payment status');
                  }
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
