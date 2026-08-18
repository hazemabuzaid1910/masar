import { create } from "zustand";

import {
  getOrders,
  getPendingCourses,
  markOrderAsFailed as apiMarkOrderAsFailed,
  markOrderAsPaid as apiMarkOrderAsPaid,
  publishCourse,
  rejectCourse,
  type Order,
  type PendingCourse,
} from "~/routes/dashboard/orders/api/orders.api";

interface OrdersState {
  /* =========================
     Orders
  ========================= */

  orders: Order[];
  ordersLoading: boolean;
  ordersError: string | null;

  /* =========================
     Pending Courses
  ========================= */

  pendingCourses: PendingCourse[];
  coursesLoading: boolean;
  coursesError: string | null;

  /* =========================
     Publish Course
  ========================= */

  publishingCourseId: number | null;
  publishCourseError: string | null;

  /* =========================
     Reject Course
  ========================= */

  rejectingCourseId: number | null;
  rejectCourseError: string | null;

  /* =========================
     Mark Order As Paid
  ========================= */

  markingOrderId: number | null;
  markOrderAsPaidError: string | null;

  /* =========================
     Mark Order As Failed
  ========================= */

  failingOrderId: number | null;
  markOrderAsFailedError: string | null;

  /* =========================
     Actions
  ========================= */

  fetchOrders: () => Promise<void>;

  fetchPendingCourses: () => Promise<void>;

  publishPendingCourse: (
    courseId: number
  ) => Promise<boolean>;

  rejectPendingCourse: (
    courseId: number
  ) => Promise<boolean>;

  markOrderAsPaid: (
    orderId: number
  ) => Promise<boolean>;

  markOrderAsFailed: (
    orderId: number
  ) => Promise<boolean>;

  clearOrdersError: () => void;

  clearCoursesError: () => void;

  clearPublishCourseError: () => void;

  clearRejectCourseError: () => void;

  clearMarkOrderAsPaidError: () => void;

  clearMarkOrderAsFailedError: () => void;
}

