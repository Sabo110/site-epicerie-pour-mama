import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { BtnDelete } from './btn-delete'

type Props = {
    title: string
    isPending: boolean
    onClick: () => void
    open: boolean
    onOpenChange: (open: boolean) => void
}
export const DialogDelete = ({title, isPending, onClick, open, onOpenChange}: Props) => {
    return (
        <Dialog onOpenChange={onOpenChange} open={open}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> {title} </DialogTitle>
                </DialogHeader>
                <BtnDelete isPending={isPending} onClick={onClick} />
            </DialogContent>
        </Dialog>

    )
}
