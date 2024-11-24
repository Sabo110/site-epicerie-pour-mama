import Image from 'next/image'
import React from 'react'
import flowers from "@/public/flowers.png"

type Props = {
    children: React.ReactNode
}
export const CustomTitle = ({children}: Props) => {
  return (
    <div className='border-t border-b border-dashed border-gray-400 py-1 flex items-center justify-center gap-6'>
      <Image src={flowers} alt='fleurs' className='w-[30px] h-[30px]'/>
        {children}
        <Image src={flowers} alt='fleurs' className='w-[30px] h-[30px]'/>
    </div>
  )
}
