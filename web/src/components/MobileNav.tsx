import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/subscription-planner', label: 'Subs' },
  { to: '/cart', label: 'Cart' },
  { to: '/account', label: 'Account' }
];

export const MobileNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-neutral-200 bg-white md:hidden">
      <div className="grid grid-cols-5">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `py-3 text-center text-xs font-semibold ${isActive ? 'text-[var(--color-primary)]' : 'text-neutral-500'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
