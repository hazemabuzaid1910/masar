import { api } from "~/shared/api/api.axios";

/* =========================
   Order Details Types
========================= */

export interface OrderDetailsUser {
  id: number;
  First_name: string;
  Last_name: string;
}

export interface OrderDetailsCourse {
  id: number;
  title: string;
  teacher_id: number;
}

export interface OrderDetailsItem {
  id: number;
  order_id: number;
  course_id: number;
  created_at: string;
  updated_at: string;
  course: OrderDetailsCourse;
}

export type OrderStatus = "pending" | "paid" | "failed";

export interface OrderDetails {
  id: number;
  type_of_payment: string;
  number_of_messages_payment: number;
  image_path: string;
  status: OrderStatus;
  user: OrderDetailsUser;
  items: OrderDetailsItem[];
  created_at: string;
}

/* =========================
   Get Order Details
========================= */

export const getOrderDetails = async (
  orderId: number
): Promise<OrderDetails> => {
  const response = await api.get<OrderDetails | string>(
    `/admin/dashboard/order/details/${orderId}`
  );

  let data: OrderDetails;

  if (typeof response.data === "string") {
    data = JSON.parse(response.data.replace(/^\uFEFF/, ""));
  } else {
    data = response.data;
  }

  console.log("Order Details API:", data);

  return data;
};