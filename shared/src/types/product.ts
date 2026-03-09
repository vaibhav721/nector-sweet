import type { ProductType } from './enums.js';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface Product {
  id: string;
  categoryId: string;
  type: ProductType;
  name: string;
  slug: string;
  shortDescription: string;
  description?: string;
  images: string[];
  isActive: boolean;
  featured: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  name: string;
  milkType?: 'COW' | 'BUFFALO';
  sizeLabel: string;
  oneTimePrice: number;
  subscriptionPrice: number;
  unitValue: number;
  unitType: 'ML' | 'L' | 'G' | 'KG';
  isActive: boolean;
  stockStatus: 'IN_STOCK' | 'OUT_OF_STOCK';
}
