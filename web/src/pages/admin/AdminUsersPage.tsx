import { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { Toast } from '../../components/Toast';
import { apiClient } from '../../lib/api';

export const AdminUsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const response = await apiClient.get('/admin/users/new', {
          params: {
            days: 30
          }
        });
        setUsers(response.data.data);
        setError('');
      } catch (err: any) {
        setError(err.response?.data?.error?.message || 'Unable to load users');
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="font-heading text-3xl">New Users Listing</h1>
      {error ? <Toast tone="error" message={error} /> : null}
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
