import React from 'react'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { Product } from './Product'

type Props = {
    products: { name: string, image: string | StaticImport, price: number }[]
}
export const Products = ({ products }: Props) => {
  return (
    <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-6'>
        {products.map((product, index) => (
            <Product product={product} key={index}/>
        ))}
    </div>
  )
}
