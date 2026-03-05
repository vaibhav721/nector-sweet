import { businessConfig } from '@nectar-sweet/shared';
import { connectDb } from '../config/database.js';
import {
  AppSettingModel,
  CategoryModel,
  ExpiryRecordModel,
  InventoryModel,
  ProductModel,
  ProductVariantModel,
  ServiceableAreaModel,
  ServiceableCityModel,
  ServiceablePincodeModel,
  UserModel
} from '../models/index.js';

const seed = async () => {
  await connectDb();

  await Promise.all([
    AppSettingModel.deleteMany({}),
    ExpiryRecordModel.deleteMany({}),
    InventoryModel.deleteMany({}),
    ProductVariantModel.deleteMany({}),
    ProductModel.deleteMany({}),
    CategoryModel.deleteMany({}),
    ServiceablePincodeModel.deleteMany({}),
    ServiceableAreaModel.deleteMany({}),
    ServiceableCityModel.deleteMany({})
  ]);

  const categories = await CategoryModel.insertMany([
    {
      name: 'Milk',
      slug: 'milk',
      description: 'Daily milk essentials',
      sortOrder: 1
    },
    {
      name: 'Curd',
      slug: 'curd',
      description: 'Fresh curd and yogurt variants',
      sortOrder: 2
    },
    {
      name: 'Paneer',
      slug: 'paneer',
      description: 'Fresh paneer blocks',
      sortOrder: 3
    },
    {
      name: 'Desi Ghee',
      slug: 'desi-ghee',
      description: 'Traditional desi ghee',
      sortOrder: 4
    }
  ]);

  const categoryBySlug = new Map(categories.map((item) => [item.slug, item]));

  const products = await ProductModel.insertMany([
    {
      categoryId: categoryBySlug.get('milk')!._id,
      type: 'MILK',
      name: 'Farm Milk - Cow',
      slug: 'farm-milk-cow',
      shortDescription: 'Smooth and light for daily tea and breakfast.',
      description: 'Fresh local cow milk with a clean daily taste.',
      images: ['/images/milk-cow.jpg'],
      featured: true
    },
    {
      categoryId: categoryBySlug.get('milk')!._id,
      type: 'MILK',
      name: 'Farm Milk - Buffalo',
      slug: 'farm-milk-buffalo',
      shortDescription: 'Richer milk for creamy chai and sweets.',
      description: 'Buffalo milk with naturally thicker texture.',
      images: ['/images/milk-buffalo.jpg'],
      featured: true
    },
    {
      categoryId: categoryBySlug.get('curd')!._id,
      type: 'CURD',
      name: 'Classic Curd',
      slug: 'classic-curd',
      shortDescription: 'Soft set curd for meals and snacks.',
      images: ['/images/curd.jpg'],
      featured: true
    },
    {
      categoryId: categoryBySlug.get('paneer')!._id,
      type: 'PANEER',
      name: 'Fresh Paneer',
      slug: 'fresh-paneer',
      shortDescription: 'Daily-use paneer for home cooking.',
      images: ['/images/paneer.jpg']
    },
    {
      categoryId: categoryBySlug.get('desi-ghee')!._id,
      type: 'GHEE',
      name: 'Desi Ghee',
      slug: 'desi-ghee-jar',
      shortDescription: 'Traditional ghee for cooking and finishing.',
      images: ['/images/ghee.jpg']
    }
  ]);

  const productBySlug = new Map(products.map((item) => [item.slug, item]));

  const variants = await ProductVariantModel.insertMany([
    {
      productId: productBySlug.get('farm-milk-cow')!._id,
      sku: 'MILK-COW-500ML',
      name: 'Cow Milk 500 ml',
      milkType: 'COW',
      sizeLabel: '500 ml',
      oneTimePrice: 32,
      subscriptionPrice: 29,
      unitValue: 500,
      unitType: 'ML'
    },
    {
      productId: productBySlug.get('farm-milk-cow')!._id,
      sku: 'MILK-COW-1L',
      name: 'Cow Milk 1 litre',
      milkType: 'COW',
      sizeLabel: '1 litre',
      oneTimePrice: 62,
      subscriptionPrice: 56,
      unitValue: 1,
      unitType: 'L'
    },
    {
      productId: productBySlug.get('farm-milk-cow')!._id,
      sku: 'MILK-COW-2L',
      name: 'Cow Milk 2 litres',
      milkType: 'COW',
      sizeLabel: '2 litres',
      oneTimePrice: 122,
      subscriptionPrice: 110,
      unitValue: 2,
      unitType: 'L'
    },
    {
      productId: productBySlug.get('farm-milk-cow')!._id,
      sku: 'MILK-COW-3L',
      name: 'Cow Milk 3 litres',
      milkType: 'COW',
      sizeLabel: '3 litres',
      oneTimePrice: 182,
      subscriptionPrice: 164,
      unitValue: 3,
      unitType: 'L'
    },
    {
      productId: productBySlug.get('farm-milk-buffalo')!._id,
      sku: 'MILK-BUF-500ML',
      name: 'Buffalo Milk 500 ml',
      milkType: 'BUFFALO',
      sizeLabel: '500 ml',
      oneTimePrice: 38,
      subscriptionPrice: 34,
      unitValue: 500,
      unitType: 'ML'
    },
    {
      productId: productBySlug.get('farm-milk-buffalo')!._id,
      sku: 'MILK-BUF-1L',
      name: 'Buffalo Milk 1 litre',
      milkType: 'BUFFALO',
      sizeLabel: '1 litre',
      oneTimePrice: 74,
      subscriptionPrice: 67,
      unitValue: 1,
      unitType: 'L'
    },
    {
      productId: productBySlug.get('farm-milk-buffalo')!._id,
      sku: 'MILK-BUF-2L',
      name: 'Buffalo Milk 2 litres',
      milkType: 'BUFFALO',
      sizeLabel: '2 litres',
      oneTimePrice: 146,
      subscriptionPrice: 132,
      unitValue: 2,
      unitType: 'L'
    },
    {
      productId: productBySlug.get('farm-milk-buffalo')!._id,
      sku: 'MILK-BUF-3L',
      name: 'Buffalo Milk 3 litres',
      milkType: 'BUFFALO',
      sizeLabel: '3 litres',
      oneTimePrice: 218,
      subscriptionPrice: 196,
      unitValue: 3,
      unitType: 'L'
    },
    {
      productId: productBySlug.get('classic-curd')!._id,
      sku: 'CURD-400G',
      name: 'Classic Curd 400 g',
      sizeLabel: '400 g',
      oneTimePrice: 42,
      subscriptionPrice: 38,
      unitValue: 400,
      unitType: 'G'
    },
    {
      productId: productBySlug.get('fresh-paneer')!._id,
      sku: 'PAN-200G',
      name: 'Fresh Paneer 200 g',
      sizeLabel: '200 g',
      oneTimePrice: 88,
      subscriptionPrice: 79,
      unitValue: 200,
      unitType: 'G'
    },
    {
      productId: productBySlug.get('desi-ghee-jar')!._id,
      sku: 'GHEE-500ML',
      name: 'Desi Ghee 500 ml',
      sizeLabel: '500 ml',
      oneTimePrice: 420,
      subscriptionPrice: 378,
      unitValue: 500,
      unitType: 'ML'
    }
  ]);

  await InventoryModel.insertMany(
    variants.map((variant) => ({
      variantId: variant._id,
      availableQty: 200,
      reservedQty: 0,
      inStock: true,
      lowStockThreshold: 25
    }))
  );

  const city = await ServiceableCityModel.create({
    name: businessConfig.serviceCities[0].name,
    label: businessConfig.serviceCities[0].label,
    isActive: true
  });

  for (const areaInput of businessConfig.serviceCities[0].areas) {
    const area = await ServiceableAreaModel.create({
      cityId: city._id,
      name: areaInput.name,
      label: areaInput.label,
      isActive: true
    });

    await ServiceablePincodeModel.insertMany(
      areaInput.pincodes.map((pincode) => ({
        cityId: city._id,
        areaId: area._id,
        pincode,
        etaLabel: 'Next day morning',
        isActive: true
      }))
    );
  }

  await AppSettingModel.insertMany([
    {
      key: 'brand',
      value: {
        name: 'Nectar Sweet'
      },
      description: 'Brand configuration placeholder'
    },
    {
      key: 'deliverySlots',
      value: businessConfig.deliverySlots,
      description: 'Editable delivery slots'
    }
  ]);

  await UserModel.findOneAndUpdate(
    { firebaseUid: 'admin-dev' },
    {
      firebaseUid: 'admin-dev',
      name: 'Nectar Admin',
      email: 'admin@nectarsweet.com',
      role: 'admin'
    },
    { upsert: true, new: true }
  );

  // eslint-disable-next-line no-console
  console.log('Seed complete');
  process.exit(0);
};

seed().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
