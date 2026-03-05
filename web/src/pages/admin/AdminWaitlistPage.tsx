import { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { Select } from '../../components/Select';
import { apiClient } from '../../lib/api';

export const AdminWaitlistPage = () => {
  const [rows, setRows] = useState<any[]>([]);

  const load = async () => {
    const response = await apiClient.get('/admin/waitlist');
    setRows(response.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="font-heading text-3xl">Waitlist Leads</h1>
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
              onChange={(event) =>
                apiClient.patch(`/admin/waitlist/${row._id}`, {
                  status: event.target.value
                })
              }
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
