import React, {
  createContext, useContext, useEffect, useState, ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ── Storage keys ───────────────────────────────────────────
const STORAGE_KEYS = {
  TOKEN: '@homezy_token',
  USER:  '@homezy_user',
} as const;

// ── Types ──────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

interface AuthContextType {
  /** null = not logged in, undefined = still loading from storage */
  user: User | null | undefined;
  /** Raw JWT token string, null if not authenticated */
  token: string | null;
  /** True if user is logged in */
  isAuthenticated: boolean;
  /** True during initial AsyncStorage rehydration */
  loading: boolean;
  /** True during login / logout API calls */
  authLoading: boolean;
  /** Last auth error message, or null */
  error: string | null;
  login:    (user: User, token: string) => Promise<void>;
  logout:   () => Promise<void>;
  setError: (error: string | null) => void;
}

// ── Context ────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,        setUser]        = useState<User | null | undefined>(undefined);
  const [token,       setToken]       = useState<string | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error,       setError]       = useState<string | null>(null);

  const isAuthenticated = !!token;

  // ── Rehydrate session on mount ─────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const [storedToken, storedUser] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
          AsyncStorage.getItem(STORAGE_KEYS.USER),
        ]);

        if (storedToken && storedUser) {
          try {
            const parsed = JSON.parse(storedUser) as User;

            // ── Backend Integration Point ─────────────────
            // Optional: validate token with server before trusting it:
            // await api.get('/auth/validate', { headers: { Authorization: `Bearer ${storedToken}` } });

            setToken(storedToken);
            setUser(parsed);
          } catch {
            // Corrupted storage — clear it
            await AsyncStorage.multiRemove([STORAGE_KEYS.TOKEN, STORAGE_KEYS.USER]);
            setUser(null);
            setError('Session corrupted, please sign in again.');
          }
        } else {
          setUser(null);
        }
      } catch (e) {
        console.error('Auth rehydration error:', e);
        setUser(null);
        setError('Failed to restore session.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ── Login ──────────────────────────────────────────────
  const login = async (userData: User, authToken: string) => {
    setAuthLoading(true);
    try {
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.TOKEN, authToken],
        [STORAGE_KEYS.USER,  JSON.stringify(userData)],
      ]);
      setToken(authToken);
      setUser(userData);
      setError(null);
    } catch (e) {
      console.error('Login persistence error:', e);
      setError('Login failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  // ── Logout ─────────────────────────────────────────────
  const logout = async () => {
    setAuthLoading(true);
    try {
      // ── Backend Integration Point ──────────────────────
      // Invalidate token server-side (optional):
      // await api.post('/auth/logout', {}, { headers: { Authorization: `Bearer ${token}` } });

      await AsyncStorage.multiRemove([STORAGE_KEYS.TOKEN, STORAGE_KEYS.USER]);
      setToken(null);
      setUser(null);
      setError(null);
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        authLoading,
        error,
        login,
        logout,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
