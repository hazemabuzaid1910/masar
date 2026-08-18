import { create } from "zustand";

import {
  getNotificationById,
  getNotifications,
  getUnreadNotifications,
  readAllNotifications,
  readNotification,
  type Notification,
} from "~/routes/dashboard/notifications/api/notifications.api";

interface NotificationsState {
  notifications: Notification[];
  notificationsLoading: boolean;
  notificationsError: string | null;

  unreadNotifications: Notification[];
  unreadNotificationsLoading: boolean;
  unreadNotificationsError: string | null;

  fetchNotifications: () => Promise<void>;
  fetchUnreadNotifications: () => Promise<void>;
  fetchNotificationById: (
    notificationId: number
  ) => Promise<Notification | null>;

  markNotificationAsRead: (
    notificationId: number
  ) => Promise<boolean>;
  markAllNotificationsAsRead: () => Promise<boolean>;

  clearNotificationsError: () => void;
  clearUnreadNotificationsError: () => void;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: [],
  notificationsLoading: false,
  notificationsError: null,

  unreadNotifications: [],
  unreadNotificationsLoading: false,
  unreadNotificationsError: null,

  fetchNotifications: async () => {
    try {
      set({
        notificationsLoading: true,
        notificationsError: null,
      });

      const data = await getNotifications();

      set({
        notifications: data,
        notificationsLoading: false,
      });
    } catch (error) {
      console.error("Notifications error:", error);

      set({
        notifications: [],
        notificationsLoading: false,
        notificationsError:
          error instanceof Error
            ? error.message
            : "Failed to fetch notifications",
      });
    }
  },

  fetchUnreadNotifications: async () => {
    try {
      set({
        unreadNotificationsLoading: true,
        unreadNotificationsError: null,
      });

      const data = await getUnreadNotifications();

      set({
        unreadNotifications: data,
        unreadNotificationsLoading: false,
      });
    } catch (error) {
      console.error("Unread notifications error:", error);

      set({
        unreadNotifications: [],
        unreadNotificationsLoading: false,
        unreadNotificationsError:
          error instanceof Error
            ? error.message
            : "Failed to fetch unread notifications",
      });
    }
  },

  fetchNotificationById: async (notificationId) => {
    try {
      const data = await getNotificationById(notificationId);

      return data;
    } catch (error) {
      console.error("Single notification error:", error);
      return null;
    }
  },

  markNotificationAsRead: async (notificationId) => {
    try {
      const response = await readNotification(notificationId);
      console.log("Read notification:", response.message ?? "success");

      set((state) => ({
        notifications: state.notifications.map((item) =>
          item.id === notificationId
            ? { ...item, unread: false, read_at: new Date().toISOString() }
            : item
        ),
        unreadNotifications: state.unreadNotifications.filter(
          (item) => item.id !== notificationId
        ),
      }));

      return true;
    } catch (error) {
      console.error("Read notification error:", error);
      return false;
    }
  },

  markAllNotificationsAsRead: async () => {
    try {
      const response = await readAllNotifications();
      console.log("Read all notifications:", response.message ?? "success");

      set((state) => ({
        notifications: state.notifications.map((item) => ({
          ...item,
          unread: false,
          read_at: new Date().toISOString(),
        })),
        unreadNotifications: [],
      }));

      return true;
    } catch (error) {
      console.error("Read all notifications error:", error);
      return false;
    }
  },

  clearNotificationsError: () => {
    set({ notificationsError: null });
  },

  clearUnreadNotificationsError: () => {
    set({ unreadNotificationsError: null });
  },
}));
