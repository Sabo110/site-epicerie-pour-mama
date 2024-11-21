"use client"

import React from 'react'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Link from 'next/link'

type Props = {
  banner: string | StaticImport
  cata?: {
    categoryName: string,
    link: string //le lien pour voir la categorie(ses produits)
  }
}
export const Banner = ({ banner }: Props) => {

  return (
    <div className="md:h-[350px] h-[200px] mt-4 relative">
      <Image src={banner} alt='image de bannière' width={100} height={100} className="h-full w-full object-cover" />
    </div>
  )
}
