import React from "react";
import { useParams } from "react-router";

import LessonCard from "~/components/course/LessonCard";
import { useCourse } from "~/hooks/useCourse";

function Course() {
  const { id } = useParams();

  const {
    course,
    loading,
    error,
  } = useCourse(Number(id));

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <p className="text-gray-500">
          Loading course...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <p className="text-red-500">
          {error}
        </p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <p className="text-gray-500">
          Course not found
        </p>
      </div>
    );
  }

  // تحويل الثواني إلى MM:SS
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  // مجموع مدة جميع الدروس
  const totalDuration = course.lessons.reduce(
    (total, lesson) => total + lesson.duration,
    0
  );

  return (
    <div className="grid grid-cols-12 min-h-screen bg-neutral-100 gap-6">

      {/* Main Content */}
      <div className="col-span-9 p-6">

        <div className="bg-white rounded-2xl shadow-sm p-8">

          {/* Title */}
          <h1 className="text-2xl font-semibold text-gray-900">
            {course.title}
          </h1>

          {/* Info */}
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">

            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              Course
            </span>

            <span className="text-gray-500">
              👨‍🏫 {course.teacher}
            </span>

            <span className="text-gray-500">
              ⭐ {course.rating}
            </span>

            <span className="text-gray-500">
              🎓 {course.students_count} Students
            </span>

          </div>

          {/* Fake Video / Image */}
          <div className="mt-8 flex justify-center">

            <div className="w-full max-w-4xl aspect-video rounded-2xl shadow-lg overflow-hidden bg-gray-200">

              <img
                        src={
  course.image_path
    ? `https://course-vedio-production.up.railway.app/${course.image_path}`
    : "/images/image-not_found.png"
}
                alt={course.title}
                className="w-full h-full object-cover"
              />

            </div>

          </div>

          {/* Description */}
          <div className="mt-8">

            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              About this course
            </h2>

            <p className="text-gray-600 leading-7">
              {course.description}
            </p>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-8">

            {/* Lessons */}
            <div className="bg-gray-50 rounded-xl p-4 text-center">

              <p className="text-2xl font-bold text-[#8E24AA]">
                {course.lessons.length}
              </p>

              <p className="text-gray-500 text-sm">
                Lessons
              </p>

            </div>

            {/* Duration */}
            <div className="bg-gray-50 rounded-xl p-4 text-center">

              <p className="text-2xl font-bold text-[#8E24AA]">
                {formatDuration(totalDuration)}
              </p>

              <p className="text-gray-500 text-sm">
                Duration
              </p>

            </div>

            {/* Rating */}
            <div className="bg-gray-50 rounded-xl p-4 text-center">

              <p className="text-2xl font-bold text-[#8E24AA]">
                {course.rating}
              </p>

              <p className="text-gray-500 text-sm">
                Rating
              </p>

            </div>

            {/* Students */}
            <div className="bg-gray-50 rounded-xl p-4 text-center">

              <p className="text-2xl font-bold text-[#8E24AA]">
                {course.students_count}
              </p>

              <p className="text-gray-500 text-sm">
                Students
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Sidebar */}
      <div className="col-span-3 min-h-screen flex">

        <div className="bg-white shadow-sm p-6 sticky top-0 w-full h-screen overflow-y-auto">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-lg font-bold">
              Course Content
            </h2>

            <span className="text-sm text-gray-500">
              {course.lessons.length} lessons
            </span>

          </div>

          <div className="space-y-3">

            {course.lessons.length > 0 ? (

              course.lessons.map((lesson, index) => (

                <LessonCard
                  key={lesson.id}
                  lesson={{
                    ...lesson,
                    duration: lesson.duration,
                  }}
                  active={index === 0}
                />

              ))

            ) : (

              <p className="text-sm text-gray-500">
                No lessons available
              </p>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Course;