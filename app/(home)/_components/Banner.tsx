"use client"

import React from 'react'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

type Props = {
    banner: string | StaticImport
}
export const Banner = ({banner}: Props) => {

  return (
    <div className="md:h-[350px] h-[200px] mt-4">
        <Image src={banner} alt='image de bannière'width={100} height={100} className="h-full w-full object-cover"/>
    </div>
  )
}
