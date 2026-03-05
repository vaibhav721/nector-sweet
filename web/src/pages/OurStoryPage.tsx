import { Card } from '../components/Card';

export const OurStoryPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-4xl">Our Story</h1>
      <Card className="space-y-4 text-neutral-700">
        <p>
          Nectar Sweet started as a small neighborhood dairy promise in Lucknow: bring daily essentials that
          feel fresh, familiar, and affordable.
        </p>
        <p>
          The goal is simple. Keep dairy ordering easy for families who value traditional taste but also
          expect dependable doorstep delivery.
        </p>
        <p>
          We are building this journey step by step with local routes, honest pricing, and service that stays
          warm and personal.
        </p>
      </Card>
    </div>
  );
};
