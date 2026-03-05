import type { PropsWithChildren } from 'react';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { Navbar } from '../components/Navbar';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">{children}</main>
      <Footer />
      <MobileNav />
    </div>
  );
};
