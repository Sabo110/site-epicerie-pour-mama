"use client"

import React from 'react'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

type Props = {
  banner: string | StaticImport
  cata?: {
    categoryName: string,
    link: string //le lien pour voir la categorie(ses produits)
  }
}
export const Banner = ({ banner }: Props) => {

  return (
    <div className="md:h-[350px] h-[200px] mt-4 relative mb-4">
      <Image src={banner} alt='image de bannière' width={1080} height={350} className="h-full w-full object-cover"/>
    </div>
  )
}
