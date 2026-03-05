import { useSearchParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order');

  return (
    <Card className="mx-auto max-w-xl text-center">
      <h1 className="font-heading text-4xl">Order Confirmed</h1>
      <p className="mt-3 text-sm text-neutral-600">
        Your order has been placed with payment status marked as pending/manual settlement.
      </p>
      {orderId ? <p className="mt-2 text-xs text-neutral-500">Order reference: {orderId}</p> : null}
      <Button className="mt-4" onClick={() => (window.location.href = '/account/invoices')}>
        View invoice history
      </Button>
    </Card>
  );
};
