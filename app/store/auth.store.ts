import { create } from "zustand";
import { persist } from "zustand/middleware";
import { meRequest } from "~/routes/auth/api/auth.api";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  hydrated: boolean;

  setAuth: (
    token: string,
    user?: User | null
  ) => void;

  checkAuth: () => Promise<void>;

  logout: () => void;

  setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      loading: true,
      hydrated: false,

      setAuth: (token, user = null) =>
        set({
          token,
          user,
          loading: false,
        }),

      checkAuth: async () => {
  const token = get().token;

  if (!token) {
    set({
      user: null,
      loading: false,
    });

    return;
  }

  // مؤقتًا: لا نتحقق من التوكن عبر API
  set({
    loading: false,
  });

  return;

  // لاحقًا فعّل هذا:
  // try {
  //   const user = await meRequest(token);
  //
  //   set({
  //     user,
  //     loading: false,
  //   });
  // } catch (error) {
  //   console.error("Auth verification failed:", error);
  //
  //   set({
  //     token: null,
  //     user: null,
  //     loading: false,
  //   });
  // }
},

      logout: () =>
        set({
          token: null,
          user: null,
          loading: false,
        }),

      setHydrated: (value) =>
        set({
          hydrated: value,
        }),
    }),
    {
      name: "auth-storage",

      onRehydrateStorage: () => {
        return async (state) => {
          if (!state) {
            return;
          }

          state.setHydrated(true);

          //await state.checkAuth();
        };
      },
    }
  )
);