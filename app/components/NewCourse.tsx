import { Icon } from "@iconify/react";
import { Link } from "react-router";
import type { Course } from "~/store/home.store";

interface NewCourseProps {
  course: Course | null;
}

function NewCourse({ course }: NewCourseProps) {
  if (!course) {
    return null;
  }

  return (
    <div className="bg-[#8E24AA] p-4 rounded-lg text-white flex flex-col gap-4">
      
      <div className="flex items-center justify-between">
        <span className="text-yellow-400 font-semibold text-base">
          NEW
        </span>

        <Link
          to={`/courses/${course.id}`}
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
        >
          <Icon
            icon="mdi:arrow-top-right"
            color="#3b3b3b"
          />
        </Link>
      </div>

      <div>
        <h2 className="text-lg font-semibold">
          {course.title}
        </h2>

        <p className="text-gray-300 text-base">
          {course.description}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          <img
            src={
              
              "/images/person.avif"
            }
            alt="Teacher"
            className="w-5 h-5 rounded-full border-2 border-white object-cover"
          />

          <img
            src="/images/person.avif"
            alt="Student"
            className="w-5 h-5 rounded-full border-2 border-white object-cover"
          />

          <img
            src="/images/person.avif"
            alt="Student"
            className="w-5 h-5 rounded-full border-2 border-white object-cover"
          />
        </div>

        <span className="text-xs text-gray-200">
          +{course.Number_of_students} students
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Icon
            icon="formkit:time"
            color="#fff"
          />

          <span className="text-gray-200 text-sm">
            4h 30min
          </span>
        </div>

        <div>
          <span className="text-gray-200 text-sm">
            24 lectures
          </span>
        </div>
      </div>

    </div>
  );
}

export default NewCourse;