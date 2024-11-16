import React from 'react'

type Props = {
    children : React.ReactNode
}
export default function layout({children}: Props) {
  return (
    <div className='max-w-[1080px] mx-auto p-4'>
        {children}
    </div>
  )
}
