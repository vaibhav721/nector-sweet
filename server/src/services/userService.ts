import { UserModel } from '../models/User.js';

interface AuthInput {
  firebaseUid: string;
  email?: string;
  phone?: string;
  role: 'guest' | 'customer' | 'admin';
}

export const upsertUserFromAuth = async (input: AuthInput) => {
  const existing = await UserModel.findOne({ firebaseUid: input.firebaseUid });

  if (existing) {
    existing.email = input.email || existing.email;
    existing.phone = input.phone || existing.phone;
    existing.role = input.role || existing.role;
    if (!existing.name && input.email) {
      existing.name = input.email.split('@')[0];
    }
    await existing.save();
    return existing;
  }

  const user = await UserModel.create({
    firebaseUid: input.firebaseUid,
    email: input.email,
    phone: input.phone,
    role: input.role,
    name: input.email?.split('@')[0] || input.phone || 'Nectar Customer'
  });

  return user;
};
