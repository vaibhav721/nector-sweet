import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { mobileApi, setMobileAuthToken } from '../lib/api';
import { mobileAuth, mobileFirebaseClient } from '../lib/firebase';

type AuthContextValue = {
  user: FirebaseUser | null;
  loading: boolean;
  signInEmail: (email: string, password: string) => Promise<void>;
  signUpEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const syncAuthProfile = async (user: FirebaseUser) => {
  const token = await user.getIdToken();
  setMobileAuthToken(token);
  await mobileApi.post('/auth/sync');
};

export const MobileAuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(mobileAuth, async (authUser) => {
      setUser(authUser);

      if (authUser) {
        await syncAuthProfile(authUser);
      } else {
        setMobileAuthToken(null);
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
        const creds = await mobileFirebaseClient.signInWithEmailAndPassword(mobileAuth, email, password);
        await syncAuthProfile(creds.user);
      },
      async signUpEmail(email: string, password: string) {
        const creds = await mobileFirebaseClient.createUserWithEmailAndPassword(mobileAuth, email, password);
        await syncAuthProfile(creds.user);
      },
      async logout() {
        await mobileFirebaseClient.signOut(mobileAuth);
        setMobileAuthToken(null);
      }
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useMobileAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useMobileAuth must be used within MobileAuthProvider');
  }

  return context;
};
