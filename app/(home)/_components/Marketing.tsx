
import React from 'react'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type Props = {
  object: {
    title: string,
    text: string,
    icon: StaticImport
  }
  className?: string
}
export const Marketing = ({ object, className }: Props) => {
  return (
    <div className={cn('space-y-2 p-4', className)}>
      <div className='w-[40px] h-[40px] mx-auto'>
        <Image
          src={object.icon}
          alt='icone'
          className='object-cover h-full w-full'
        />
      </div>
      <h1 className='text-center'> {object.title} </h1>
      <p className='text-start'>
        {object.text}
      </p>
    </div>
  )
}
