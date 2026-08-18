import React, { useMemo, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  BookOpen,
  UserPlus,
  MessageSquare,
  ClipboardList,
  AlertCircle,
  Trash2,
  MoreVertical,
  type LucideIcon,
} from "lucide-react";

import { useNotifications } from "~/hooks/useNotifications";
import type { Notification } from "~/routes/dashboard/notifications/api/notifications.api";

/* =====================================================
   TYPES
===================================================== */

type NotificationType =
  | "student"
  | "request"
  | "course"
  | "message"
  | "system";

type FilterType =
  | "all"
  | "unread"
  | "requests"
  | "courses";

interface NotificationConfig {
  icon: LucideIcon;
  iconClass: string;
}

interface FilterButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

interface FilterBadgeProps {
  children: React.ReactNode;
  active: boolean;
}

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: number) => void;
  onDelete: (id: number) => void;
}

/* =====================================================
   NOTIFICATION TYPES
===================================================== */

const notificationTypes: Record<
  NotificationType,
  NotificationConfig
> = {
  student: {
    icon: UserPlus,
    iconClass: "bg-[#F1E6F6] text-[#9227B3]",
  },

  request: {
    icon: ClipboardList,
    iconClass: "bg-[#FDE8F1] text-[#C42F82]",
  },

  course: {
    icon: BookOpen,
    iconClass: "bg-[#E5F6F8] text-[#32AEBA]",
  },

  message: {
    icon: MessageSquare,
    iconClass: "bg-[#EEEAFF] text-[#7768E9]",
  },

  system: {
    icon: AlertCircle,
    iconClass: "bg-[#FFF3DF] text-[#DC942A]",
  },
};

/* =====================================================
   MAIN COMPONENT
===================================================== */

