import type { UserRole } from '@nectar-sweet/shared';

export interface AuthUser {
  firebaseUid: string;
  email?: string;
  phone?: string;
  role: UserRole;
}
