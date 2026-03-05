import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { apiClient } from '../../lib/api';

export const AdminExpiryPage = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [stockRows, setStockRows] = useState<any[]>([]);
  const [variantId, setVariantId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [expiryDate, setExpiryDate] = useState('');

  const load = async () => {
    const [recordsResponse, stockResponse] = await Promise.all([
      apiClient.get('/admin/expiry'),
      apiClient.get('/admin/stock')
    ]);

    setRecords(recordsResponse.data.data);
    setStockRows(stockResponse.data.data);
    if (!variantId && stockResponse.data.data[0]) {
      setVariantId(stockResponse.data.data[0].variantId._id || stockResponse.data.data[0].variantId);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="font-heading text-3xl">Expiry Management</h1>
      <Card className="space-y-2 md:max-w-xl">
        <Select value={variantId} onChange={(event) => setVariantId(event.target.value)}>
          {stockRows.map((row) => (
            <option key={row._id} value={row.variantId._id || row.variantId}>
              {row.variantId?.name || 'Variant'}
            </option>
          ))}
        </Select>
        <Input type="number" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} />
        <Input type="date" value={expiryDate} onChange={(event) => setExpiryDate(event.target.value)} />
        <Button
          onClick={async () => {
            await apiClient.post('/admin/expiry', { variantId, quantity, expiryDate });
            setQuantity(1);
            setExpiryDate('');
            load();
          }}
        >
          Add expiry record
        </Button>
      </Card>

      {records.map((record) => (
        <Card key={record._id}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Variant ID: {record.variantId}</p>
              <p className="text-sm text-neutral-500">Expiry: {record.expiryDate.slice(0, 10)}</p>
            </div>
            <Select
              defaultValue={record.status}
              onChange={(event) =>
                apiClient.patch(`/admin/expiry/${record._id}`, {
                  status: event.target.value
                })
              }
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="EXPIRED">EXPIRED</option>
              <option value="DISCARDED">DISCARDED</option>
            </Select>
          </div>
        </Card>
      ))}
    </div>
  );
};