export const useOrdersStore =
  create<OrdersState>((set) => ({
    /* =========================
       Initial Orders State
    ========================= */

    orders: [],
    ordersLoading: false,
    ordersError: null,

    /* =========================
       Initial Courses State
    ========================= */

    pendingCourses: [],
    coursesLoading: false,
    coursesError: null,

    /* =========================
       Publish State
    ========================= */

    publishingCourseId: null,
    publishCourseError: null,

    /* =========================
       Reject State
    ========================= */

    rejectingCourseId: null,
    rejectCourseError: null,

    /* =========================
       Mark Order As Paid State
    ========================= */

    markingOrderId: null,
    markOrderAsPaidError: null,

    /* =========================
       Mark Order As Failed State
    ========================= */

    failingOrderId: null,
    markOrderAsFailedError: null,

    /* =========================
       Fetch Orders
    ========================= */

    fetchOrders: async () => {
      try {
        set({
          ordersLoading: true,
          ordersError: null,
        });

        const data = await getOrders();

        set({
          orders: data,
          ordersLoading: false,
        });
      } catch (error) {
        console.error("Orders error:", error);

        set({
          orders: [],
          ordersLoading: false,
          ordersError:
            error instanceof Error
              ? error.message
              : "Failed to fetch orders",
        });
      }
    },

    /* =========================
       Fetch Pending Courses
    ========================= */

    fetchPendingCourses: async () => {
      try {
        set({
          coursesLoading: true,
          coursesError: null,
        });

        const data = await getPendingCourses();

        set({
          pendingCourses: data,
          coursesLoading: false,
        });
      } catch (error) {
        console.error(
          "Pending courses error:",
          error
        );

        set({
          pendingCourses: [],
          coursesLoading: false,
          coursesError:
            error instanceof Error
              ? error.message
              : "Failed to fetch pending courses",
        });
      }
    },

    /* =========================
       Publish Course
    ========================= */

    publishPendingCourse: async (courseId) => {
      try {
        set({
          publishingCourseId: courseId,
          publishCourseError: null,
        });

        const response =
          await publishCourse(courseId);

        console.log(
          "Publish course:",
          response.message
        );

        /*
         * Remove course immediately
         * from pending courses.
         */
        set((state) => ({
          pendingCourses:
            state.pendingCourses.filter(
              (course) =>
                course.id !== courseId
            ),
          publishingCourseId: null,
        }));

        /*
         * Sync with backend.
         */
        const data =
          await getPendingCourses();

        set({
          pendingCourses: data,
        });

        return true;
      } catch (error) {
        console.error(
          "Publish course error:",
          error
        );

        set({
          publishingCourseId: null,
          publishCourseError:
            error instanceof Error
              ? error.message
              : "Failed to publish course",
        });

        return false;
      }
    },

    /* =========================
       Reject Course
    ========================= */

    rejectPendingCourse: async (courseId) => {
      try {
        set({
          rejectingCourseId: courseId,
          rejectCourseError: null,
        });

        const response =
          await rejectCourse(courseId);

        console.log(
          "Reject course:",
          response.message
        );

        /*
         * Remove course immediately
         * from pending courses.
         */
        set((state) => ({
          pendingCourses:
            state.pendingCourses.filter(
              (course) =>
                course.id !== courseId
            ),
          rejectingCourseId: null,
        }));

        /*
         * Sync with backend.
         */
        const data =
          await getPendingCourses();

        set({
          pendingCourses: data,
        });

        return true;
      } catch (error) {
        console.error(
          "Reject course error:",
          error
        );

        set({
          rejectingCourseId: null,
          rejectCourseError:
            error instanceof Error
              ? error.message
              : "Failed to reject course",
        });

        return false;
      }
    },

    /* =========================
       Mark Order As Paid
    ========================= */

    markOrderAsPaid: async (orderId) => {
      try {
        set({
          markingOrderId: orderId,
          markOrderAsPaidError: null,
        });

        const response =
          await apiMarkOrderAsPaid(orderId);

        console.log(
          "Mark order as paid:",
          response.message
        );

        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId
              ? { ...order, status: "paid" }
              : order
          ),
          markingOrderId: null,
        }));

        return true;
      } catch (error) {
        console.error(
          "Mark order as paid error:",
          error
        );

        set({
          markingOrderId: null,
          markOrderAsPaidError:
            error instanceof Error
              ? error.message
              : "Failed to mark order as paid",
        });

        return false;
      }
    },

    /* =========================
       Mark Order As Failed
    ========================= */

    markOrderAsFailed: async (orderId) => {
      try {
        set({
          failingOrderId: orderId,
          markOrderAsFailedError: null,
        });

        const response =
          await apiMarkOrderAsFailed(orderId);

        console.log(
          "Mark order as failed:",
          response.message
        );

        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId
              ? { ...order, status: "failed" }
              : order
          ),
          failingOrderId: null,
        }));

        return true;
      } catch (error) {
        console.error(
          "Mark order as failed error:",
          error
        );

        set({
          failingOrderId: null,
          markOrderAsFailedError:
            error instanceof Error
              ? error.message
              : "Failed to mark order as failed",
        });

        return false;
      }
    },

    /* =========================
       Clear Errors
    ========================= */

    clearOrdersError: () => {
      set({
        ordersError: null,
      });
    },

    clearCoursesError: () => {
      set({
        coursesError: null,
      });
    },

    clearPublishCourseError: () => {
      set({
        publishCourseError: null,
      });
    },

    clearRejectCourseError: () => {
      set({
        rejectCourseError: null,
      });
    },

    clearMarkOrderAsPaidError: () => {
      set({
        markOrderAsPaidError: null,
      });
    },

    clearMarkOrderAsFailedError: () => {
      set({
        markOrderAsFailedError: null,
      });
    },
  }));