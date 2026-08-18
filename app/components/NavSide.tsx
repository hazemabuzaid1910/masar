import { Icon } from "@iconify/react";
import { useState } from "react";
import { NavLink } from "react-router";
import type { JSX } from "react/jsx-runtime";

interface NavSideProps {
  onLogout: () => void;
}

function NavSide({ onLogout }: NavSideProps) {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`${
        open ? "w-64" : "w-25"
      } transition-all duration-300 bg-white flex pt-10 flex-col items-center h-screen px-5`}
    >
      <div
        className={`flex items-center gap-2 w-full ${
          open ? "justify-between" : "justify-center"
        }`}
      >
        <div
          className={`flex items-center gap-2 ${
            open
              ? "opacity-100"
              : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          <img
            src="/images/Untitled-1.png"
            className="font-bold text-2xl transition-all duration-300"
            width={45}
          />

          <h1 className="text-xl font-semibold">
            MASAR
          </h1>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-neutral-100"
        >
          <Icon
            icon="solar:siderbar-outline"
            width={22}
          />
        </button>
      </div>

      <div className="w-full">
        <nav>
          <ul className="mt-15 gap-5 flex flex-col">
            <NavItem
              title="Home"
              icon="mynaui:home"
              to="/"
              open={open}
            />

            <NavItem
              title="Courses"
              icon="solar:library-outline"
              to="courses"
              open={open}
            />

            <NavItem
              title="Students"
              icon="octicon:people-24"
              to="students"
              open={open}
            />

            <NavItem
              title="Mentors"
              icon="fluent-mdl2:publish-course"
              to="mentors"
              open={open}
            />

            <NavItem
              title="Revenue"
              icon="streamline-ultimate:cash-payment-bills"
              to="revenue"
              open={open}
            />

            <NavItem
              title="Orders"
              icon="ep:message"
              to="orders"
              open={open}
            />

            <NavItem
              title="Notifications"
              icon="mynaui:notification-solid"
              to="notifications"
              open={open}
            />

         
          </ul>
        </nav>
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={onLogout}
        className={`
          mt-auto mb-5 flex items-center text-white rounded-lg
          bg-red-400 hover:bg-red-500 transition-all duration-300
          ${
            open
              ? "w-full justify-center gap-4 px-4 py-2"
              : "w-12 h-12 justify-center p-0 mx-auto"
          }
        `}
      >
        <Icon
          icon="solar:logout-2-broken"
          width={20}
          height={20}
        />

        {open && <p>Logout</p>}
      </button>
    </div>
  );
}

export default NavSide;

export function NavItem({
  title,
  icon,
  to,
  open,
}: {
  title: string;
  icon: string;
  to: string;
  open: boolean;
}): JSX.Element {
  return (
    <li className="rounded-xl overflow-hidden">
      <NavLink
        to={to}
        end={false}
        className={({ isActive }) =>
          `
          flex items-center
          ${open ? "justify-start px-4" : "justify-center"}
          py-3 gap-2 w-full
          ${
            isActive
              ? "bg-[#8E24AA] text-white"
              : "hover:bg-neutral-100"
          }
        `
        }
      >
        <Icon icon={icon} width={20} />

        {open && (
          <span className="font-medium text-sm">
            {title}
          </span>
        )}
      </NavLink>
    </li>
  );
}