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
          <h1 className="font-heading text-3xl font-bold tracking-tight text-neutral-900">Shop Dairy Products</h1>
          <p className="mt-2 text-neutral-500">Choose one-time or subscription per item.</p>
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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((product) => (
          <Card key={product._id} className="flex flex-col gap-4 overflow-hidden p-0">
            {product.images?.[0] ? (
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}${product.images[0]}`}
                alt={product.name}
                className="h-48 w-full object-cover bg-neutral-100"
              />
            ) : (
              <div className="h-48 w-full bg-neutral-100 flex items-center justify-center">
                <span className="text-neutral-400 text-sm">No image</span>
              </div>
            )}

            <div className="flex flex-col gap-4 p-5 flex-1">
              <div>
                <h3 className="font-heading text-2xl font-bold text-neutral-900">{product.name}</h3>
                <p className="mt-1 text-sm text-neutral-500 leading-relaxed">{product.shortDescription}</p>
              </div>

              <div className="space-y-3">
                {product.variants.map((variant: any) => (
                  <div key={variant._id} className="rounded-xl border border-neutral-100 bg-neutral-50 p-4 text-sm transition-colors hover:border-primary/30">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-semibold text-neutral-900">{variant.name}</p>
                        <div className="mt-1 flex items-center gap-3">
                          <p className="text-xs font-medium text-neutral-500">One-time Rs {variant.oneTimePrice}</p>
                          <p className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-semibold text-primary">
                            Subscribe Rs {variant.subscriptionPrice}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-24 flex-col gap-2">
                        <Button className="w-full text-xs shadow-none py-1.5" onClick={() => addOneTime(variant._id)}>
                          Add
                        </Button>
                        <Button
                          className="w-full text-xs shadow-none py-1.5 border border-primary/20 text-primary bg-white hover:bg-primary/5"
                          variant="ghost"
                          onClick={() => addSubscription(variant._id)}
                        >
                          Subscribe
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link to={`/products/${product.slug}`} className="mt-auto pt-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover">
                View details &rarr;
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
