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


export default function page() {
    const params = useParams<{ slug: string }>()
    const { data, isPending, error } = useQuery({
        queryKey: ['products', params.slug],
        queryFn: () => getOP(params.slug)
    })
    const baseUrl = "https://res.cloudinary.com/dilxbtgss/image/upload/v1731642136/"
    React.useEffect(() => {
        if (data) {
            console.log(data.imageUrl);

        }
    }, [data])
    return (
        <div>
            {/* la baniiere */}
            {isPending ? <Skeleton className='w-full md:h-[350px] h-[250px] mb-6' /> : null}
            {data ? <div className='md:h-[350px] h-[250px] mb-6'>
                <Image
                    src={data.subCategory?.bannerImageUrl ? baseUrl + data.subCategory.bannerImageUrl : data.subSubCategory?.bannerImageUrl ? baseUrl + data.subSubCategory.bannerImageUrl : banner}
                    alt='image du produit'
                    width={100}
                    height={100}
                    className='object-fill w-full h-full' />
            </div> : null}
            {/* le nom de la sous categorie ou de la sous sous categorie */}
            {isPending ? <Skeleton className='w-full h-4' /> : null}
            {data?.subCategory ? <h2 className='text-center'> {data.subCategory.name} </h2> : data?.subSubCategory ? <h2 className='text-center'> {data.subSubCategory.name} </h2> : null}
            {/* l'image du produit, la description et le prix */}
            <div className='flex flex-wrap items-center md:justify-between mt-6 gap-3'>
                {/* skeleton image et image meme */}
                {isPending ? <Skeleton className='md:w-48 md:h-48 h-32 w-32 rounded-full' /> : null}
                {data ? <div className='md:w-48 md:h-48 h-36 w-36'>
                    <Image src={baseUrl + data.imageUrl} alt='image du produit' width={100} height={100} className='object-fill w-full h-full rounded-full' />
                </div> : null
                }
                {/* skeleton description et description */}
                {
                    isPending ?
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
                    data ?
                        <div className='md:w-[400px] space-y-2'>
                            <h5> {data.name} </h5>
                            <p> {data.description} </p>
                            {data.stockQuantity ? <span className='inline-block bg-gray-700 text-gray-100 me-4 p-2'> {data.stockQuantity} en stock </span> : null}
                            {data.isFeatured ? <span className='inline-block bg-yellow-200 p-2'> produit pahre </span> : null}
                            <span className={cn('block', ((data.isOnSale && data.saleEndDate) && isAfter(data.saleEndDate, new Date())) ? 'line-through' : null)}> {data.price} FCFA </span>
                            {(data.isOnSale && data.saleStartDate && data.saleEndDate) && (isEqual(data.saleStartDate, new Date()) || isBefore(data.saleStartDate, new Date())) ?
                                <div>
                                    <span className='me-2'>En promotion:</span>
                                    <span> {data.salePrice} FCFA</span>
                                    <span className='block mt-2 bg-green-400 text-white p-2'> {calculateDaysRemaining(data.saleEndDate)} </span>
                                </div> : null
                            }
                        </div> : null
                }
            </div>
            {/* les produits de la meme sous categorie ou sous sous categorie */}
            <h3 className='mt-[100px]'>Produits similaires</h3>
            <div className='grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-2 gap-14 mt-10'>
                {/* affichage du skeleton */}
                {
                    isPending ?
                        Array.from({ length: 5 }, (_, index) => `Item ${index}`).map((value, index) => (
                            <div className='space-y-2 md:h-[250px] lg:h-[200px]' key={index}>
                                <Skeleton className='md:w-48 md:h-48 sm:w-40 sm:h-40 h-32 w-32 rounded-full mx-auto' />
                                <div className='h-1/5 flex flex-col items-center md:w-48 sm:w-40 gap-1'>
                                    <Skeleton className='h-1/4 md:w-48 sm:w-40  w-32' />
                                    <Skeleton className='h-1/4 md:w-44 sm:w-36 w-28' />
                                    <Skeleton className='h-1/4 md:w-40 sm:w-32 w-24' />
                                    <Skeleton className='h-1/4 md:w-36 sm:w-28 w-20' />
                                </div>
                            </div>
                        ))
                        : null
                }
                {/* affichage des donnees */}
                {
                    data && data.subCategory ?
                        data.subCategory.products.filter(element => element.slug !== data.slug).map(product => (
                            <Product key={product.id} product={product} />
                        )) : data && data.subSubCategory ?
                            data.subSubCategory.products.filter(element => element.slug !== data.slug).map(product => (
                                <Product key={product.id} product={product} />
                            )) : null
                }
            </div>
        </div>
    )
}
