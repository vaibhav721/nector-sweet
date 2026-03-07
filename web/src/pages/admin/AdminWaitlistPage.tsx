import { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { Select } from '../../components/Select';
import { Toast } from '../../components/Toast';
import { apiClient } from '../../lib/api';

export const AdminWaitlistPage = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const load = async () => {
    try {
      const response = await apiClient.get('/admin/waitlist');
      setRows(response.data.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Unable to load waitlist');
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="font-heading text-3xl">Waitlist Leads</h1>
      {error ? <Toast tone="error" message={error} /> : null}
      {message ? <Toast tone="success" message={message} /> : null}
      {rows.map((row) => (
        <Card key={row._id}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold">{row.name}</p>
              <p className="text-sm text-neutral-500">
                {row.city}, {row.area} ({row.pincode})
              </p>
              <p className="text-sm text-neutral-500">{row.email || row.phone || 'No contact'}</p>
            </div>
            <Select
              defaultValue={row.status}
              onChange={async (event) => {
                try {
                  await apiClient.patch(`/admin/waitlist/${row._id}`, {
                    status: event.target.value
                  });
                  setMessage('Waitlist status updated');
                  setError('');
                } catch (err: any) {
                  setError(err.response?.data?.error?.message || 'Unable to update waitlist status');
                }
              }}
            >
              <option value="NEW">NEW</option>
              <option value="CONTACTED">CONTACTED</option>
              <option value="CLOSED">CLOSED</option>
            </Select>
          </div>
        </Card>
      ))}
    </div>
  );
};
