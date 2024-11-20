"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getOSC } from '@/actions/subCategory'
import { getOSSC } from '@/actions/sous-sous-category'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { Product } from '@/components/Product'
import { getOC } from '@/actions/category'
import { Banner } from '../_components/Banner'
import { ProductsSkeleton } from '../_components/products-skeleton'
import { Products } from '@/components/Products'
import { CustomTitle } from '../_components/custom-title'

export default function page() {
    const baseUrl = "https://res.cloudinary.com/dilxbtgss/image/upload/v1731642136/"
    const params = useParams<{ slug: string[] }>()
    //on recupere d'evantuele slug
    const categorySlug = params.slug[0]
    const subCategorySlug = params.slug[1]
    const subSubCategorySlug = params.slug[2]
    //recuperation d'une categorie a partir du slug
    const categoryQuery = useQuery({
        queryKey: ['categorie', categorySlug],
        queryFn: () => getOC(categorySlug)
    })
    //recupereation d'une sous categorie a paritir de son slug
    const subCategoryQuery = useQuery({
        queryKey: ['subCategorie', params.slug[1]],
        queryFn: () => getOSC(params.slug[1]),
        enabled: (subCategorySlug && !subSubCategorySlug) ? true : false
    })
    //recuperation d'une sous sous categorie a partir de son slug
    const subSubCategoryQuery = useQuery({
        queryKey: ['subSubCategorie', params.slug[2]],
        queryFn: () => getOSSC(params.slug[2]),
        enabled: subSubCategorySlug ? true : false
    })
    return (
        <div className=''>
            {/* le skeleton de la baniere et banniere */}
            {categoryQuery.isPending ? <Skeleton className='w-full md:h-[350px] h-[200px]' /> : null}
            {categoryQuery.data ? <Banner banner={baseUrl + categoryQuery.data.imageUrl} /> : null}
            {/* le skeleton du nom de la sous categorie ou sous-sous categorie et sous categorie ou sous sous categorie */}
            {(subCategoryQuery.isPending && subSubCategoryQuery.isPending) ? <Skeleton className='sm: w-1/2 mx-auto h-5' /> : null}
            {subCategoryQuery.data ? <CustomTitle><h5> {subCategoryQuery.data.name} </h5></CustomTitle> : subSubCategoryQuery.data ? <CustomTitle><h5> {subSubCategoryQuery.data.name} </h5></CustomTitle> : null}
            {/* skeleon de produits */}
            {(subCategoryQuery.isPending && subSubCategoryQuery.isPending) ? <ProductsSkeleton /> : null}
            {/* produits */}
            {
                subCategoryQuery.data ?
                    <Products products={subCategoryQuery.data.products.filter(item => item.visible === true)} />
                    : subSubCategoryQuery.data ?
                        <Products products={subSubCategoryQuery.data.products.filter(item => item.visible === true)} /> :
                        null
            }
        </div>
    )
}
