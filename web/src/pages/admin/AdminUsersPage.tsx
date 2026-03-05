import { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { apiClient } from '../../lib/api';

export const AdminUsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const response = await apiClient.get('/admin/users/new', {
        params: {
          days: 30
        }
      });
      setUsers(response.data.data);
    };

    load();
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="font-heading text-3xl">New Users Listing</h1>
      {users.map((user) => (
        <Card key={user._id}>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-neutral-500">{user.email || user.phone || 'No contact info'}</p>
          <p className="text-xs text-neutral-500">Joined {new Date(user.createdAt).toLocaleString()}</p>
        </Card>
      ))}
    </div>
  );
};
