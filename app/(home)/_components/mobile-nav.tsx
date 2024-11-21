"use client"

import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { getAllC } from '@/actions/category'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { AlignCenter } from 'lucide-react';

export const MobileNav = () => {
    const { data, isPending, error } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllC
    })
    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger><AlignCenter size={30}/></SheetTrigger>
            <SheetContent side={"left"} className='w-[93%] sm:w-[540px]'>
                <SheetHeader>
                    <SheetTitle></SheetTitle>
                    <SheetDescription>

                    </SheetDescription>
                </SheetHeader>
                <ul className='space-y-4'>
                    {
                        data?.map(c => (
                            <li key={c.id} className="cursor-pointer hover:underline" onClick={() => {
                                setOpen(false)
                                router.push("/" + c.slug)
                            }}> {c.name} </li>
                        ))
                    }
                </ul>
            </SheetContent>
        </Sheet>
    )
}
