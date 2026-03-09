import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Toast } from '../../components/Toast';
import { apiClient } from '../../lib/api';

export const AdminServiceabilityPage = () => {
  const [data, setData] = useState<any>({ cities: [], areas: [], pincodes: [] });
  const [cityId, setCityId] = useState('');
  const [areaId, setAreaId] = useState('');
  const [pincode, setPincode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const response = await apiClient.get('/admin/serviceability');
      const payload = response.data.data;
      setData(payload);

      if (payload.cities[0]) {
        const nextCityId = String(payload.cities[0]._id);
        setCityId(nextCityId);

        const firstAreaForCity = payload.areas.find(
          (area: any) => String(area.cityId) === String(nextCityId)
        );
        if (firstAreaForCity) {
          setAreaId(String(firstAreaForCity._id));
        }
      }
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Unable to load serviceability records');
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const firstAreaForCity = data.areas.find((area: any) => String(area.cityId) === String(cityId));
    if (firstAreaForCity) {
      setAreaId(String(firstAreaForCity._id));
    }
  }, [cityId, data.areas]);

  return (
    <div className="space-y-3">
      <h1 className="font-heading text-3xl">Serviceable Pin Code Management</h1>
      {error ? <Toast tone="error" message={error} /> : null}
      {message ? <Toast tone="success" message={message} /> : null}
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
            .filter((area: any) => String(area.cityId) === String(cityId))
            .map((area: any) => (
              <option key={area._id} value={area._id}>
                {area.label}
              </option>
            ))}
        </Select>
        <Input placeholder="Pincode" value={pincode} onChange={(event) => setPincode(event.target.value)} />
        <Button
          onClick={async () => {
            try {
              await apiClient.post('/admin/serviceability/pincodes', {
                cityId,
                areaId,
                pincode,
                etaLabel: 'Next day morning',
                isActive: true
              });
              setPincode('');
              setMessage('Pincode added successfully');
              setError('');
              load();
            } catch (err: any) {
              setError(err.response?.data?.error?.message || 'Unable to add pincode');
            }
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
                try {
                  await apiClient.patch(`/admin/serviceability/pincodes/${row._id}`, {
                    isActive: !row.isActive
                  });
                  setMessage('Pincode status updated');
                  setError('');
                  load();
                } catch (err: any) {
                  setError(err.response?.data?.error?.message || 'Unable to update pincode');
                }
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
