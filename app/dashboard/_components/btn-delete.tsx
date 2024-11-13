import { Button } from '@/components/ui/button'
import React from 'react'
import { LoaderCircle } from 'lucide-react';

type Props = {
    isPending: boolean
    onClick: () => void
}
export const BtnDelete = ({isPending, onClick}: Props) => {
  return (
    <div>
        <Button className='flex items-center gap-3' disabled={isPending} onClick={onClick} variant={"destructive"} >
            supprimer
            {isPending ? <LoaderCircle className='animate-spin'/>: null}
        </Button>
    </div>
  )
}
