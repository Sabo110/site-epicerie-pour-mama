"use client"

import { ColumnDef } from "@tanstack/react-table"
import { C } from "@/app/types/category"
import { formatDate } from "@/lib/format-date"

export const columns: ColumnDef<C>[] = [
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
]
