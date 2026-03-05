import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { businessConfig } from '@nectar-sweet/shared';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Select } from '../components/Select';
import { Toast } from '../components/Toast';
import { apiClient } from '../lib/api';

export const ServiceabilityPage = () => {
  const [options, setOptions] = useState<any[]>([]);
  const [cityId, setCityId] = useState('');
  const [areaId, setAreaId] = useState('');
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const response = await apiClient.get('/serviceability/options');
      setOptions(response.data.data);
      if (response.data.data[0]) {
        setCityId(response.data.data[0].id);
      }
    };

    load();
  }, []);

  const city = useMemo(() => options.find((item) => item.id === cityId), [cityId, options]);
  const areas = city?.areas || [];
  const area = areas.find((item: any) => item.id === areaId);

  useEffect(() => {
    if (areas[0]) {
      setAreaId(areas[0].id);
    }
  }, [cityId, areas]);

  useEffect(() => {
    if (area?.pincodes[0]) {
      setPincode(area.pincodes[0]);
    }
  }, [areaId, area]);

  const check = async () => {
    const response = await apiClient.get('/serviceability/check', {
      params: {
        city: city?.name,
        area: area?.name,
        pincode
      }
    });

    setResult(response.data.data);
  };

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-4xl">Serviceability Checker</h1>
      <Card className="space-y-4 md:max-w-2xl">
        <p className="text-sm text-neutral-600">
          Select city, area, and pincode. Final serviceability is decided by pincode.
        </p>

        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase">City</label>
            <Select value={cityId} onChange={(event) => setCityId(event.target.value)}>
              {options.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase">Area</label>
            <Select value={areaId} onChange={(event) => setAreaId(event.target.value)}>
              {areas.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase">Pincode</label>
            <Select value={pincode} onChange={(event) => setPincode(event.target.value)}>
              {(area?.pincodes || []).map((pin: string) => (
                <option key={pin} value={pin}>
                  {pin}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <Button onClick={check}>Check serviceability</Button>
      </Card>

      {result ? (
        result.serviceable ? (
          <Toast tone="success" message={result.message} />
        ) : (
          <div className="space-y-2">
            <Toast tone="info" message={result.message} />
            <Link className="text-sm font-semibold text-[var(--color-primary)]" to={`/waitlist?pincode=${pincode}`}>
              Join waitlist
            </Link>
          </div>
        )
      ) : null}

      <p className="text-xs text-neutral-500">
        Current placeholder launch city: {businessConfig.launchCity}. Delivery slots are configurable from admin
        settings.
      </p>
    </div>
  );
};
