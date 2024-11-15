"use client"
import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { P } from "@/types/product"
import { formatDate } from "@/lib/format-date"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { useProduct } from "@/app/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteP } from "@/actions/product"
import { showErrorMessage, showSuccessMessage } from "@/lib/show-message"
import { DialogDelete } from "../../_components/DialogDelete"

export const columns: ColumnDef<P>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "name",
        header: "Nom",
    },
    {
        accessorKey: "createdAt",
        header: "Date de création",
        cell: ({ row }) => {
            const date = row.original.createdAt
            return <div className=""> {formatDate(date)} </div>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const product = row.original
            const setProduct = useProduct((state) => state.setProduct)
            const setFormVisible = useProduct((state) => state.setFormVisible)
            const [open, setOpen] = React.useState(false)
            const queryClient = useQueryClient()
            const mutation = useMutation({
                mutationFn: () => deleteP([product.id]),
                onSuccess: (data) => {
                    queryClient.invalidateQueries({ queryKey: ['products'] })
                    setOpen(false)
                    showSuccessMessage(data.message)
                },
                onError: (error) => {
                    queryClient.invalidateQueries({ queryKey: ['products'] })
                    setOpen(false)
                    showErrorMessage(error.message)
                }
            })
            return (
                <>
                    <DialogDelete title={"Voulez-vous supprimer cette sous-catégorie ? " + product.name} isPending={mutation.isPending} open={open} onOpenChange={setOpen} onClick={() => mutation.mutate()} />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {
                                setProduct(product)
                                setFormVisible(true)
                            }}>Modifier</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                                setOpen(true)
                            }}>Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )
        },
    },
]
