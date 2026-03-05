import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { EmptyState } from '../components/EmptyState';
import { Input } from '../components/Input';
import { useCartStore } from '../context/CartStore';

export const CartPage = () => {
  const navigate = useNavigate();

  const cart = useCartStore((state) => state.cart);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const updateItem = useCartStore((state) => state.updateItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const setLocation = useCartStore((state) => state.setLocation);
  const [locationDraft, setLocationDraft] = useState({ city: '', area: '', pincode: '' });

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    if (cart) {
      setLocationDraft({
        city: cart.city || '',
        area: cart.area || '',
        pincode: cart.pincode || ''
      });
    }
  }, [cart]);

  if (!cart || !cart.items?.length) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Add milk and dairy products to get started."
        ctaLabel="Go to shop"
        onCta={() => navigate('/shop')}
      />
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-[1fr_320px]">
      <div className="space-y-3">
        <h1 className="font-heading text-3xl">Cart</h1>
        {cart.items.map((item: any) => (
          <Card key={item.id}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold">{item.productName}</p>
                <p className="text-sm text-neutral-500">{item.variantName}</p>
                <p className="text-xs text-neutral-500">{item.purchaseMode.replace('_', ' ')}</p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  className="w-20"
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(event) => updateItem(item.id, { quantity: Number(event.target.value) })}
                />
                <Button variant="ghost" onClick={() => removeItem(item.id)}>
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="h-fit space-y-3">
        <h2 className="font-heading text-2xl">Order Summary</h2>
        <div className="text-sm text-neutral-700">
          <p>Subtotal: Rs {cart.subtotal.toFixed(2)}</p>
          <p>Subscription Discount: - Rs {cart.subscriptionDiscount.toFixed(2)}</p>
          <p>Tax: Rs {cart.tax.toFixed(2)}</p>
          <p className="mt-2 font-semibold">Total: Rs {cart.total.toFixed(2)}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Delivery location</p>
          <div className="grid grid-cols-3 gap-2">
            <Input
              placeholder="City"
              value={locationDraft.city}
              onChange={(event) => setLocationDraft((prev) => ({ ...prev, city: event.target.value }))}
            />
            <Input
              placeholder="Area"
              value={locationDraft.area}
              onChange={(event) => setLocationDraft((prev) => ({ ...prev, area: event.target.value }))}
            />
            <Input
              placeholder="Pincode"
              value={locationDraft.pincode}
              onChange={(event) => setLocationDraft((prev) => ({ ...prev, pincode: event.target.value }))}
            />
          </div>
          <Button variant="ghost" onClick={() => setLocation(locationDraft)}>
            Save location
          </Button>
        </div>

        <Link to="/checkout">
          <Button className="w-full">Proceed to checkout</Button>
        </Link>
      </Card>
    </div>
  );
};
