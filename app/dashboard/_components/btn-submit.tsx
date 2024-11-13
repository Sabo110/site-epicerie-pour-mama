import React from 'react'
import { Button } from "@/components/ui/button"

type Props = {
    label: string
}
export const BtnSubmit = ({label}: Props) => {
  return (
    <div>
        <Button type='submit'> {label} </Button>
    </div>
  )
}
