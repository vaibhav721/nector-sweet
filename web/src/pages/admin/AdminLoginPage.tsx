import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { tokenStore } from '../../lib/tokenStore';

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@nectarsweet.com');

  return (
    <div className="mx-auto max-w-md">
      <Card className="space-y-4">
        <h1 className="font-heading text-3xl">Admin Login</h1>
        <p className="text-sm text-neutral-600">
          MVP admin access. In production, this should use Firebase admin auth and RBAC.
        </p>
        <Input value={email} onChange={(event) => setEmail(event.target.value)} />
        <Button
          className="w-full"
          onClick={() => {
            tokenStore.clear();
            localStorage.setItem('nectar_dev_role', 'admin');
            localStorage.setItem('nectar_dev_uid', 'admin-dev');
            localStorage.setItem('nectar_dev_email', email);
            localStorage.removeItem('nectar_dev_phone');
            localStorage.removeItem('nectar_pending_phone');
            navigate('/admin');
          }}
        >
          Continue as admin
        </Button>
      </Card>
    </div>
  );
};
