export type CreateSC = {
    name: string
    slug: string
    visible: boolean
    categoryId: number
}

export type SC = {
    id: number
    name: string
    slug: string
    visible: boolean
    categoryId: number
    createdAt: Date
    updatedAt: Date
}