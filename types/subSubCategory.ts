export type CreateSSC = {
    name: string
    slug: string
    visible: boolean
    subCategoryId: number
}

export type SSC = {
    id: number
    name: string
    slug: string
    visible: boolean
    subCategoryId: number
    createdAt: Date
    updatedAt: Date
}