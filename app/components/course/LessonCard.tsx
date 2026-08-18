import { Icon } from "@iconify/react";
import React from "react";
import type { LessonCardProps } from "~/types/Course";

function LessonCard({ lesson, active }:LessonCardProps) {
  return (
    <div
      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200
        ${
          active
            ? "bg-[#fbeeff] border-[#8E24AA]"
            : "bg-white border-gray-200 hover:border-blue-300 hover:bg-gray-50"
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
          ${
            active
              ? "bg-[#8E24AA] text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
         <Icon icon="solar:play-broken"/>
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-sm text-gray-800">
          {lesson.title}
          </h3>

          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>{lesson.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonCard;