
import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

export const BannerSkeleton = () => {
  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <Skeleton className="h-full w-full" />
    </div>
  )
}
