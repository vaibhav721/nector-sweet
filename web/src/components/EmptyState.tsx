import { Button } from './Button';

export const EmptyState = ({
  title,
  description,
  ctaLabel,
  onCta
}: {
  title: string;
  description: string;
  ctaLabel?: string;
  onCta?: () => void;
}) => {
  return (
    <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center">
      <h3 className="font-heading text-2xl">{title}</h3>
      <p className="mt-2 text-sm text-neutral-600">{description}</p>
      {ctaLabel ? (
        <Button className="mt-4" onClick={onCta}>
          {ctaLabel}
        </Button>
      ) : null}
    </div>
  );
};
