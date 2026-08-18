import { useEffect } from "react";
import { useNotificationsStore } from "~/store/notifications.store";

export const useNotifications = () => {
  const notifications = useNotificationsStore(
    (state) => state.notifications
  );

  const notificationsLoading = useNotificationsStore(
    (state) => state.notificationsLoading
  );

  const notificationsError = useNotificationsStore(
    (state) => state.notificationsError
  );

  const unreadNotifications = useNotificationsStore(
    (state) => state.unreadNotifications
  );

  const unreadNotificationsLoading = useNotificationsStore(
    (state) => state.unreadNotificationsLoading
  );

  const unreadNotificationsError = useNotificationsStore(
    (state) => state.unreadNotificationsError
  );

  const fetchNotifications = useNotificationsStore(
    (state) => state.fetchNotifications
  );

  const fetchUnreadNotifications = useNotificationsStore(
    (state) => state.fetchUnreadNotifications
  );

  const fetchNotificationById = useNotificationsStore(
    (state) => state.fetchNotificationById
  );

  const markNotificationAsRead = useNotificationsStore(
    (state) => state.markNotificationAsRead
  );

  const markAllNotificationsAsRead = useNotificationsStore(
    (state) => state.markAllNotificationsAsRead
  );

  useEffect(() => {
    fetchNotifications();
    fetchUnreadNotifications();
  }, [fetchNotifications, fetchUnreadNotifications]);

  return {
    notifications,
    notificationsLoading,
    notificationsError,
    refetchNotifications: fetchNotifications,

    unreadNotifications,
    unreadNotificationsLoading,
    unreadNotificationsError,
    refetchUnreadNotifications: fetchUnreadNotifications,

    fetchNotificationById,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  };
};
