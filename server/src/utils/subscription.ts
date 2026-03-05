import dayjs from 'dayjs';
import type { SubscriptionFrequency } from '@nectar-sweet/shared';

export const computeNextDeliveryDate = (
  fromDate: Date,
  frequency: SubscriptionFrequency,
  customDaysOfWeek?: number[]
): Date => {
  const base = dayjs(fromDate);

  if (frequency === 'DAILY') {
    return base.add(1, 'day').toDate();
  }

  if (frequency === 'ALTERNATE_DAY') {
    return base.add(2, 'day').toDate();
  }

  const allowedDays = customDaysOfWeek && customDaysOfWeek.length ? customDaysOfWeek : [1, 3, 5];

  for (let i = 1; i <= 14; i += 1) {
    const next = base.add(i, 'day');
    if (allowedDays.includes(next.day())) {
      return next.toDate();
    }
  }

  return base.add(2, 'day').toDate();
};
