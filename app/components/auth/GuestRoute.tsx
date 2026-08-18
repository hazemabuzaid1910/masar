import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "~/store/auth.store";

export default function GuestRoute() {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();

  if (token) {
    const from = location.state?.from?.pathname || "/";

    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}