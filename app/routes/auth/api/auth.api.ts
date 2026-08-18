import { api } from "../../../shared/api/api.axios";

export const loginRequest = async (
  email: string,
  password: string,
  fcmToken: string | null
) => {
  const formData = new FormData();

  formData.append("email", email);
  formData.append("password", password);

  if (fcmToken) {
    formData.append("fcm_token", fcmToken);
  }

  const response = await api.post(
    "/admin/login",
    formData
  );

  const cleanData = response.data.replace(/^\uFEFF/, "");

  return JSON.parse(cleanData);
};

export const meRequest = async (token?: string) => {
  const response = await api.get("/me", {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
  });

  return response.data;
};