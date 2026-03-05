import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { copyBlocks } from '@nectar-sweet/shared';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Toast } from '../components/Toast';
import { apiClient } from '../lib/api';

export const WaitlistPage = () => {
  const [searchParams] = useSearchParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lucknow');
  const [area, setArea] = useState('');
  const [pincode, setPincode] = useState(searchParams.get('pincode') || '');
  const [message, setMessage] = useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    await apiClient.post('/waitlist', {
      name,
      email: email || undefined,
      phone: phone || undefined,
      city,
      area,
      pincode
    });

    setMessage('Thanks! We have saved your interest and will update you soon.');
  };

  return (
    <div className="space-y-5">
      <h1 className="font-heading text-4xl">Join Waitlist</h1>
      <Card className="space-y-3 md:max-w-2xl">
        <p className="text-sm text-neutral-700">{copyBlocks.unavailableServiceMessage}</p>

        <form onSubmit={submit} className="space-y-3">
          <Input placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} required />
          <Input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            placeholder="Phone (optional)"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          <Select value={city} onChange={(event) => setCity(event.target.value)}>
            <option value="Lucknow">Lucknow</option>
          </Select>
          <Input placeholder="Area" value={area} onChange={(event) => setArea(event.target.value)} required />
          <Input
            placeholder="Pincode"
            value={pincode}
            onChange={(event) => setPincode(event.target.value)}
            required
          />
          <Button type="submit">Submit interest</Button>
        </form>
      </Card>

      {message ? <Toast tone="success" message={message} /> : null}
    </div>
  );
};
