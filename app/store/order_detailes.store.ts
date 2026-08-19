import { create } from "zustand";
import {
  getOrderDetails,
  type OrderDetails,
} from "../routes/dashboard/order_detailes/api/order_detailrs.api";

interface OrderDetailsState {
  order: OrderDetails | null;
  isLoading: boolean;
  error: string | null;

  fetchOrderDetails: (orderId: number) => Promise<void>;
  clearOrderDetails: () => void;
}

export const useOrderDetailsStore =
  create<OrderDetailsState>((set) => ({
    order: null,
    isLoading: false,
    error: null,

    fetchOrderDetails: async (orderId: number) => {
      try {
        set({
          isLoading: true,
          error: null,
        });

        const order =
          await getOrderDetails(orderId);

        set({
          order,
          isLoading: false,
        });
      } catch (error) {
        set({
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to fetch order details",
        });
      }
    },

    clearOrderDetails: () =>
      set({
        order: null,
        error: null,
      }),
  }));