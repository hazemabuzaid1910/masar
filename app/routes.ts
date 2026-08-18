import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("components/auth/ProtectedRoute.tsx", [
    layout("routes/layout.tsx", [
      index("routes/dashboard/home/layout.home.tsx"),

      route("courses", "routes/dashboard/courses/layout.courses.tsx"),
      route("courses/:id", "routes/dashboard/course/layout.course.tsx"),

      route("students", "routes/dashboard/students/layout.students.tsx"),
      route("mentors", "routes/dashboard/mentors/layout.mentors.tsx"),
      route("revenue", "routes/dashboard/revenue/layout.revenue.tsx"),   
       route("orders", "routes/dashboard/orders/layout.orders.tsx"),
        route("notifications", "routes/dashboard/notifications/layout.notifications.tsx"),

    ]),
  ]),

  layout("components/auth/GuestRoute.tsx", [
    route("auth", "routes/auth/login.tsx"),
  ]),
] satisfies RouteConfig;