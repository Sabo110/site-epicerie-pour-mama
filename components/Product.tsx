"use client"

import React from 'react'
import { BannerImage } from './BannerImage'
import { P } from '@/types/product'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

type Props = {
    product: P
}
export const Product = ({ product }: Props) => {
    const baseUrl = "https://res.cloudinary.com/dilxbtgss/image/upload/v1731642136/"
    const router = useRouter()
    return (
        <div className=''>
            <div className='md:w-44 md:h-44 w-56 h-56 mx-auto'>
                <Image src={baseUrl + product.imageUrl} alt='image du produit' width={100} height={100} className='object-fill w-full h-full rounded-full' />
            </div>
            <div className='text-center flex flex-col mt-2 space-y-2'>
                <h6> {product.name} </h6>
                <span> {product.price} FCFA </span>
                <Button variant={"outline"} onClick={() => router.push('/produit/' + product.slug)}>Voir le produit</Button>
            </div>
        </div>
    )
}
