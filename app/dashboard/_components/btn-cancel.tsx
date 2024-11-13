"use clien"

import React from 'react'
import { Button } from "@/components/ui/button"

type Props = {
    setVisible: () => void
}
export const BtnCancel = ({setVisible}: Props) => {
  return (
    <div>
        <Button variant={"destructive"} onClick={setVisible}> Fermer </Button>
    </div>
  )
}
