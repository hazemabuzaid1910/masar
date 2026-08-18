import LoginForm from "~/components/auth/LoginForm";
import AuthLayout from "~/shared/layouts/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}