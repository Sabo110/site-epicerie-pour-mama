import Image from 'next/image'
import React from 'react'
import happy from "@/public/happy.gif"

export default function Dashboard() {
  return (
    <div className='h-full flex justify-center items-center gap-1'>
      <h5>Welcome to EPICERIE VIVI !</h5>
      <Image src={happy} alt='happy' width={50} height={50}/>
    </div>
  )
}
