import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { LoadingState } from '../components/LoadingState';
import { Toast } from '../components/Toast';
import { useCartStore } from '../context/CartStore';
import { apiClient } from '../lib/api';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const addItem = useCartStore((state) => state.addItem);

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const response = await apiClient.get(`/catalog/products/${slug}`);
      setProduct(response.data.data);
      setLoading(false);
    };

    load();
  }, [slug]);

  if (loading) {
    return <LoadingState label="Loading product..." />;
  }

  if (!product) {
    return <Toast tone="error" message="Product unavailable" />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <h1 className="font-heading text-4xl">{product.name}</h1>
        <p className="mt-3 text-neutral-600">{product.description || product.shortDescription}</p>
        <div className="mt-6 space-y-3">
          {product.variants.map((variant: any) => (
            <div key={variant._id} className="rounded-xl border border-neutral-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{variant.name}</p>
                  <p className="text-sm text-neutral-600">One-time Rs {variant.oneTimePrice}</p>
                  <p className="text-sm text-[var(--color-primary)]">Subscribe Rs {variant.subscriptionPrice}</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Stock: {variant.inventory?.inStock ? 'Available' : 'Out of stock'}
                  </p>
                </div>
                <div className="space-y-2">
                  <Button
                    className="w-24 text-xs"
                    onClick={async () => {
                      await addItem({ variantId: variant._id, quantity: 1, purchaseMode: 'ONE_TIME' });
                      setToast('Added to cart');
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    className="w-24 text-xs"
                    variant="secondary"
                    onClick={async () => {
                      await addItem({
                        variantId: variant._id,
                        quantity: 1,
                        purchaseMode: 'SUBSCRIPTION',
                        frequency: 'DAILY'
                      });
                      setToast('Subscription item added');
                    }}
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="h-fit">
        <h2 className="font-heading text-2xl">Simple product info for MVP</h2>
        <p className="mt-2 text-sm text-neutral-600">
          This page focuses on product selection, pack variants, and ordering actions.
        </p>
      </Card>

      {toast ? <Toast message={toast} tone="success" /> : null}
    </div>
  );
};
