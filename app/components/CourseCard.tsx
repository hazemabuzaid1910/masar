import React from 'react'
import { Link } from 'react-router'
import type { Course } from '~/types/Course'

function CourseCard(course:Course) {
  return (
    <div className='flex flex-col gap-2 h-80  bg-white rounded-lg p-2 shadow-lg'>
        <div className='h-1/2 rounded-lg overflow-hidden'>
        <img src={course.image} alt="" className='w-full h-full object-cover'/>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
            <div className='flex flex-col flex-1 gap-2'>
                 <h2 className='line-clamp-1 font-semibold text-base'>{course.title}</h2>
            <span className='line-clamp-2 text-sm opacity-75'>{(course.discription)} </span>
            </div>
            <Link to="#" className='flex mt-auto items-center gap-2 w-fit'>
            <div className='w-8 h-8 rounded-full overflow-hidden'>
                <img src="/images/person.avif" alt=""  className='w-full'/>
            </div>
            <span className='font-semibold text-sm opacity-85'>{course.mentor}</span>
            </Link>
           
        </div>
    </div>
  )
}

export default CourseCard