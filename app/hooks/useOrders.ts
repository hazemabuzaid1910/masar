import { useEffect } from "react";
import { useOrdersStore } from "~/store/order.store";

export const useOrders = () => {
  const orders = useOrdersStore(
    (state) => state.orders
  );

  const ordersLoading = useOrdersStore(
    (state) => state.ordersLoading
  );

  const ordersError = useOrdersStore(
    (state) => state.ordersError
  );

  const pendingCourses = useOrdersStore(
    (state) => state.pendingCourses
  );

  const coursesLoading = useOrdersStore(
    (state) => state.coursesLoading
  );

  const coursesError = useOrdersStore(
    (state) => state.coursesError
  );

  /* =========================
     Publish
  ========================= */

  const publishingCourseId = useOrdersStore(
    (state) => state.publishingCourseId
  );

  const publishCourseError = useOrdersStore(
    (state) => state.publishCourseError
  );

  const publishPendingCourse =
    useOrdersStore(
      (state) =>
        state.publishPendingCourse
    );

  /* =========================
     Reject
  ========================= */

  const rejectingCourseId = useOrdersStore(
    (state) => state.rejectingCourseId
  );

  const rejectCourseError = useOrdersStore(
    (state) => state.rejectCourseError
  );

  const rejectPendingCourse =
    useOrdersStore(
      (state) =>
        state.rejectPendingCourse
    );

  /* =========================
     Mark Order As Paid
  ========================= */

  const markingOrderId = useOrdersStore(
    (state) => state.markingOrderId
  );

  const markOrderAsPaidError = useOrdersStore(
    (state) => state.markOrderAsPaidError
  );

  const markOrderAsPaid = useOrdersStore(
    (state) => state.markOrderAsPaid
  );

  /* =========================
     Mark Order As Failed
  ========================= */

  const failingOrderId = useOrdersStore(
    (state) => state.failingOrderId
  );

  const markOrderAsFailedError = useOrdersStore(
    (state) => state.markOrderAsFailedError
  );

  const markOrderAsFailed = useOrdersStore(
    (state) => state.markOrderAsFailed
  );

  /* =========================
     Fetch
  ========================= */

  const fetchOrders = useOrdersStore(
    (state) => state.fetchOrders
  );

  const fetchPendingCourses =
    useOrdersStore(
      (state) => state.fetchPendingCourses
    );

  useEffect(() => {
    fetchOrders();
    fetchPendingCourses();
  }, [
    fetchOrders,
    fetchPendingCourses,
  ]);

  return {
    /* =========================
       Orders
    ========================= */

    orders,
    ordersLoading,
    ordersError,
    refetchOrders: fetchOrders,

    /* =========================
       Pending Courses
    ========================= */

    pendingCourses,
    coursesLoading,
    coursesError,
    refetchPendingCourses:
      fetchPendingCourses,

    /* =========================
       Publish Course
    ========================= */

    publishPendingCourse,
    publishingCourseId,
    publishCourseError,

    /* =========================
       Reject Course
    ========================= */

    rejectPendingCourse,
    rejectingCourseId,
    rejectCourseError,

    /* =========================
       Mark Order As Paid
    ========================= */

    markOrderAsPaid,
    markingOrderId,
    markOrderAsPaidError,

    /* =========================
       Mark Order As Failed
    ========================= */

    markOrderAsFailed,
    failingOrderId,
    markOrderAsFailedError,
  };
};