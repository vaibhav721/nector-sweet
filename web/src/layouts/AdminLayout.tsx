import type { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

const adminLinks = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/stock', label: 'Stock' },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/subscriptions', label: 'Subscriptions' },
  { to: '/admin/serviceability', label: 'Serviceability' },
  { to: '/admin/waitlist', label: 'Waitlist' },
  { to: '/admin/expiry', label: 'Expiry' },
  { to: '/admin/users', label: 'New Users' }
];

export const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid min-h-screen md:grid-cols-[250px_1fr]">
      <aside className="border-r border-neutral-200 bg-white p-4">
        <h1 className="font-heading text-2xl">Nectar Admin</h1>
        <nav className="mt-4 flex flex-col gap-1">
          {adminLinks.map((item) => (
            <NavLink
              key={item.to}
              end={item.to === '/admin'}
              to={item.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-semibold ${isActive ? 'bg-[var(--color-primary)] text-white' : 'text-neutral-700 hover:bg-neutral-100'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="bg-[#f7f4ee] p-5">{children}</main>
    </div>
  );
};
