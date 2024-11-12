import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React from 'react'
import { BannerImage } from './BannerImage'

type Props = {
    product: { name: string, image: string | StaticImport, price: number }
}
export const Product = ({ product }: Props) => {
    return (
        <div>
            <div className='w-44 h-44  border-4 border-black'>
                <BannerImage image={product.image}/>
            </div>
            <div>
                <h5> {product.name} </h5>
                <p className='text-center'> {product.price} </p>
            </div>
        </div>
    )
}
