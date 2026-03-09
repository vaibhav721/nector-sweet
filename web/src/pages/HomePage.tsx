import { brandConfig, businessConfig, copyBlocks } from '@nectar-sweet/shared';
import { Link } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

const howItWorks = [
  {
    title: 'Choose your dairy',
    description: 'Pick milk, curd, paneer, and ghee based on your routine.'
  },
  {
    title: 'Select one-time or subscription',
    description: 'Keep it flexible with daily, alternate-day, or custom schedules.'
  },
  {
    title: 'Get carefully delivered',
    description: 'Fresh local dairy at your doorstep in your selected service area.'
  }
];

export const HomePage = () => {
  return (
    <div className="space-y-16 py-8">
      <section className="grid gap-12 rounded-3xl bg-neutral-50 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-14">
        <div className="flex flex-col justify-center space-y-6 animate-fade-slide-up">
          <div>
            <Badge>Fresh Local Dairy</Badge>
          </div>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-6xl md:leading-[1.1]">{copyBlocks.heroTitle}</h1>
          <p className="max-w-xl text-lg tracking-tight text-neutral-600 md:text-xl">{copyBlocks.heroSubtitle}</p>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link to="/shop">
              <Button className="px-6 py-3 text-base">Start Shopping</Button>
            </Link>
            <Link to="/subscription-planner">
              <Button variant="secondary" className="px-6 py-3 text-base bg-white shadow-sm hover:bg-neutral-50">Plan Subscription</Button>
            </Link>
          </div>
        </div>

        <Card className="flex flex-col justify-center space-y-5 border-none shadow-none bg-white/50 backdrop-blur-sm p-8">
          <div>
            <h3 className="font-heading text-2xl font-bold text-neutral-900">Delivery Area</h3>
            <p className="mt-1 text-neutral-500">Currently serving: {businessConfig.launchCity}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm font-medium text-neutral-700">
            {businessConfig.serviceCities[0].areas.slice(0, 6).map((area) => (
              <div key={area.name} className="rounded-xl border border-neutral-100 bg-white p-3 text-center shadow-sm transition-colors hover:border-primary">
                {area.label}
              </div>
            ))}
          </div>
          <Link className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary-hover" to="/serviceability">
            Check availability by pincode &rarr;
          </Link>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-neutral-900">{copyBlocks.trustSectionTitle}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {brandConfig.trustPillars.map((pillar) => (
            <div key={pillar} className="group rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <p className="font-semibold text-neutral-900">{pillar}</p>
              <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                A warm, local approach focused on daily consistency and value.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {howItWorks.map((step, index) => (
          <div key={step.title} className="relative overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50 p-6">
            <span className="absolute -right-2 -top-4 text-7xl font-bold text-white/50">{index + 1}</span>
            <div className="relative z-10">
              <h3 className="font-heading text-xl font-bold text-neutral-900">{step.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-3xl bg-neutral-900 px-8 py-12 text-center text-white shadow-lg sm:px-12 sm:py-16">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-white">Subscription that adapts to your week</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-300">{copyBlocks.subscriptionNote}</p>
        <Link to="/subscription-planner" className="mt-8 inline-block select-none rounded-xl bg-white px-6 py-3 font-semibold text-neutral-900 transition hover:bg-neutral-100 active:scale-95">
          Explore subscription planner
        </Link>
      </section>
    </div>
  );
};
