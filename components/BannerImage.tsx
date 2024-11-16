import React from 'react'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

type Props = {
  image: string | StaticImport
}
export const BannerImage = ({ image }: Props) => {
  
  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <Image
        src={image}
        alt='image'
        fill
        placeholder='blur'
        blurDataURL="https://drive.google.com/file/d/1Eekx-fW8o70kLJyAjn23AaMSDAOEL4GK/view?usp=drive_link"
        style={{ objectFit: 'fill' }}
      />
    </div>
  )
}
