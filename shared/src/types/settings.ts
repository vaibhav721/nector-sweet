export interface DeliverySlot {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  isEnabled: boolean;
  message: string;
}

export interface ContactDetails {
  phone: string;
  email: string;
  whatsappLink?: string;
}

export interface BrandConfig {
  brandName: string;
  tagline: string;
  trustPillars: string[];
  logoUrl: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    heading: string;
    body: string;
  };
  contact: ContactDetails;
}

export interface BusinessConfig {
  launchCity: string;
  taxRate: number;
  subscriptionDiscountPercent: number;
  serviceCities: Array<{
    name: string;
    label: string;
    areas: Array<{
      name: string;
      label: string;
      pincodes: string[];
    }>;
  }>;
  deliverySlots: DeliverySlot[];
}
