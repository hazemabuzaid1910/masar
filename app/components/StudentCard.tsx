import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router'

function StudentCard() {
  return (
    <div className='flex w-full items-center justify-between'>
        <div className='flex flex-row gap-4 items-center'>
        <div className='w-12 h-12 rounded-full overflow-hidden'>
        <img src="/images/person.avif" alt=""  className='w-full ' />
    </div>
    <div>
        <h3 className='text-base font-medium'>Mohammad Ali</h3>
        <p className='text-sm text-gray-600'>IT Damascus University</p>
    </div>
    </div>
    <span className='text-sm'>12-5-2096</span>
    <div className='flex items-center gap-2'>
        <Link to="#" className='bg-[#8E24AA] hover:bg-[#8d24aad8] text-white px-4 py-2 rounded-lg flex w-fit items-center gap-2 text-[14px]'>
         <span className='text-sm leading-0'>view profile</span>
        <Icon icon="mdi-light:arrow-right" width={20}/>
        </Link>
        <button className='p-2 bg-red-400   text-white rounded-lg'><Icon icon={"fluent:delete-32-regular"}/></button>
        
    </div>
    </div>
  )
}

export default StudentCard