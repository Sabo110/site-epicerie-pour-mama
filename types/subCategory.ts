export type CreateSC = {
    name: string
    slug: string
    visible: boolean
    bannerImageUrl?: string
    categoryId: number
}

export type SC = {
    id: number
    name: string
    slug: string
    visible: boolean
    bannerImageUrl: string | null
    categoryId: number
    createdAt: Date
    updatedAt: Date
}