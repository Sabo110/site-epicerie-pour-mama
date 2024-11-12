import React from 'react'
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react';

type Props = {
    className: string
}
export const SearchBar = ({className}: Props) => {
  return (
    <div className={cn("relative", className)}>
        <Search className='absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600' />
        <Input placeholder='Rechercher un produit...'/>
    </div>
  )
}
