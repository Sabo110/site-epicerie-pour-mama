import React from 'react'
import { Product } from './Product'
import { P } from '@/types/product'

type Props = {
    products: P[]
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
