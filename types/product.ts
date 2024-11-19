import { SC } from "./subCategory"
import { SSC } from "./subSubCategory"

export type CreateP = {
    name: string
    slug: string
    description: string
    ingredients: string
    imageUrl: string
    price: number
    isFeatured: boolean
    isOnSale: boolean
    salePrice?: number 
    saleStartDate?: Date
    saleEndDate?: Date
    stockQuantity: number
    isNew: boolean
    packeding: boolean
    visible: boolean
    subCategoryId?: number
    subSubCategoryId?: number
}

export type P = {
    id:number
    name: string
    slug: string
    description: string
    ingredients: string
    imageUrl: string
    price: number
    isFeatured: boolean
    isOnSale: boolean
    salePrice: number | null
    saleStartDate: Date | null
    saleEndDate: Date | null
    stockQuantity: number | null
    isNew: boolean
    visible: boolean
    packeding: boolean
    subCategoryId: number | null
    subSubCategoryId: number | null
    createdAt: Date
    updatedAt: Date
    subCategory: SC | null
    subSubCategory: SSC | null
}