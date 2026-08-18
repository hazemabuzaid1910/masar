import axios from "axios";
import { useNavigate } from "react-router";
import { getFcmToken } from "~/lib/firebase/messaging";
import {
  loginRequest,
  meRequest,
} from "~/routes/auth/api/auth.api";
import { useAuthStore } from "~/store/auth.store";

export function useLogin() {
  const navigate = useNavigate();

  const setAuth = useAuthStore(
    (state) => state.setAuth
  );

  const login = async (
    email: string,
    password: string
  ) => {
    try {
      const fcmToken = await getFcmToken();

      const data = await loginRequest(
        email,
        password,
        fcmToken
      );

      if (!data?.token) {
        throw new Error(
          "Token was not returned"
        );
      }

      // نتحقق من التوكن الجديد مع السيرفر
      //const user = await meRequest(data.token);

      // بعد نجاح التحقق نحفظ التوكن والمستخدم
      setAuth(data.token);

      navigate("/", {
        replace: true,
      });

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        switch (status) {
          case 400:
            throw new Error(
              error.response?.data?.message ||
                "Invalid data submitted"
            );

          case 401:
            throw new Error(
              "Invalid email or password"
            );

          case 403:
            throw new Error(
              "You do not have permission to access this account"
            );

          case 500:
            throw new Error(
              "Server error. Please try again later"
            );

          default:
            if (!error.response) {
              throw new Error(
                "Network error. Check your internet connection"
              );
            }

            throw new Error(
              "Something went wrong"
            );
        }
      }

      throw new Error(
        "Unexpected error occurred"
      );
    }
  };

  return { login };
}