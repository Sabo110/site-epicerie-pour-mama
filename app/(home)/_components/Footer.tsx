"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllP } from '@/actions/product'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import logo from "@/public/logo.png"
import flowers from "@/public/flowers.png"

export const Footer = () => {
    const { data, isPending, error } = useQuery({
        queryKey: ['products'],
        queryFn: getAllP
    })
    return (
        <footer className='pt-4 px-4 pb-2 bg-gray-100 text-gray-800 z-10'>
            <div className='flex items-center justify-center gap-6'>
                <Image src={flowers} alt='logo' className='w-[30px] h-[30px]' />
                <Link href={"/"}><Image src={logo} alt='logo' className='cursor-pointer my-4' /></Link>
                <Image src={flowers} alt='logo' className='w-[30px] h-[30px]' />
            </div>
            <Separator className='mb-4 bg-gray-800' />
            <div className='flex flex-wrap gap-y-6 gap-x-14'>
                <div>
                    <h6>Contact</h6>
                    <p><a href="" className='hover:underline'>+237 659182723</a></p>
                    <p><a href="" className='hover:underline'>vivmba@yahoo.fr</a></p>
                    <p><a href="" className='hover:underline'>vivifacebookpage</a></p>
                </div>
                <div>
                    <h6>Produits</h6>
                    <ul className='space-y-2'>
                        {data?.filter(po => po.visible === true).slice(0, 10).map(p => (
                            <li key={p.id}><Link href={"/produit/" + p.slug} className='hover:underline'> {p.name} </Link></li>
                        ))}
                        {
                            isPending ?
                                Array.from({ length: 10 }).map((_, index) => (
                                    <li key={index}>
                                        <Skeleton className='w-[150px] h-2' />
                                    </li>
                                )) : null
                        }
                    </ul>
                </div>
            </div>
            <small className='block text-center mt-4'>@copiright 2024. Edited by yoba sabo</small>
        </footer>
    )
}
