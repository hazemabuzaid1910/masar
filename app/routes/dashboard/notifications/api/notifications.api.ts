import { api } from "~/shared/api/api.axios";

/* =========================
   Types
========================= */

export type NotificationType =
  | "student"
  | "request"
  | "course"
  | "message"
  | "system";

interface BackendNotification {
  id: number;
  user_id: number;
  user_type: string;
  type: string;
  data: {
    course_title?: string;
    section_name?: string;
    content?: string;
    order_id?: number;
    [key: string]: unknown;
  };
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

interface NotificationsPaginationResponse {
  current_page: number;
  data: BackendNotification[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  created_at?: string;
  read_at?: string | null;

  // نحتفظ ببيانات الباكند إذا احتجناها لاحقًا
  user_id?: number;
  user_type?: string;
  backend_type?: string;
  data?: Record<string, unknown>;

  [key: string]: unknown;
}

export interface NotificationsApiResponse {
  message?: string;
}

/* =========================
   Helpers
========================= */

const normalizeNotificationType = (
  value?: string | null
): NotificationType => {
  const type = value?.toLowerCase();

  switch (type) {
    case "new_course":
    case "course":
      return "course";

    case "new_order":
    case "order":
    case "request":
      return "request";

    case "message":
      return "message";

    case "system":
      return "system";

    default:
      return "student";
  }
};

/* =========================
   Normalize Notification
========================= */

const normalizeNotification = (
  item: BackendNotification
): Notification => {
  const data = item.data ?? {};

  let title = "New notification";
  let message = "";

  switch (item.type) {
    /* =========================
       New Course
    ========================= */

    case "new_course":
      title = "New Course";

      message = data.course_title
        ? `A new course "${data.course_title}" has been added${
            data.section_name
              ? ` in section ${data.section_name}`
              : ""
          }.`
        : "A new course has been added.";

      break;

    /* =========================
       New Order
    ========================= */

    case "new_order":
      title = "New Order";

      message =
        typeof data.content === "string"
          ? data.content
          : "A new order has been created.";

      break;

    /* =========================
       Default
    ========================= */

    default:
      title =
        typeof data.title === "string"
          ? data.title
          : item.type || "Notification";

      message =
        typeof data.content === "string"
          ? data.content
          : typeof data.message === "string"
            ? data.message
            : "";
  }

  return {
    id: item.id,

    type: normalizeNotificationType(
      item.type
    ),

    title,

    message,

    time: item.created_at,

    unread: !item.is_read,

    created_at: item.created_at,

    read_at: item.is_read
      ? item.updated_at
      : null,

    user_id: item.user_id,

    user_type: item.user_type,

    backend_type: item.type,

    data,
  };
};

/* =========================
   Parse Response
========================= */

const unwrapData = <T>(
  payload: T | string | null | undefined
): T | null => {
  if (typeof payload === "string") {
    try {
      return JSON.parse(
        payload.replace(/^\uFEFF/, "")
      ) as T;
    } catch (error) {
      console.error(
        "Failed to parse API response:",
        error
      );

      return null;
    }
  }

  return payload ?? null;
};

/* =========================
   Normalize List
========================= */

const normalizeNotificationsList = (
  payload: unknown
): Notification[] => {
  if (!payload) {
    return [];
  }

  /*
   * Backend response:
   *
   * {
   *   current_page: 1,
   *   data: [...]
   * }
   */

  if (
    typeof payload === "object" &&
    !Array.isArray(payload)
  ) {
    const response =
      payload as Partial<NotificationsPaginationResponse>;

    if (Array.isArray(response.data)) {
      return response.data.map(
        normalizeNotification
      );
    }
  }

  /*
   * In case backend returns
   * the array directly.
   */

  if (Array.isArray(payload)) {
    return payload
      .filter(
        (
          item
        ): item is BackendNotification =>
          typeof item === "object" &&
          item !== null
      )
      .map(normalizeNotification);
  }

  return [];
};

/* =========================
   Get All Notifications
========================= */

export const getNotifications =
  async (): Promise<Notification[]> => {
    const response =
      await api.get<
        NotificationsPaginationResponse | string
      >("/notifications");

    const payload = unwrapData(
      response.data
    );

    const notifications =
      normalizeNotificationsList(payload);

    console.log(
      "Notifications API:",
      notifications
    );

    return notifications;
  };

/* =========================
   Get Notification By ID
========================= */

export const getNotificationById = async (
  notificationId: number
): Promise<Notification> => {
  const response =
    await api.get<
      BackendNotification | string
    >(
      `/notifications/${notificationId}`
    );

  const payload = unwrapData(
    response.data
  );

  if (
    payload &&
    typeof payload === "object" &&
    !Array.isArray(payload)
  ) {
    return normalizeNotification(
      payload as BackendNotification
    );
  }

  throw new Error(
    "Notification not found"
  );
};

/* =========================
   Get Unread Notifications
========================= */

export const getUnreadNotifications =
  async (): Promise<Notification[]> => {
    const response =
      await api.get<
        NotificationsPaginationResponse | string
      >("/notifications/unread");

    const payload = unwrapData(
      response.data
    );

    const notifications =
      normalizeNotificationsList(payload);

    console.log(
      "Unread Notifications API:",
      notifications
    );

    return notifications;
  };

/* =========================
   Read All Notifications
========================= */

export const readAllNotifications =
  async (): Promise<NotificationsApiResponse> => {
    const response =
      await api.post<
        NotificationsApiResponse | string
      >(
        "/notifications/read-all"
      );

    const payload = unwrapData(
      response.data
    );

    if (
      payload &&
      typeof payload === "object"
    ) {
      return payload as NotificationsApiResponse;
    }

    return {};
  };

/* =========================
   Read Notification
========================= */

export const readNotification = async (
  notificationId: number
): Promise<NotificationsApiResponse> => {
  const response =
    await api.post<
      NotificationsApiResponse | string
    >(
      `/notifications/${notificationId}/read`
    );

  const payload = unwrapData(
    response.data
  );

  if (
    payload &&
    typeof payload === "object"
  ) {
    return payload as NotificationsApiResponse;
  }

  return {};
};