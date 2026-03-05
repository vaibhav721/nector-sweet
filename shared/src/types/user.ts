import type { UserRole } from './enums';

export interface Address {
  id: string;
  userId: string;
  line1: string;
  line2?: string;
  city: string;
  area: string;
  pincode: string;
  landmark?: string;
  isPrimary: boolean;
}

export interface User {
  id: string;
  firebaseUid: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  primaryAddressId?: string;
  createdAt: string;
  updatedAt: string;
}
