import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { apiClient } from '../../lib/api';

export const AdminProductsPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState({
    categoryId: '',
    type: 'MILK',
    name: '',
    slug: '',
    shortDescription: ''
  });

  const load = async () => {
    const [productsResponse, categoriesResponse] = await Promise.all([
      apiClient.get('/admin/products'),
      apiClient.get('/catalog/categories')
    ]);

    setProducts(productsResponse.data.data);
    setCategories(categoriesResponse.data.data);
    if (!newProduct.categoryId && categoriesResponse.data.data[0]) {
      setNewProduct((prev) => ({ ...prev, categoryId: categoriesResponse.data.data[0]._id }));
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-3xl">Product Management</h1>
      <Card className="space-y-2">
        <h2 className="font-semibold">Add product</h2>
        <Select
          value={newProduct.categoryId}
          onChange={(event) => setNewProduct({ ...newProduct, categoryId: event.target.value })}
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Select value={newProduct.type} onChange={(event) => setNewProduct({ ...newProduct, type: event.target.value })}>
          <option value="MILK">Milk</option>
          <option value="CURD">Curd</option>
          <option value="PANEER">Paneer</option>
          <option value="GHEE">Desi Ghee</option>
        </Select>
        <Input
          placeholder="Name"
          value={newProduct.name}
          onChange={(event) => setNewProduct({ ...newProduct, name: event.target.value })}
        />
        <Input
          placeholder="Slug"
          value={newProduct.slug}
          onChange={(event) => setNewProduct({ ...newProduct, slug: event.target.value })}
        />
        <Input
          placeholder="Short description"
          value={newProduct.shortDescription}
          onChange={(event) => setNewProduct({ ...newProduct, shortDescription: event.target.value })}
        />
        <Button
          onClick={async () => {
            await apiClient.post('/admin/products', newProduct);
            setNewProduct({ ...newProduct, name: '', slug: '', shortDescription: '' });
            load();
          }}
        >
          Create product
        </Button>
      </Card>

      {products.map((product) => (
        <Card key={product._id} className="space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-neutral-500">{product.shortDescription}</p>
            </div>
            <Button
              variant="danger"
              onClick={async () => {
                await apiClient.delete(`/admin/products/${product._id}`);
                load();
              }}
            >
              Archive
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Variants and pricing</h4>
            {product.variants.map((variant: any) => (
              <div key={variant._id} className="rounded-lg border border-neutral-200 p-3 text-sm">
                <p className="font-semibold">{variant.name}</p>
                <p>
                  One-time Rs {variant.oneTimePrice} | Subscription Rs {variant.subscriptionPrice}
                </p>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};
