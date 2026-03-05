import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { apiClient } from '../../lib/api';

export const AdminStockPage = () => {
  const [rows, setRows] = useState<any[]>([]);

  const load = async () => {
    const response = await apiClient.get('/admin/stock');
    setRows(response.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="font-heading text-3xl">Stock Availability Management</h1>
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
              onBlur={(event) => {
                apiClient.patch(`/admin/stock/${row.variantId?._id || row.variantId}`, {
                  availableQty: Number(event.target.value)
                });
              }}
            />
            <Input
              type="number"
              defaultValue={row.reservedQty}
              onBlur={(event) => {
                apiClient.patch(`/admin/stock/${row.variantId?._id || row.variantId}`, {
                  reservedQty: Number(event.target.value)
                });
              }}
            />
            <Button
              variant={row.inStock ? 'secondary' : 'primary'}
              onClick={async () => {
                await apiClient.patch(`/admin/stock/${row.variantId?._id || row.variantId}`, {
                  inStock: !row.inStock
                });
                load();
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
