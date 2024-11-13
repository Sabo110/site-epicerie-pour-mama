"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { LoaderCircle } from 'lucide-react';

type Props = {
    label: string
    isPending: boolean
}
export const BtnSubmit = ({label, isPending}: Props) => {
  return (
    <div>
        <Button type='submit' className='flex items-center gap-2' disabled={isPending} > {label} {isPending ? <LoaderCircle className='animate-spin' size={24} /> : null}  </Button>
    </div>
  )
}
