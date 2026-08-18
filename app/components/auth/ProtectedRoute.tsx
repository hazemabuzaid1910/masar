// components/ProtectedRoute.tsx

import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "~/store/auth.store";

export default function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to="/auth"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}