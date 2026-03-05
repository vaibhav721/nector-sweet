import { copyBlocks } from '@nectar-sweet/shared';
import { Link } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';

const controls = [
  'Pause subscription',
  'Skip one day',
  'Add extra quantity for one day',
  'Change frequency',
  'Edit quantity anytime'
];

export const SubscriptionPlannerPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <Badge>Flexible Planner</Badge>
        <h1 className="mt-3 font-heading text-4xl">Subscription Planner</h1>
        <p className="mt-2 max-w-2xl text-neutral-600">{copyBlocks.subscriptionNote}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-heading text-2xl">Frequencies</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-700">
            <li>Daily deliveries</li>
            <li>Alternate-day deliveries</li>
            <li>Custom days for your weekly pattern</li>
          </ul>
        </Card>

        <Card>
          <h2 className="font-heading text-2xl">Control panel after purchase</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-700">
            {controls.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </div>

      <Link className="inline-block text-sm font-semibold text-[var(--color-primary)]" to="/shop">
        Add subscription products from shop
      </Link>
    </div>
  );
};