export default function Notifications() {
  const {
    notifications,
    notificationsLoading,
    notificationsError,
    unreadNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    refetchNotifications,
  } = useNotifications();

  const [activeFilter, setActiveFilter] =
    useState<FilterType>("all");

  /* =====================================================
     UNREAD COUNT
  ===================================================== */

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  /* =====================================================
     FILTERED NOTIFICATIONS
  ===================================================== */

  const filteredNotifications = useMemo<Notification[]>(() => {
    switch (activeFilter) {
      case "unread":
        return notifications.filter(
          (notification) => notification.unread
        );

      case "requests":
        return notifications.filter(
          (notification) => notification.type === "request"
        );

      case "courses":
        return notifications.filter(
          (notification) => notification.type === "course"
        );

      case "all":
      default:
        return notifications;
    }
  }, [notifications, activeFilter]);

  /* =====================================================
     MARK AS READ
  ===================================================== */

  const markAsRead = async (id: number): Promise<void> => {
    await markNotificationAsRead(id);
    await refetchNotifications();
  };

  /* =====================================================
     MARK ALL AS READ
  ===================================================== */

  const markAllAsRead = async (): Promise<void> => {
    await markAllNotificationsAsRead();
    await refetchNotifications();
  };

  /* =====================================================
     DELETE NOTIFICATION
  ===================================================== */

  const deleteNotification = async (id: number): Promise<void> => {
    await markNotificationAsRead(id);
    await refetchNotifications();
  };

  if (notificationsLoading) {
    return (
      <div className="min-h-screen bg-[#F8F8F9] px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#EEEEEE] bg-white p-6 text-sm text-[#666]">
          Loading notifications...
        </div>
      </div>
    );
  }

  if (notificationsError) {
    return (
      <div className="min-h-screen bg-[#F8F8F9] px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {notificationsError}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F9] px-4 py-6 sm:px-6 lg:px-8">

      {/* ================= HEADER ================= */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#9227B3] text-white shadow-[0_7px_18px_rgba(146,39,179,0.18)]">
            <Bell size={22} />
          </div>

          <div>
            <h1 className="text-[25px] font-bold text-[#171717]">
              Notifications
            </h1>

            <p className="mt-1 text-sm text-[#858585]">
              Stay updated with the latest activities
            </p>
          </div>

        </div>

        <button
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="
            flex items-center justify-center gap-2
            rounded-[10px]
            bg-white
            px-4 py-3
            text-sm font-semibold
            text-[#9227B3]
            shadow-[0_3px_12px_rgba(0,0,0,0.05)]
            transition-all
            hover:bg-[#9227B3]
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <CheckCheck size={18} />
          Mark all as read
        </button>

      </div>

      {/* ================= STATS ================= */}

      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">

        {/* Total */}

        <div className="flex items-center gap-4 rounded-[14px] border border-[#EEEEEE] bg-white p-5">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3E8F7] text-[#9227B3]">
            <Bell size={20} />
          </div>

          <div>
            <p className="text-xs text-[#888]">
              Total notifications
            </p>

            <p className="mt-1 text-[22px] font-bold">
              {notifications.length}
            </p>
          </div>

        </div>

        {/* Unread */}

        <div className="flex items-center gap-4 rounded-[14px] border border-[#EEEEEE] bg-white p-5">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FDE8F2] text-[#C52E83]">
            <AlertCircle size={20} />
          </div>

          <div>
            <p className="text-xs text-[#888]">
              Unread notifications
            </p>

            <p className="mt-1 text-[22px] font-bold">
              {unreadCount}
            </p>
          </div>

        </div>

        {/* Read */}

        <div className="flex items-center gap-4 rounded-[14px] border border-[#EEEEEE] bg-white p-5">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E7F7F9] text-[#35AFBD]">
            <Check size={20} />
          </div>

          <div>
            <p className="text-xs text-[#888]">
              Read notifications
            </p>

            <p className="mt-1 text-[22px] font-bold">
              {notifications.length - unreadCount}
            </p>
          </div>

        </div>

      </div>

      {/* ================= MAIN ================= */}

      <div className="overflow-hidden rounded-2xl border border-[#EEEEEE] bg-white">

        {/* ================= TOOLBAR ================= */}

        <div className="flex min-h-17.5 items-center justify-between border-b border-[#EEEEEE] px-4 sm:px-6">

          <div className="flex gap-1 overflow-x-auto">

            <FilterButton
              active={activeFilter === "all"}
              onClick={() => setActiveFilter("all")}
            >
              All

              <FilterBadge active={activeFilter === "all"}>
                {notifications.length}
              </FilterBadge>
            </FilterButton>

            <FilterButton
              active={activeFilter === "unread"}
              onClick={() => setActiveFilter("unread")}
            >
              Unread

              <FilterBadge active={activeFilter === "unread"}>
                {unreadCount}
              </FilterBadge>
            </FilterButton>

            <FilterButton
              active={activeFilter === "requests"}
              onClick={() => setActiveFilter("requests")}
            >
              Requests
            </FilterButton>

            <FilterButton
              active={activeFilter === "courses"}
              onClick={() => setActiveFilter("courses")}
            >
              Courses
            </FilterButton>

          </div>

          <button
            type="button"
            aria-label="More options"
            className="
              ml-3 flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-lg
              text-[#777]
              transition
              hover:bg-[#F5F5F5]
            "
          >
            <MoreVertical size={20} />
          </button>

        </div>

        {/* ================= LIST ================= */}

        <div className="px-3 sm:px-5">

          {filteredNotifications.length === 0 ? (
            <EmptyState />
          ) : (
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={markAsRead}
                onDelete={deleteNotification}
              />
            ))
          )}

        </div>

        {/* ================= FOOTER ================= */}

        {filteredNotifications.length > 0 && (
          <div className="border-t border-[#EEEEEE] px-6 py-4 text-center text-xs text-[#999]">
            Showing {filteredNotifications.length} of{" "}
            {notifications.length} notifications
          </div>
        )}

      </div>
    </div>
  );
}

/* =====================================================
   FILTER BUTTON
===================================================== */

function FilterButton({
  children,
  active,
  onClick,
}: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex shrink-0 items-center gap-1.5
        rounded-lg
        px-4 py-2.5
        text-sm font-medium
        transition-all

        ${
          active
            ? "bg-[#9227B3] text-white"
            : "text-[#777] hover:bg-[#F8F0FA] hover:text-[#9227B3]"
        }
      `}
    >
      {children}
    </button>
  );
}

/* =====================================================
   FILTER BADGE
===================================================== */

function FilterBadge({
  children,
  active,
}: FilterBadgeProps) {
  return (
    <span
      className={`
        rounded-full px-1.5 py-0.5 text-[10px]

        ${
          active
            ? "bg-white/20 text-white"
            : "bg-[#F0F0F0] text-[#777]"
        }
      `}
    >
      {children}
    </span>
  );
}

/* =====================================================
   NOTIFICATION ITEM
===================================================== */

function NotificationItem({
  notification,
  onRead,
  onDelete,
}: NotificationItemProps) {
  const config = notificationTypes[notification.type];

  const Icon = config.icon;

  return (
    <div
      onClick={() => onRead(notification.id)}
      className={`
        group relative
        flex items-start gap-3
        border-b border-[#F0F0F0]
        px-2 py-4.5
        transition-all
        last:border-b-0

        ${
          notification.unread
            ? "bg-[#FCF8FD] hover:bg-[#F9F1FB]"
            : "hover:bg-[#FAF7FB]"
        }
      `}
    >

      {/* Unread Dot */}

      {notification.unread && (
        <span
          className="
            absolute left-0 top-1/2
            h-1.75 w-1.75
            -translate-y-1/2
            rounded-full
            bg-[#9227B3]
          "
        />
      )}

      {/* Icon */}

      <div
        className={`
          flex h-12 w-12
          shrink-0
          items-center justify-center
          rounded-[13px]
          ${config.iconClass}
        `}
      >
        <Icon size={21} />
      </div>

      {/* Content */}

      <div className="min-w-0 flex-1">

        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

          <h3
            className={`
              text-[15px] text-[#202020]

              ${
                notification.unread
                  ? "font-bold"
                  : "font-semibold"
              }
            `}
          >
            {notification.title}
          </h3>

          <span className="shrink-0 text-xs text-[#A0A0A0]">
            {notification.time}
          </span>

        </div>

        <p className="mt-1.5 max-w-190 text-[13px] leading-relaxed text-[#8A8A8A]">
          {notification.message}
        </p>

      </div>

      {/* Actions */}

      <div
        className="
          flex shrink-0
          items-center gap-1
          opacity-0
          transition-opacity
          group-hover:opacity-100
          max-sm:opacity-100
        "
      >

        {notification.unread && (
          <button
            type="button"
            title="Mark as read"
            aria-label="Mark as read"
            onClick={(event) => {
              event.stopPropagation();
              onRead(notification.id);
            }}
            className="
              flex h-8.5 w-8.5
              items-center justify-center
              rounded-lg
              bg-[#F0E4F4]
              text-[#9227B3]
              transition
              hover:bg-[#9227B3]
              hover:text-white
            "
          >
            <Check size={17} />
          </button>
        )}

        <button
          type="button"
          title="Delete"
          aria-label="Delete notification"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(notification.id);
          }}
          className="
            flex h-8.5 w-8.5
            items-center justify-center
            rounded-lg
            bg-[#FFF0F1]
            text-[#FF5C66]
            transition
            hover:bg-[#FF5C66]
            hover:text-white
          "
        >
          <Trash2 size={17} />
        </button>

      </div>

    </div>
  );
}

/* =====================================================
   EMPTY STATE
===================================================== */

function EmptyState() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center text-center">

      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5EAFA] text-[#9227B3]">
        <Bell size={28} />
      </div>

      <h3 className="text-[17px] font-semibold text-[#202020]">
        No notifications
      </h3>

      <p className="mt-1 max-w-sm text-[13px] text-[#999]">
        You're all caught up. There are no notifications here.
      </p>

    </div>
  );
}