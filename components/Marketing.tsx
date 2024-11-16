
import React from 'react'
import { BannerImage } from './BannerImage'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

type Props = {
  object: {
    title: string,
    text: string,
    icon: StaticImport
  }
}
export const Marketing = ({ object }: Props) => {
  return (
    <div>
      <div className='w-28 h-28'>
        <BannerImage image={object.icon} />
      </div>
      <h4> {object.title} </h4>
      <p className='text-justify'>
        {object.text}
      </p>
    </div>
  )
}
