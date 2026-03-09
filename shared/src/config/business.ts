import type { BusinessConfig } from '../types/settings.js';

export const businessConfig: BusinessConfig = {
  launchCity: 'Lucknow',
  taxRate: 0.05,
  subscriptionDiscountPercent: 10,
  serviceCities: [
    {
      name: 'lucknow',
      label: 'Lucknow',
      areas: [
        { name: 'gomti-nagar', label: 'Gomti Nagar', pincodes: ['226010'] },
        { name: 'indira-nagar', label: 'Indira Nagar', pincodes: ['226016'] },
        { name: 'hazratganj', label: 'Hazratganj', pincodes: ['226001'] },
        { name: 'aliganj', label: 'Aliganj', pincodes: ['226024'] },
        { name: 'rajajipuram', label: 'Rajajipuram', pincodes: ['226017'] },
        { name: 'jankipuram', label: 'Jankipuram', pincodes: ['226021'] },
        { name: 'ashiyana', label: 'Ashiyana', pincodes: ['226012'] }
      ]
    }
  ],
  deliverySlots: [
    {
      id: 'morning',
      label: 'Morning Delivery',
      startTime: '06:00',
      endTime: '09:00',
      isEnabled: true,
      message: 'Freshly packed each morning.'
    },
    {
      id: 'midday',
      label: 'Midday Window',
      startTime: '11:00',
      endTime: '12:00',
      isEnabled: true,
      message: 'Configurable placeholder slot for MVP.'
    },
    {
      id: 'evening',
      label: 'Evening Delivery',
      startTime: '17:00',
      endTime: '20:00',
      isEnabled: true,
      message: 'Useful for working families.'
    }
  ]
};
