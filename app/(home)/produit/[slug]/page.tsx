"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getOP } from '@/actions/product'
import banner from "@/public/epiceriebaniere.png"
import { Skeleton } from "@/components/ui/skeleton"
import Image from 'next/image'
import { Product } from '@/components/Product'
import { cn } from '@/lib/utils'
import { isBefore, isAfter, isEqual } from "date-fns";
import { calculateDaysRemaining } from '@/lib/calculateDaysRemaining'
import { Banner } from '../../_components/Banner'
import { ProductsSkeleton } from '../../_components/products-skeleton'
import { Products } from '@/components/Products'


export default function page() {
    const baseUrl = "https://res.cloudinary.com/dilxbtgss/image/upload/v1731642136/"
    const params = useParams<{ slug: string }>()
    //on recupere le slug du produit
    const productSlug = params.slug
    //on recupere le produit
    const productQuery = useQuery({
        queryKey: ['product', productSlug],
        queryFn: () => getOP(productSlug)
    })
    return (
        <div>
            {/* skeleton et baniiere */}
            {productQuery.isPending ? <Skeleton className='w-full md:h-[350px] h-[200px]' /> : null}
            {productQuery.data ?
                <Banner
                    banner={productQuery.data.subCategory ? baseUrl + productQuery.data.subCategory.category.imageUrl :
                        productQuery.data.subSubCategory ? baseUrl + productQuery.data.subSubCategory.subCategory.category.imageUrl :
                            banner}
                />
                : null
            }
            {/* skelelon etle nom de la sous categorie ou de la sous sous categorie */}
            {productQuery.isPending ? <Skeleton className='w-full h-4' /> : null}
            {
                productQuery.data ?
                    <h4 className=''>
                        {productQuery.data.subCategory ? productQuery.data.subCategory.name : productQuery.data.subSubCategory ? productQuery.data.subSubCategory.name : "Bundle & packs"}
                    </h4> :
                    null
            }
            {/* skeleton , l'image du produit, la description le prix et ingredients */}
            <div className='grid md:grid-cols-2 gap-x-[100px] gap-y-[20px] gap-3'>
                {/* skeleton image et image meme */}
                {productQuery.isPending ? <Skeleton className='md:w-48 md:h-48 h-32 w-32 rounded-full' /> : null}
                {
                    productQuery.data ?
                        <div className='space-y-4'>
                            <div className='md:w-48 md:h-48 h-36 w-36'>
                                <Image src={baseUrl + productQuery.data.imageUrl} alt='image du produit' width={100} height={100} className='object-fill w-full h-full rounded-full' />
                            </div>
                            <div>
                                <h6>Ingrédients:</h6>
                                <p> {productQuery.data.ingredients} </p>
                            </div>
                        </div>
                        : null
                }
                {/* skeleton description et description */}
                {
                    productQuery.isPending ?
                        <div className='md:w-[400px] md:h-[200px] w-full h-[150px] space-y-1'>
                            <div className='h-2/3 space-y-1'>
                                <Skeleton className='w-full h-1/6' />
                                <Skeleton className='w-5/6 h-1/6' />
                                <Skeleton className='w-4/6 h-1/6' />
                                <Skeleton className='w-3/6 h-1/6' />
                                <Skeleton className='w-2/6 h-1/6' />
                                <Skeleton className='w-1/6 h-1/6' />
                            </div>
                            <div className='h-1/3 space-y-1'>
                                <Skeleton className='w-1/6 h-1/3' />
                                <Skeleton className='w-2/6 h-1/3' />
                                <Skeleton className='w-3/6 h-1/3' />
                            </div>
                        </div>
                        : null
                }
                {/* la description */}
                {
                    productQuery.data ?
                        <div className='md:w-[400px] space-y-2'>
                            <div>
                                <h6>Produit: </h6>
                                <p> {productQuery.data.name} </p>
                            </div>
                            <div>
                                <h6>Description:</h6>
                                <p> {productQuery.data.description} </p>
                            </div>
                            {productQuery.data.stockQuantity ? <span className='inline-block bg-gray-700 text-gray-100 me-4 p-2'> {productQuery.data.stockQuantity} en stock </span> : null}
                            {productQuery.data.isFeatured ? <span className='inline-block bg-yellow-200 p-2'> produit pahre </span> : null}
                            <span className={cn('block font-bold', ((productQuery.data.isOnSale && productQuery.data.saleEndDate) && isAfter(productQuery.data.saleEndDate, new Date())) ? 'line-through' : null)}> {productQuery.data.price} FCFA </span>
                            {(productQuery.data.isOnSale && productQuery.data.saleStartDate && productQuery.data.saleEndDate) && (isEqual(productQuery.data.saleStartDate, new Date()) || isBefore(productQuery.data.saleStartDate, new Date())) ?
                                <div>
                                    <span className='me-2'>En promotion:</span>
                                    <span> {productQuery.data.salePrice} FCFA</span>
                                    <span className='block mt-2 bg-green-400 text-white p-2'> {calculateDaysRemaining(productQuery.data.saleEndDate)} </span>
                                </div> : null
                            }
                        </div> : null
                }
            </div>
            {/* les produits de la meme sous categorie ou sous sous categorie */}
            <h4 className=''>Produits Similaires à Découvrir</h4>
                {/* affichage du skeleton */}
                {
                    productQuery.isPending ?
                        <ProductsSkeleton />
                        : null
                }
                {/* affichage des donnees */}
                {
                    productQuery.data && productQuery.data.subCategory ?
                        <Products products={productQuery.data.subCategory.products.filter(element => element.slug !== productQuery.data.slug)} />
                        : productQuery.data && productQuery.data.subSubCategory ?
                            <Products products={productQuery.data.subSubCategory.products.filter(element => element.slug !== productQuery.data.slug)} />
                            : null
                }
        </div>
    )
}
