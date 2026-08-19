import { useEffect } from "react";
import { useOrderDetailsStore } from "~/store/order_detailes.store";

export const useOrderDetails = (
  orderId: number
) => {
  const {
    order,
    isLoading,
    error,
    fetchOrderDetails,
    clearOrderDetails,
  } = useOrderDetailsStore();

  useEffect(() => {
    if (!orderId) return;

    fetchOrderDetails(orderId);

    return () => {
      clearOrderDetails();
    };
  }, [
    orderId,
    fetchOrderDetails,
    clearOrderDetails,
  ]);

  return {
    order,
    isLoading,
    error,
    refetch: () =>
      fetchOrderDetails(orderId),
  };
};