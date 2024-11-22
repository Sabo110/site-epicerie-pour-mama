"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react';
import { useSearchP } from '@/app/store';
import { useRouter } from 'nextjs-toploader/app';


type Props = {
  className: string
}
export const SearchBar = ({ className }: Props) => {
  const router = useRouter()
  const name = useSearchP((state) => state.name)
  const setName = useSearchP((state) => state.setName)
  return (
    <div className={cn("relative", className)}>
      <Search className='absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600 cursor-pointer' onClick={() => {
        if (name.length > 0) {
          router.push('/rechercher/' + name)
        }
      }} />
      <Input placeholder='Rechercher un produit...'
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (name.length > 0) {
              router.push('/rechercher/' + name)
            }
          }
        }}
      />
    </div>
  )
}
