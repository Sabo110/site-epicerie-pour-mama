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

export const NavBar = () => {
    const { data, isPending, error } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllC
    })
    return (
        <NavigationMenu className=''>
            <div className='w-full'>
                <NavigationMenuList className=''>
                    <div className='w-full flex overflow-x-auto'>
                        {data?.map(category => (
                            <NavigationMenuItem key={category.id}>
                                <NavigationMenuTrigger className='capitalize'> {category.name} </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    {/* les sous categories de la categorie */}
                                    <div className='min-h-[300px] lg:min-w-[1000px] xl:w-[1080px] w-[300px] flex flex-wrap gap-[30px] p-4'>
                                        {category.subCategories.map(subCategory => (
                                            <div key={subCategory.id} className=''>

                                                {
                                                    subCategory.subSubCategories.length === 0 ?
                                                        <Link href={"/" + category.slug + "/" + subCategory.slug} className='hover:underline'>
                                                            <p>{subCategory.name}</p>
                                                        </Link> : <p className=''> {subCategory.name} </p>
                                                }

                                                {/* les sous sous categories */}
                                                <ul className='mt-2'>
                                                    {subCategory.subSubCategories.map(subSubCategory => (
                                                        <li key={subSubCategory.id}>
                                                            <Link href={"/" + category.slug + "/" + subCategory.slug + "/" + subSubCategory.slug} className='hover:underline'>
                                                                <small>{subSubCategory.name}</small>
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
    )
}



export const NavBarMobile = () => {
    return (
        <div>NavBar</div>
    )
}

