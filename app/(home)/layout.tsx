import React from 'react'
import { Header } from './_components/Header'
import { Footer } from './_components/Footer'
import flowers from "@/public/flowers.png"
import Image from 'next/image'

type Props = {
  children: React.ReactNode
}
export default function layout({ children }: Props) {
  return (
    <div className='relative'>
      <Image src={flowers} alt='fleurs' className='absolute top-8 left-8 w-[30px] h-[30px] hidden xl:block z-0' />
      <Image src={flowers} alt='fleurs' className='absolute top-8 right-8 w-[30px] h-[30px] hidden xl:block z-0' />
      <Image src={flowers} alt='fleurs' className='absolute top-[400px] left-8 w-[30px] h-[30px] hidden xl:block z-0' />
      <Image src={flowers} alt='fleurs' className='absolute top-[400px] right-8 w-[30px] h-[30px] hidden xl:block z-0' />
      <Image src={flowers} alt='fleurs' className='absolute top-[800px] left-8 w-[30px] h-[30px] hidden xl:block z-0' />
      <Image src={flowers} alt='fleurs' className='absolute top-[800px] right-8 w-[30px] h-[30px] hidden xl:block z-0' />
      <Image src={flowers} alt='fleurs' className='absolute top-[1200px] left-8 w-[30px] h-[30px] hidden xl:block z-0' />
      <Image src={flowers} alt='fleurs' className='absolute top-[1200px] right-8 w-[30px] h-[30px] hidden xl:block z-0' />
      <Image src={flowers} alt='fleurs' className='absolute top-[1500px] left-8 w-[30px] h-[30px] hidden xl:block z-0' />
      <Image src={flowers} alt='fleurs' className='absolute top-[1500px] right-8 w-[30px] h-[30px] hidden xl:block z-0' />
      <div className='max-w-[1080px] mx-auto p-4'>
        <Header />
        {children}
      </div>
      <Footer />
    </div>

  )
}
