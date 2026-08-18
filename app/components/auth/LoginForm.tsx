import { Link } from "react-router";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useLogin();

const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  setError("");
  setLoading(true);

  try {
    await login(
      email,
      password,
    );
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        Welcome back
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Sign in to your account to continue.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-sm font-medium text-slate-700"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="you@company.com"
            className="
              h-11 rounded-lg border border-slate-200
              px-3.5 text-sm text-slate-900
              outline-none transition-colors
              placeholder:text-slate-400
              focus:border-[#8E24AA]
              focus:ring-4
              focus:ring-[#8E24AA]/10
            "
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <Link
              to="#"
              className="
                text-xs font-medium
                text-[#8E24AA]
                transition
                hover:text-[#6A1B86]
              "
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <input
              id="password"
              required
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              className="
                h-11 w-full rounded-lg
                border border-slate-200
                px-3.5 pr-11
                text-sm text-slate-900
                outline-none
                transition-colors
                placeholder:text-slate-400
                focus:border-[#8E24AA]
                focus:ring-4
                focus:ring-[#8E24AA]/10
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="
                absolute right-3 top-1/2
                -translate-y-1/2
                text-slate-400
                transition
                hover:text-slate-600
              "
            >
              <Icon
                icon={
                  showPassword
                    ? "mdi:eye-outline"
                    : "mdi:eye-off-outline"
                }
                className="text-lg"
              />
            </button>
          </div>
        </div>

      {error && (
    <div
      className="
        rounded-lg
        border border-red-200
        bg-red-50
        px-3 py-2
        text-sm text-red-600
      "
    >
      {error}
    </div>
  )}    

        <button
          type="submit"
          disabled={loading}
          className="
            mt-1 h-11 rounded-lg
            bg-[#8E24AA]
            text-sm font-semibold
            text-white shadow-sm
            transition-all
            hover:bg-[#7B1FA2]
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <p className="mt-8 text-center text-xs text-slate-400">
        Protected access · Contact your administrator for an account
      </p>
    </div>
  );
}
