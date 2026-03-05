import { Link, NavLink } from 'react-router-dom';
import { brandConfig } from '@nectar-sweet/shared';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-[rgba(252,250,247,0.95)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="font-heading text-xl font-semibold">
          {brandConfig.brandName}
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          <NavLink to="/shop" className="hover:text-[var(--color-primary)]">
            Shop
          </NavLink>
          <NavLink to="/subscription-planner" className="hover:text-[var(--color-primary)]">
            Subscription
          </NavLink>
          <NavLink to="/serviceability" className="hover:text-[var(--color-primary)]">
            Serviceability
          </NavLink>
          <NavLink to="/our-story" className="hover:text-[var(--color-primary)]">
            Our Story
          </NavLink>
          <NavLink to="/cart" className="hover:text-[var(--color-primary)]">
            Cart
          </NavLink>
          {user ? (
            <NavLink to="/account" className="hover:text-[var(--color-primary)]">
              Account
            </NavLink>
          ) : (
            <NavLink to="/auth" className="hover:text-[var(--color-primary)]">
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};
