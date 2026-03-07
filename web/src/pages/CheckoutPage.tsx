import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Toast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../lib/api';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [preview, setPreview] = useState<any>(null);
  const [slotId, setSlotId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      return;
    }

    const load = async () => {
      const response = await apiClient.post('/checkout/preview');
      setPreview(response.data.data);
      setSlotId(response.data.data.availableSlots[0]?.id || '');
    };

    load().catch((error: any) => {
      setMessage(error.response?.data?.error?.message || 'Unable to load checkout.');
    });
  }, [user]);

  if (!user) {
    return (
      <Card>
        <h1 className="font-heading text-3xl">Login required</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Please login to place an order or start subscriptions.
        </p>
        <Button className="mt-4" onClick={() => navigate('/auth')}>
          Go to login
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-4xl">Checkout</h1>
      {message ? <Toast tone="error" message={message} /> : null}

      {preview ? (
        <Card className="space-y-3 md:max-w-2xl">
          <p className="text-sm text-neutral-700">{preview.paymentMode.note}</p>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Delivery slot</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {preview.availableSlots.map((slot: any) => (
                <button
                  key={slot.id}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors active:scale-95 ${slotId === slot.id ? 'bg-primary text-white shadow-sm' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
                  onClick={() => setSlotId(slot.id)}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>

          {preview.shortages?.length ? (
            <Toast
              tone="info"
              message="Some subscription items may have temporary stock shortage. Our team will notify you."
            />
          ) : null}

          <div className="text-sm text-neutral-700">
            <p>Subtotal: Rs {preview.cart.subtotal.toFixed(2)}</p>
            <p>Tax: Rs {preview.cart.tax.toFixed(2)}</p>
            <p className="font-semibold">Total: Rs {preview.cart.total.toFixed(2)}</p>
          </div>

          <Button
            onClick={async () => {
              const response = await apiClient.post('/checkout/place', { deliverySlotId: slotId });
              navigate(`/order-success?order=${response.data.data.order._id}`);
            }}
          >
            Place order (payment pending)
          </Button>
        </Card>
      ) : null}
    </div>
  );
};
