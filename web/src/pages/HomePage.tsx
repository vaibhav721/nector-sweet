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
    <div className="space-y-14">
      <section className="grid gap-8 rounded-3xl bg-gradient-to-r from-white to-[#f4ecdf] p-8 shadow-soft md:grid-cols-[1.15fr_0.85fr] md:p-12">
        <div className="space-y-4 animate-fade-slide-up">
          <Badge>Fresh Local Dairy</Badge>
          <h1 className="font-heading text-4xl leading-tight md:text-5xl">{copyBlocks.heroTitle}</h1>
          <p className="max-w-xl text-neutral-700">{copyBlocks.heroSubtitle}</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/shop">
              <Button>Start Shopping</Button>
            </Link>
            <Link to="/subscription-planner">
              <Button variant="secondary">Plan Subscription</Button>
            </Link>
          </div>
        </div>

        <Card className="space-y-4 border border-[#efe3d2]">
          <h3 className="font-heading text-2xl">Service City</h3>
          <p className="text-neutral-600">Current launch city: {businessConfig.launchCity}</p>
          <div className="grid grid-cols-2 gap-2 text-sm text-neutral-700">
            {businessConfig.serviceCities[0].areas.slice(0, 6).map((area) => (
              <div key={area.name} className="rounded-lg bg-[#f7f2ea] p-2">
                {area.label}
              </div>
            ))}
          </div>
          <Link className="text-sm font-semibold text-[var(--color-primary)]" to="/serviceability">
            Check by pincode
          </Link>
        </Card>
      </section>

      <section className="space-y-5">
        <h2 className="font-heading text-3xl">{copyBlocks.trustSectionTitle}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {brandConfig.trustPillars.map((pillar) => (
            <Card key={pillar}>
              <p className="font-semibold text-[var(--color-primary)]">{pillar}</p>
              <p className="mt-2 text-sm text-neutral-600">
                A warm, local approach focused on daily consistency and value.
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {howItWorks.map((step, index) => (
          <Card key={step.title} className="relative overflow-hidden">
            <span className="absolute right-4 top-4 text-4xl font-heading text-neutral-100">{index + 1}</span>
            <h3 className="font-heading text-2xl">{step.title}</h3>
            <p className="mt-2 text-sm text-neutral-600">{step.description}</p>
          </Card>
        ))}
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-soft">
        <h2 className="font-heading text-3xl">Subscription that adapts to your week</h2>
        <p className="mt-3 max-w-3xl text-neutral-600">{copyBlocks.subscriptionNote}</p>
        <Link to="/subscription-planner" className="mt-5 inline-block text-sm font-semibold text-[var(--color-primary)]">
          Explore subscription planner
        </Link>
      </section>
    </div>
  );
};
