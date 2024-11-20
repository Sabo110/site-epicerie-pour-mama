import React from 'react'

type Props = {
    children: React.ReactNode
}
export const CustomTitle = ({children}: Props) => {
  return (
    <div className='border-t border-b border-dashed border-black py-1'>
        {children}
    </div>
  )
}
