"use client";
import { create } from "zustand";
import { getCookie, removeCookie, setCookie } from "@/lib/cookies";

const ACCESS_TOKEN = "thisisjustarandomstring";

interface AuthUser {
  accountNo: string;
  email: string;
  role: string[];
  exp: number;
}

interface AuthState {
  auth: {
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void;
    accessToken: string;
    setAccessToken: (accessToken: string) => void;
    resetAccessToken: () => void;
    reset: () => void;
  };
}

const useAuthStoreBase = create<AuthState>()((set) => ({
  auth: {
    user: null,
    setUser: (user) =>
      set((state) => ({ ...state, auth: { ...state.auth, user } })),
    accessToken: initToken,
    setAccessToken: (accessToken) =>
      set((state) => {
        setCookie(ACCESS_TOKEN, JSON.stringify(accessToken));
        return { ...state, auth: { ...state.auth, accessToken } };
      }),
    resetAccessToken: () =>
      set((state) => {
        removeCookie(ACCESS_TOKEN);
        return { ...state, auth: { ...state.auth, accessToken: "" } };
      }),
    reset: () =>
      set((state) => {
        removeCookie(ACCESS_TOKEN);
        return {
          ...state,
          auth: { ...state.auth, user: null, accessToken: "" },
        };
      }),
  },
}));

export const useAuthStore = () => {
  const store = useAuthStoreBase();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const cookieState = getCookie(ACCESS_TOKEN);
      if (cookieState) {
        const token = JSON.parse(cookieState);
        store.auth.setAccessToken(token);
      }
    } catch (e) {
      // If cookie is malformed, it's safer to clear it
      console.error("Failed to parse auth token from cookie", e);
      removeCookie(ACCESS_TOKEN);
    } finally {
      setHydrated(true);
    }
  }, []);

  return { ...store, hydrated };
};
