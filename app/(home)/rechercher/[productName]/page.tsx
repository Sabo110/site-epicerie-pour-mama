"use client"

import React from 'react'
import { searchP } from '@/actions/product'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { ProductsSkeleton } from '../../_components/products-skeleton'
import { Products } from '@/components/Products'

export default function page() {
    const params = useParams<{ productName: string }>()
    const { data, isPending, error } = useQuery({
        queryKey: ['search', params.productName],
        queryFn: () => searchP(params.productName)
    })
    return (
        <div>
            <h4>Resultat de la recherche</h4>
            {
                isPending ?
                    <ProductsSkeleton /> :
                    data && data.length > 0 ?
                        <Products products={data} /> :
                        data && data.length === 0 ?
                            <p>Aucun produit trouvé !</p> :
                            null
            }
        </div>
    )
}
