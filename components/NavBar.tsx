"use client"

import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { useQuery } from '@tanstack/react-query'
import { getAllC } from '@/actions/category'
import Link from 'next/link'
import { Skeleton } from './ui/skeleton'

export const NavBar = () => {
    const { data, isPending, error } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllC
    })
    return (
        <>
            {isPending ? <Skeleton className='w-full h-12' /> : null}
            <NavigationMenu className=''>
                <div className='w-full'>
                    <NavigationMenuList className=''>
                        <div className='w-full flex overflow-x-auto'>
                            {data?.filter(c => c.visible === true).map(category => (
                                <NavigationMenuItem key={category.id}>
                                    <NavigationMenuTrigger className='capitalize'> {category.name} </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        {/* les sous categories de la categorie */}
                                        <div className='min-h-[300px] lg:min-w-[1000px] xl:w-[1080px] w-[300px] flex flex-wrap gap-[40px] p-4'>
                                            {category.subCategories.filter(sc => sc.visible === true).map(subCategory => (
                                                <div key={subCategory.id} className=''>

                                                    {
                                                        subCategory.subSubCategories.length === 0 ?
                                                            <div>
                                                                <Link href={"/" + category.slug + "/" + subCategory.slug} className='hover:underline text-2xl'>
                                                                    <p className='text-xl'>{subCategory.name}</p>
                                                                </Link>
                                                                <ul className='mt-2 space-y-4'>
                                                                    {
                                                                    subCategory.products.filter(p => p.visible === true).map(p => (
                                                                        <li key={p.id}><Link href={`/produit/${p.slug}`} className='hover:underline'> {p.name} </Link></li>
                                                                    ))
                                                                    }
                                                                </ul>
                                                            </div>
                                                            :
                                                            <p className='text-xl'> {subCategory.name} </p>
                                                    }

                                                    {/* les sous sous categories */}
                                                    <ul className='mt-2'>
                                                        {subCategory.subSubCategories.filter(ssc => ssc.visible === true).map(subSubCategory => (
                                                            <li key={subSubCategory.id}>
                                                                <Link href={"/" + category.slug + "/" + subCategory.slug + "/" + subSubCategory.slug} className='hover:underline'>
                                                                    <p>{subSubCategory.name}</p>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                        {/* <NavigationMenuLink>Link</NavigationMenuLink> */}
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            ))}
                        </div>
                    </NavigationMenuList>
                </div>
            </NavigationMenu>
        </>
    )
}


