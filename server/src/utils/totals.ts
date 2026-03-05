import { businessConfig } from '@nectar-sweet/shared';

export interface LineInput {
  unitPrice: number;
  quantity: number;
  isSubscription: boolean;
}

export const calculateCartTotals = (lines: LineInput[]) => {
  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);

  const subscriptionDiscount = lines
    .filter((line) => line.isSubscription)
    .reduce(
      (sum, line) =>
        sum + (line.unitPrice * line.quantity * businessConfig.subscriptionDiscountPercent) / 100,
      0
    );

  const taxableAmount = subtotal - subscriptionDiscount;
  const tax = Number((taxableAmount * businessConfig.taxRate).toFixed(2));
  const total = Number((taxableAmount + tax).toFixed(2));

  return {
    subtotal,
    subscriptionDiscount,
    tax,
    total
  };
};
