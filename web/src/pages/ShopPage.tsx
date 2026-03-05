import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { LoadingState } from '../components/LoadingState';
import { Select } from '../components/Select';
import { Toast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { useCartStore } from '../context/CartStore';
import { apiClient } from '../lib/api';

export const ShopPage = () => {
  const { user } = useAuth();
  const addItem = useCartStore((state) => state.addItem);

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [categoryResponse, productResponse] = await Promise.all([
        apiClient.get('/catalog/categories'),
        apiClient.get('/catalog/products')
      ]);

      setCategories(categoryResponse.data.data);
      setProducts(productResponse.data.data);
      setLoading(false);
    };

    load();
  }, []);

  const filtered = useMemo(() => {
    if (!categoryId) {
      return products;
    }

    return products.filter((product) => product.categoryId === categoryId);
  }, [categoryId, products]);

  const addOneTime = async (variantId: string) => {
    await addItem({
      variantId,
      quantity: 1,
      purchaseMode: 'ONE_TIME'
    });
    setMessage('Added to cart');
  };

  const addSubscription = async (variantId: string) => {
    if (!user) {
      setMessage('Please login to start subscriptions.');
      return;
    }

    await addItem({
      variantId,
      quantity: 1,
      purchaseMode: 'SUBSCRIPTION',
      frequency: 'DAILY'
    });
    setMessage('Subscription item added to cart');
  };

  if (loading) {
    return <LoadingState label="Loading products..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl">Shop Dairy Products</h1>
          <p className="mt-1 text-sm text-neutral-600">Choose one-time or subscription per item.</p>
        </div>

        <div className="w-full md:w-72">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Filter by category
          </label>
          <Select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {message ? <Toast message={message} tone="success" /> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((product) => (
          <Card key={product._id} className="flex flex-col gap-3">
            <div>
              <h3 className="font-heading text-2xl">{product.name}</h3>
              <p className="text-sm text-neutral-600">{product.shortDescription}</p>
            </div>

            <div className="space-y-2">
              {product.variants.map((variant: any) => (
                <div key={variant._id} className="rounded-lg border border-neutral-200 p-3 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{variant.name}</p>
                      <p className="text-xs text-neutral-500">One-time Rs {variant.oneTimePrice}</p>
                      <p className="text-xs text-[var(--color-primary)]">
                        Subscribe Rs {variant.subscriptionPrice}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Button className="w-full text-xs" onClick={() => addOneTime(variant._id)}>
                        Add
                      </Button>
                      <Button
                        className="w-full text-xs"
                        variant="secondary"
                        onClick={() => addSubscription(variant._id)}
                      >
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link to={`/products/${product.slug}`} className="text-sm font-semibold text-[var(--color-primary)]">
              View details
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};
