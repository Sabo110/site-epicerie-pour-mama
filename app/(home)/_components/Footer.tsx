"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllP } from '@/actions/product'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export const Footer = () => {
    const { data, isPending, error } = useQuery({
        queryKey: ['products'],
        queryFn: getAllP
    })
    return (
        <footer className='pt-4 px-4 pb-2'>
            <Separator className='mb-4' />
            <div className='flex flex-wrap gap-y-6 gap-x-14'>
                <div>
                    <h5>Contact</h5>
                    <p><a href="" className='hover:underline'>+237 659182723</a></p>
                    <p><a href="" className='hover:underline'>vivmba@yahoo.fr</a></p>
                    <p><a href="" className='hover:underline'>vivifacebookpage</a></p>
                </div>
                <div>
                    <h5>Produits</h5>
                    <ul className='space-y-2'>
                        {data?.slice(0, 10).map(p => (
                            <li key={p.id}><Link href={"/produit/" + p.slug} className='hover:underline'> {p.name} </Link></li>
                        ))}
                        {
                            isPending ?
                                    Array.from({ length: 10 }).map((_, index) => (
                                        <li key={index}>
                                            <Skeleton className='w-[150px] h-2'/>
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
