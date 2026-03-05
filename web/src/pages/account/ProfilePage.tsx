import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../lib/api';

export const ProfilePage = () => {
  const { user, signOutUser } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const response = await apiClient.get('/auth/me');
      setProfile(response.data.data);
    };

    load();
  }, []);

  return (
    <Card className="space-y-3 md:max-w-xl">
      <h2 className="font-heading text-2xl">Basic Account Settings</h2>
      <Input value={profile?.name || ''} readOnly />
      <Input value={profile?.email || user?.email || ''} readOnly />
      <Input value={profile?.phone || user?.phoneNumber || ''} readOnly />
      <p className="text-xs text-neutral-500">One user = one primary address in MVP.</p>
      <Button
        variant="ghost"
        onClick={async () => {
          await signOutUser();
          window.location.href = '/';
        }}
      >
        Logout
      </Button>
    </Card>
  );
};
