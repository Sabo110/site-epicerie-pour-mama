"use client"

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
export const ProductsSkeleton = () => {
    const tab = [1, 2, 3, 4, 5]
    return (
        <div className='grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-3 grid-cols-2 sm:gap-14 gap-10 mb-[50px] mt-3'>
            {Array.from({length: 5 }, (_, index) => `Item ${index}`).map((value, index) => (
            <div className='space-y-2 md:h-[250px] lg:h-[200px]' key={index}>
                <Skeleton className='md:w-48 md:h-48 sm:w-40 sm:h-40 h-32 w-32 rounded-full mx-auto' />
                <div className='h-1/5 flex flex-col items-center md:w-48 sm:w-40 gap-1 mx-auto'>
                    <Skeleton className='h-1/4 md:w-48 sm:w-40  w-32' />
                    <Skeleton className='h-1/4 md:w-44 sm:w-36 w-28' />
                    <Skeleton className='h-1/4 md:w-40 sm:w-32 w-24' />
                    <Skeleton className='h-1/4 md:w-36 sm:w-28 w-20' />
                </div>
            </div>
            ))}
        </div>
    )
}
