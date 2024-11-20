import React from 'react'
import { Header } from './_components/Header'
import { Footer } from './_components/Footer'

type Props = {
    children : React.ReactNode
}
export default function layout({children}: Props) {
  return (
    <div>
      <div className='max-w-[1080px] mx-auto p-4'>
      <Header />
        {children}
    </div>
      <Footer />
    </div>
    
  )
}
