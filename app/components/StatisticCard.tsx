import { Icon } from '@iconify/react'
import { Link } from 'react-router';
import { useCounter } from '~/hooks/useCounter';

function StatisticCard({ color,title,number,increase,link,icon }: { color: string, title: string,icon?:string, number: number, increase?: number ,link?:string }) {
    const value = useCounter(number);

  return (
    <div
    style={{ backgroundColor: color }}
     className={`w-full h-34  justify-between rounded-lg flex p-4 relative overflow-hidden  text-white `}>
             <div className='w-25 h-25 absolute -right-2 -bottom-4 bg-white/10 rounded-full'></div>
             <div className='w-25 h-25 absolute -left-8 -top-5 bg-white/10 rounded-full'></div>

    <div className='flex flex-col gap-2 w-fit justify-between'>
      { icon&&<div className='bg-[#ffffff2d] rounded-xl p-2 w-fit'>
         <Icon icon={icon} width={20} />
      </div>}
       
 <h1 className='text-2xl font-semibold'>
      {value.toFixed(1)}K
    </h1>
    <div className='flex items-center justify-between'>
         <h2 className='text-lg'>{title}</h2>
  
        </div>

 { increase&&   <div className='flex items-center gap-2'>
        <div className='flex items-center gap-1 border w-fit px-2   rounded-2xl'>
            <Icon icon="system-uicons:arrow-up-circle"  width={15} height={15}/>
            <span className='text-[12px]'>{increase}</span>
        </div>
        <span className='text-xs'>increased from last month</span>
        </div>}
     </div>
         {link && <Link to={link} className="w-8 h-8 bg-white  rounded-full flex items-center justify-center">
          <Icon icon="mdi:arrow-top-right" color="#3b3b3b" />
        </Link> }
    </div>
  )
}

export default StatisticCard