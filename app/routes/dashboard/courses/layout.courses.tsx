import React, { useState } from "react";
import CourseCard from "~/components/CourseCard";
import { Icon } from "@iconify/react";
import Data from "../../../utils/Data";
import { Link } from "react-router";
import { useCourses } from "~/hooks/useCourses";
import { useMentorStore } from "~/store/mentor.store";
import { useMentors } from "~/hooks/useMentors";

export function meta({}: any) {
  return [
    { title: "Courses" },
    {
      name: "description",
      content: "Courses Dashboard",
    },
  ];
}

const data = new Data();

function Courses() {
const [selectedCategory, setSelectedCategory] =
  useState<number | "All">("All");

const {
  courses,
  loading,
  error,
  fetchCoursesBySection,
  fetchAllCourses
  
} = useCourses();


  const { mentors } = useMentors();



  const mentorsMap = new Map(
    mentors.map((mentor) => [
      mentor.id,
      mentor,
    ])
  );


  const filteredCourses = courses;


  if (loading) {
    return (
      <div className="bg-neutral-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Loading courses...
        </p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="bg-neutral-100 min-h-screen flex items-center justify-center">
        <p className="text-red-500">
          {error}
        </p>
      </div>
    );
  }


  return (
    <div className="bg-neutral-100 min-h-full gap-4 w-full p-10 grid grid-cols-12">


      <div className="flex items-center justify-between col-span-12">

        <div className="flex items-center gap-2">

          <Icon
            icon="material-symbols-light:books-movies-and-music-rounded"
            color="#8E24AA"
            width={28}
          />

          <h3>
            Courses
          </h3>

        </div>

        <div className="flex gap-4 items-center">

          <input
            type="text"
            className="bg-white px-4 py-2 rounded-lg w-75 outline-none"
            placeholder="search...."
          />

          <div className="flex items-center gap-4">

            <div className="bg-white p-2 rounded-full relative">

              <Icon
                icon="clarity:notification-line"
                color="#464646"
              />

              <div className="w-2 h-2 bg-red-400 rounded-full absolute right-2 top-2" />

            </div>


            <div className="bg-white p-2 rounded-full">

              <Icon
                icon="mdi-light:email"
                color="#464646"
              />

            </div>

          </div>

        </div>

      </div>
      <div className="col-span-12">

      <div className="flex gap-3 overflow-x-auto py-2 scrollbar-hide">

  <button
    onClick={() => {
      setSelectedCategory("All");
      fetchAllCourses();
    }}
    className={`px-5 py-2 rounded-full whitespace-nowrap transition-all duration-300
      ${
        selectedCategory === "All"
          ? "bg-[#8E24AA] text-white"
          : "bg-white text-gray-700"
      }`}
  >
    All
  </button>
{data.categories.map((category) => (
  <button
    key={category.id}
    type="button"
    onClick={() => {
      console.log(
        "🟣 CATEGORY CLICKED:",
        category
      );

      console.log(
        "🟣 CATEGORY ID:",
        category.id
      );

      setSelectedCategory(category.id);

      fetchCoursesBySection(
        Number(category.id)
      );
    }}
    className={`
      px-5 py-2
      rounded-full
      whitespace-nowrap
      transition-all
      duration-300

      ${
        selectedCategory === category.id
          ? "bg-[#8E24AA] text-white"
          : "bg-white text-gray-700"
      }
    `}
  >
    {category.name}
  </button>
))}
</div>

      </div>


      <div className="grid grid-cols-4 gap-4 col-span-12 min-h-130">

{courses.length > 0 ? (
  courses.map((course) => {
    const teacher = course.teacher;
    console.log(course.image)
    return (
      <Link
        key={course.id}
        to={`/courses/${course.id}`}
      >
        <CourseCard
          title={course.title}
        image={
  course.image
    ? `https://course-vedio-production.up.railway.app/${course.image}`
    : "/images/image-not_found.png"
}
          discription={course.description}
          mentor={
            teacher
              ? `${teacher.First_name} ${teacher.Last_name}`
              : "Unknown Teacher"
          }
        />
      </Link>
    );
  })
) : (
  <div className="col-span-4 flex justify-center items-center">
    <h1>No Data</h1>
  </div>
)}

      </div>

    </div>
  );
}

export default Courses;