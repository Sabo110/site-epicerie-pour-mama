import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
export const BanSkeleton = () => {
  return (
    <div className='md:h-[350px] h-[200px]'>
        <Skeleton className="h-full w-full" />
    </div>
  )
}
