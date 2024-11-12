import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React from 'react'
import { BannerImage } from './BannerImage'

type Props = {
    product: { name: string, image: string | StaticImport, price: number }
}
export const Product = ({ product }: Props) => {
    return (
        <div className='border-2 border-red-700'>
            <div className='md:w-44 md:h-44 w-56 h-56  border-4 border-black mx-auto'>
                <BannerImage image={product.image}/>
            </div>
            <div className='text-center'>
                <h5> {product.name} </h5>
                <p> {product.price} </p>
            </div>
        </div>
    )
}
