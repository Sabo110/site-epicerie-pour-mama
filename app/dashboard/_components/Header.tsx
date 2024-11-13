import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {
    pageTitle: string
    btnTitle: string
    setVisible: () => void
}
export const Header = ({pageTitle, btnTitle, setVisible}: Props) => {
  return (
    <div className='flex items-center justify-between'>
        <h2> {pageTitle} </h2>
        <Button onClick={setVisible}> {btnTitle} </Button>
    </div>
  )
}
