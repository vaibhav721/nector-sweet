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
    <div className="grid gap-8 md:grid-cols-[1fr_320px] max-w-5xl mx-auto">
      <div className="space-y-4">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-neutral-900">Cart</h1>
        {cart.items.map((item: any) => (
          <Card key={item.id} className="p-4 border-none shadow-sm ring-1 ring-neutral-100">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-neutral-900">{item.productName}</p>
                <p className="text-sm text-neutral-500">{item.variantName}</p>
                <p className="mt-1 inline-block rounded bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
                  {item.purchaseMode.replace('_', ' ')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  className="w-20 text-center"
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(event) => updateItem(item.id, { quantity: Number(event.target.value) })}
                />
                <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => removeItem(item.id)}>
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="h-fit space-y-5 border-none shadow-sm ring-1 ring-neutral-100 p-6 bg-neutral-50/50">
        <h2 className="font-heading text-xl font-bold text-neutral-900">Order Summary</h2>
        <div className="space-y-2 text-sm text-neutral-600">
          <div className="flex justify-between"><p>Subtotal:</p> <p>Rs {cart.subtotal.toFixed(2)}</p></div>
          <div className="flex justify-between text-primary"><p>Subscription Discount:</p> <p>- Rs {cart.subscriptionDiscount.toFixed(2)}</p></div>
          <div className="flex justify-between"><p>Tax:</p> <p>Rs {cart.tax.toFixed(2)}</p></div>
          <div className="pt-3 mt-3 border-t border-neutral-200 flex justify-between items-center">
            <p className="font-bold text-neutral-900 uppercase tracking-wide text-xs">Total</p>
            <p className="font-bold text-xl text-neutral-900">Rs {cart.total.toFixed(2)}</p>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-neutral-200">
          <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">Delivery location</p>
          <div className="space-y-2">
            <Input
              placeholder="City"
              value={locationDraft.city}
              onChange={(event) => setLocationDraft((prev) => ({ ...prev, city: event.target.value }))}
            />
            <div className="grid grid-cols-2 gap-2">
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
          </div>
          <Button variant="secondary" className="w-full text-xs" onClick={() => setLocation(locationDraft)}>
            Save location
          </Button>
        </div>

        <Link to="/checkout" className="block mt-6">
          <Button className="w-full py-3 text-base shadow-sm">Proceed to checkout</Button>
        </Link>
      </Card>
    </div>
  );
};
