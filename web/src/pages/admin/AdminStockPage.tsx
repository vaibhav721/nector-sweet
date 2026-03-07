import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Toast } from '../../components/Toast';
import { apiClient } from '../../lib/api';

export const AdminStockPage = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const load = async () => {
    try {
      const response = await apiClient.get('/admin/stock');
      setRows(response.data.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Unable to load stock data');
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="font-heading text-3xl">Stock Availability Management</h1>
      {error ? <Toast tone="error" message={error} /> : null}
      {message ? <Toast tone="success" message={message} /> : null}
      {rows.map((row) => (
        <Card key={row._id}>
          <div className="grid items-center gap-3 md:grid-cols-[1fr_120px_120px_120px]">
            <div>
              <p className="font-semibold">{row.variantId?.name}</p>
              <p className="text-xs text-neutral-500">{row.variantId?.productId?.name}</p>
            </div>

            <Input
              type="number"
              defaultValue={row.availableQty}
              onBlur={async (event) => {
                try {
                  await apiClient.patch(`/admin/stock/${row.variantId?._id || row.variantId}`, {
                    availableQty: Number(event.target.value)
                  });
                  setMessage('Stock updated');
                  setError('');
                } catch (err: any) {
                  setError(err.response?.data?.error?.message || 'Unable to update available qty');
                }
              }}
            />
            <Input
              type="number"
              defaultValue={row.reservedQty}
              onBlur={async (event) => {
                try {
                  await apiClient.patch(`/admin/stock/${row.variantId?._id || row.variantId}`, {
                    reservedQty: Number(event.target.value)
                  });
                  setMessage('Reserved quantity updated');
                  setError('');
                } catch (err: any) {
                  setError(err.response?.data?.error?.message || 'Unable to update reserved qty');
                }
              }}
            />
            <Button
              variant={row.inStock ? 'secondary' : 'primary'}
              onClick={async () => {
                try {
                  await apiClient.patch(`/admin/stock/${row.variantId?._id || row.variantId}`, {
                    inStock: !row.inStock
                  });
                  setMessage('Stock status updated');
                  setError('');
                  load();
                } catch (err: any) {
                  setError(err.response?.data?.error?.message || 'Unable to toggle stock status');
                }
              }}
            >
              {row.inStock ? 'Set OOS' : 'Set In Stock'}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
