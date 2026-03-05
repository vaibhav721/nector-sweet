import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { firebaseAuth, firebaseClient, googleProvider, isFirebaseEnabled } from '../lib/firebase';
import { apiClient } from '../lib/api';
import { tokenStore } from '../lib/tokenStore';

type DevUser = {
  uid: string;
  email?: string | null;
  phoneNumber?: string | null;
};

type AppUser = FirebaseUser | DevUser;

type AuthContextValue = {
  user: AppUser | null;
  loading: boolean;
  signInEmail: (email: string, password: string) => Promise<void>;
  signUpEmail: (email: string, password: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  sendPhoneOtp: (phone: string, containerId: string) => Promise<string>;
  confirmPhoneOtp: (verificationId: string, otp: string) => Promise<void>;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const syncUser = async (user: AppUser) => {
  if ('getIdToken' in user && typeof user.getIdToken === 'function') {
    const token = await user.getIdToken();
    tokenStore.set(token);
  }

  await apiClient.post('/auth/sync');
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseEnabled || !firebaseAuth) {
      const devUid = localStorage.getItem('nectar_dev_uid');
      const devEmail = localStorage.getItem('nectar_dev_email');
      if (devUid) {
        setUser({
          uid: devUid,
          email: devEmail,
          phoneNumber: null
        });
      }
      setLoading(false);
      return () => undefined;
    }

    const unsub = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        await syncUser(firebaseUser);
      } else {
        tokenStore.clear();
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      async signInEmail(email: string, password: string) {
        if (!isFirebaseEnabled || !firebaseAuth) {
          localStorage.setItem('nectar_dev_uid', `dev-${email}`);
          localStorage.setItem('nectar_dev_role', 'customer');
          localStorage.setItem('nectar_dev_email', email);
          const devUser: DevUser = {
            uid: `dev-${email}`,
            email,
            phoneNumber: null
          };
          setUser(devUser);
          await syncUser(devUser);
          return;
        }

        const credential = await firebaseClient.signInWithEmailAndPassword(firebaseAuth, email, password);
        await syncUser(credential.user);
      },
      async signUpEmail(email: string, password: string) {
        if (!isFirebaseEnabled || !firebaseAuth) {
          localStorage.setItem('nectar_dev_uid', `dev-${email}`);
          localStorage.setItem('nectar_dev_role', 'customer');
          localStorage.setItem('nectar_dev_email', email);
          const devUser: DevUser = {
            uid: `dev-${email}`,
            email,
            phoneNumber: null
          };
          setUser(devUser);
          await syncUser(devUser);
          return;
        }

        const credential = await firebaseClient.createUserWithEmailAndPassword(firebaseAuth, email, password);
        await syncUser(credential.user);
      },
      async signInGoogle() {
        if (!isFirebaseEnabled || !firebaseAuth || !googleProvider) {
          const email = 'google-dev@nectarsweet.com';
          localStorage.setItem('nectar_dev_uid', 'dev-google-user');
          localStorage.setItem('nectar_dev_role', 'customer');
          localStorage.setItem('nectar_dev_email', email);
          const devUser: DevUser = {
            uid: 'dev-google-user',
            email,
            phoneNumber: null
          };
          setUser(devUser);
          await syncUser(devUser);
          return;
        }

        const credential = await firebaseClient.signInWithPopup(firebaseAuth, googleProvider);
        await syncUser(credential.user);
      },
      async sendPhoneOtp(phone: string, containerId: string) {
        if (!isFirebaseEnabled || !firebaseAuth) {
          localStorage.setItem('nectar_pending_phone', phone);
          return 'DEV_OTP';
        }

        const recaptcha = new firebaseClient.RecaptchaVerifier(firebaseAuth, containerId, {
          size: 'invisible'
        });
        const confirmationResult = await firebaseClient.signInWithPhoneNumber(
          firebaseAuth,
          phone,
          recaptcha
        );
        return confirmationResult.verificationId;
      },
      async confirmPhoneOtp(verificationId: string, otp: string) {
        if (!isFirebaseEnabled || !firebaseAuth) {
          if (verificationId !== 'DEV_OTP') {
            throw new Error('Invalid OTP verification id');
          }

          const phone = localStorage.getItem('nectar_pending_phone') || '';
          const uid = `dev-${phone || 'phone-user'}`;
          localStorage.setItem('nectar_dev_uid', uid);
          localStorage.setItem('nectar_dev_role', 'customer');
          localStorage.setItem('nectar_dev_phone', phone);
          const devUser: DevUser = {
            uid,
            email: null,
            phoneNumber: phone || null
          };
          setUser(devUser);
          await syncUser(devUser);
          return;
        }

        const provider = (await import('firebase/auth')).PhoneAuthProvider.credential(verificationId, otp);
        const authCredential = await (await import('firebase/auth')).signInWithCredential(
          firebaseAuth,
          provider
        );
        await syncUser(authCredential.user);
      },
      async signOutUser() {
        if (!isFirebaseEnabled || !firebaseAuth) {
          localStorage.removeItem('nectar_dev_uid');
          localStorage.removeItem('nectar_dev_role');
          localStorage.removeItem('nectar_dev_email');
          localStorage.removeItem('nectar_dev_phone');
          localStorage.removeItem('nectar_pending_phone');
          setUser(null);
          tokenStore.clear();
          return;
        }

        await firebaseClient.signOut(firebaseAuth);
        tokenStore.clear();
      }
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
