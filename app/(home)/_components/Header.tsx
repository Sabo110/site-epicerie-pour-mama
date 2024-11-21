"use client"

import { NavBar } from '@/components/NavBar'
import React from 'react'
import Image from 'next/image'
import logo from "@/public/logo.png"
import { SearchBar } from "@/components/SearchBar";
import Link from 'next/link'
import { MobileNav } from './mobile-nav'
import { useIsMobile } from '@/hooks/use-mobile'

export const Header = () => {
  const isMobile = useIsMobile()
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
        <div className="w-[200px] h-[50px]">
          <Link href={"/"}>
          <Image
            src={logo}
            alt="logo du site"
            className="object-cover"
          />
          </Link>
        </div>
        <SearchBar className="max-w-[300px] w-full" />
      </div>
      {!isMobile ? <NavBar /> : <span className='absolute top-5 right-6'><MobileNav /></span>}
      
    </div >
  )
}
