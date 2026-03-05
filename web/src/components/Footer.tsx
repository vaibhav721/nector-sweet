import { brandConfig } from '@nectar-sweet/shared';

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-white/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <h4 className="font-heading text-xl">{brandConfig.brandName}</h4>
          <p className="mt-2 text-sm text-neutral-600">{brandConfig.tagline}</p>
        </div>

        <div>
          <h5 className="font-semibold">Trust Pillars</h5>
          <ul className="mt-2 space-y-1 text-sm text-neutral-600">
            {brandConfig.trustPillars.map((pillar) => (
              <li key={pillar}>{pillar}</li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-semibold">Contact</h5>
          <p className="mt-2 text-sm text-neutral-600">Phone: {brandConfig.contact.phone}</p>
          <p className="text-sm text-neutral-600">Email: {brandConfig.contact.email}</p>
        </div>
      </div>
    </footer>
  );
};
