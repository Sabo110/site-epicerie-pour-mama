"use client"

import { NavBar } from '@/components/NavBar'
import React from 'react'
import Image from 'next/image'
import logo from "@/public/logo.png"
import { SearchBar } from "@/components/SearchBar";

export const Header = () => {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
        <div className="w-[200px] h-[50px]">
          <Image
            src={logo}
            alt="logo du site"
            className="object-cover"
          />
        </div>
        <SearchBar className="max-w-[300px] w-full" />
      </div>
      <NavBar />
    </div>
  )
}