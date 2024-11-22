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
import { useRouter } from 'nextjs-toploader/app';
import { AlignCenter } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton'
import { Error } from './error'

export const MobileNav = () => {
    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllC
    })
    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger><AlignCenter size={30} /></SheetTrigger>
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
                {isPending ? Array.from({ length: 10 }, (_, index) => `Item ${index}`).map((value, index) => (
                    <Skeleton className='w-full h-5 my-2' key={index}/>
                )) : null}
                {error ? <Error fn={refetch}/> : null}
            </SheetContent>
        </Sheet>
    )
}
