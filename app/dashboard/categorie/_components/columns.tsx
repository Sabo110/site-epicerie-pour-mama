"use client"
import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { C } from "@/app/types/category"
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
import { useCategory, useCategoryFormIsVisible } from "@/app/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteC } from "@/actions/category"
import { showErrorMessage, showSuccessMessage } from "@/lib/show-message"
import { DialogDelete } from "../../_components/DialogDelete"

export const columns: ColumnDef<C>[] = [
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
            const category = row.original
            const setCategory = useCategory((state) => state.setCategory)
            const setVisible = useCategoryFormIsVisible((state) => state.setVisible)
            const [open, setOpen] = React.useState(false)
            const queryClient = useQueryClient()
            const mutation = useMutation({
                mutationFn: () => deleteC([category.id]),
                onSuccess: (data) => {
                    queryClient.invalidateQueries({ queryKey: ['categories'] })
                    setOpen(false)
                    showSuccessMessage(data.message)
                },
                onError: (error) => {
                    queryClient.invalidateQueries({ queryKey: ['categories'] })
                    setOpen(false)
                    showErrorMessage(error.message)
                }
            })
            return (
                <>
                    <DialogDelete title={"Voulez-vous supprimer cette catégorie ? " + category.name} isPending={mutation.isPending} open={open} onOpenChange={setOpen} onClick={() => mutation.mutate()} />
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
                                setCategory(category)
                                setVisible(true)
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
