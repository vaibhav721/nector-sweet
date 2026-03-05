import { InventoryModel, NotificationModel, ProductVariantModel } from '../models/index.js';
import { HttpError } from '../utils/httpError.js';

interface AllocationLine {
  variantId: string;
  quantity: number;
  purchaseMode: 'ONE_TIME' | 'SUBSCRIPTION';
}

export const validateStockForCheckout = async (lines: AllocationLine[]) => {
  const shortages: string[] = [];

  for (const line of lines) {
    const variant = await ProductVariantModel.findById(line.variantId);
    if (!variant || variant.stockStatus === 'OUT_OF_STOCK') {
      throw new HttpError(409, 'OUT_OF_STOCK', `Variant ${line.variantId} is out of stock`);
    }

    const inventory = await InventoryModel.findOne({ variantId: line.variantId });
    if (!inventory) {
      throw new HttpError(409, 'INVENTORY_MISSING', `Inventory record missing for ${line.variantId}`);
    }

    const freeQty = inventory.availableQty - inventory.reservedQty;

    if (line.purchaseMode === 'ONE_TIME' && freeQty < line.quantity) {
      throw new HttpError(409, 'LOW_STOCK', `Insufficient stock for ${variant.name}`);
    }

    if (line.purchaseMode === 'SUBSCRIPTION' && freeQty < line.quantity) {
      shortages.push(`Inventory is currently short for subscription item ${variant.name}`);
    }
  }

  return shortages;
};

export const reserveAndConsumeInventory = async (lines: AllocationLine[], userId: string) => {
  const notifications: string[] = [];

  for (const line of lines) {
    const inventory = await InventoryModel.findOne({ variantId: line.variantId });
    if (!inventory) {
      continue;
    }

    const freeQty = inventory.availableQty - inventory.reservedQty;

    if (line.purchaseMode === 'ONE_TIME') {
      inventory.availableQty = Math.max(inventory.availableQty - line.quantity, 0);
    } else {
      inventory.reservedQty += line.quantity;
      if (freeQty < line.quantity) {
        notifications.push(`Temporary stock shortfall detected for variant ${line.variantId}.`);
      }
    }

    inventory.inStock = inventory.availableQty > 0;
    await inventory.save();
  }

  if (notifications.length) {
    await NotificationModel.create({
      userId,
      type: 'SUBSCRIPTION',
      title: 'Stock update',
      body: 'Some subscription items are in short supply. Our team will confirm delivery updates.',
      metadata: { notifications }
    });
  }
};
