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
      <Card className="overflow-hidden p-0">
        {product.images?.[0] ? (
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}${product.images[0]}`}
            alt={product.name}
            className="h-64 w-full object-cover bg-neutral-100"
          />
        ) : (
          <div className="h-48 w-full bg-neutral-100 flex items-center justify-center">
            <span className="text-neutral-400 text-sm">No image</span>
          </div>
        )}
        <div className="p-6">
          <h1 className="font-heading text-4xl">{product.name}</h1>
          <p className="mt-3 leading-relaxed text-neutral-600">{product.description || product.shortDescription}</p>
          <div className="mt-8 space-y-4">
            {product.variants.map((variant: any) => (
              <div key={variant._id} className="rounded-xl border border-neutral-100 bg-neutral-50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-neutral-900">{variant.name}</p>
                    <div className="mt-1 flex items-center gap-3">
                      <p className="text-sm font-medium text-neutral-500">One-time Rs {variant.oneTimePrice}</p>
                      <p className="rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                        Subscribe Rs {variant.subscriptionPrice}
                      </p>
                    </div>
                    <p className="mt-2 inline-block rounded-full bg-neutral-200/50 px-2 py-0.5 text-xs font-medium text-neutral-500">
                      {variant.inventory?.inStock ? 'Available' : 'Out of stock'}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      className="w-28 text-xs py-2 shadow-sm"
                      onClick={async () => {
                        await addItem({ variantId: variant._id, quantity: 1, purchaseMode: 'ONE_TIME' });
                        setToast('Added to cart');
                      }}
                    >
                      Add
                    </Button>
                    <Button
                      className="w-28 text-xs py-2 shadow-none border border-primary/20 text-primary bg-white hover:bg-primary/5"
                      variant="ghost"
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
