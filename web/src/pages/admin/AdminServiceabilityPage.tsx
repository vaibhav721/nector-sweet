import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { apiClient } from '../../lib/api';

export const AdminServiceabilityPage = () => {
  const [data, setData] = useState<any>({ cities: [], areas: [], pincodes: [] });
  const [cityId, setCityId] = useState('');
  const [areaId, setAreaId] = useState('');
  const [pincode, setPincode] = useState('');

  const load = async () => {
    const response = await apiClient.get('/admin/serviceability');
    setData(response.data.data);
    if (response.data.data.cities[0]) setCityId(response.data.data.cities[0]._id);
    if (response.data.data.areas[0]) setAreaId(response.data.data.areas[0]._id);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="font-heading text-3xl">Serviceable Pin Code Management</h1>
      <Card className="space-y-2 md:max-w-xl">
        <p className="text-sm text-neutral-600">Add and control active pin codes.</p>
        <Select value={cityId} onChange={(event) => setCityId(event.target.value)}>
          {data.cities.map((city: any) => (
            <option key={city._id} value={city._id}>
              {city.label}
            </option>
          ))}
        </Select>
        <Select value={areaId} onChange={(event) => setAreaId(event.target.value)}>
          {data.areas
            .filter((area: any) => area.cityId === cityId)
            .map((area: any) => (
              <option key={area._id} value={area._id}>
                {area.label}
              </option>
            ))}
        </Select>
        <Input placeholder="Pincode" value={pincode} onChange={(event) => setPincode(event.target.value)} />
        <Button
          onClick={async () => {
            await apiClient.post('/admin/serviceability/pincodes', {
              cityId,
              areaId,
              pincode,
              etaLabel: 'Next day morning',
              isActive: true
            });
            setPincode('');
            load();
          }}
        >
          Add pincode
        </Button>
      </Card>

      {data.pincodes.map((row: any) => (
        <Card key={row._id}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{row.pincode}</p>
              <p className="text-sm text-neutral-500">{row.isActive ? 'Active' : 'Inactive'}</p>
            </div>
            <Button
              variant="ghost"
              onClick={async () => {
                await apiClient.patch(`/admin/serviceability/pincodes/${row._id}`, {
                  isActive: !row.isActive
                });
                load();
              }}
            >
              Toggle
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
