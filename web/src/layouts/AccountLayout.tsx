import type { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import { MainLayout } from './MainLayout';

const tabs = [
  { to: '/account', label: 'Dashboard' },
  { to: '/account/invoices', label: 'Invoice History' },
  { to: '/account/subscriptions', label: 'Subscriptions' },
  { to: '/account/profile', label: 'Profile' }
];

export const AccountLayout = ({ children }: PropsWithChildren) => {
  return (
    <MainLayout>
      <div className="space-y-5">
        <h1 className="font-heading text-3xl">Your Account</h1>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.to === '/account'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold ${isActive ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-neutral-600'}`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
        {children}
      </div>
    </MainLayout>
  );
};
