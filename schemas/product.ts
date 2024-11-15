import { getDimensionsBanner } from "@/actions/get-dimensions-image"
import { z } from "zod"

export const productFormSchema = z.object({
  name: z.string().min(1, "Champ obligatoire"),
  description: z.string().min(1, "Champ obligatoire"),
  price: z.number().positive("Le prix doit doit être positive"),
  isFeatured: z.boolean(),
  isOnSale: z.boolean(),
  salePrice: z.number().positive("Le prix doit être positif").optional(),
  saleStartDate: z.date().optional(),
  saleEndDate: z.date().optional(),
  stockQuantity: z.number().positive("La quantité en stock doit être positive").optional(),
  isNew: z.boolean(),
  packeding: z.boolean(),
  subCategoryId: z.number().optional(),
  subSubCategoryId: z.number().optional(),
  visible: z.boolean(),
  imageFile: z.instanceof(File, {message: "Obligatoire"})
  .refine((file) => file.size < 102400 , "Le fichier ne doit pas dépasser 100ko")
  .refine((file) => ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type), "Les formats acceptés sont: png, jpeg ou jpg")
  .refine( async (file) => await getDimensionsBanner(file, 250, 250)  , "Les dimensions requis sont 250x250px"),
}).refine((data) => {
  if (data.isOnSale) {
    return data.saleStartDate != undefined
  }
  return true
}, {
  message: "Le produit définit en promotion cette date est obligatoire",
  path: ["saleStartDate"]
}).refine((data) => {
  if (data.isOnSale) {
    return data.saleEndDate != undefined
  }
  return true
}, {
  message: "Le produit définit en promotion cette date est obligatoire",
  path: ["saleEndDate"]
}).refine((data) => {
  if (data.isOnSale) {
    return data.salePrice != undefined
  }
  return true
}, {
  message: "Le produit définit en promotion le prix de promotion est obligatoire",
  path: ["salePrice"]
})

export const partialproductFormSchema = z.object({
  name: z.string().min(1, "Champ obligatoire"),
  description: z.string().min(1, "Champ obligatoire"),
  price: z.number().positive("Le prix doit doit être positive"),
  isFeatured: z.boolean(),
  isOnSale: z.boolean(),
  salePrice: z.number().positive("Le prix doit être positif").optional(),
  saleStartDate: z.date().optional(),
  saleEndDate: z.date().optional(),
  stockQuantity: z.number().positive("La quantité en stock doit être positive").optional(),
  isNew: z.boolean(),
  packeding: z.boolean(),
  subCategoryId: z.number().optional(),
  subSubCategoryId: z.number().optional(),
  visible: z.boolean(),
  imageFile: z.instanceof(File, {message: "Obligatoire"})
  .refine((file) => file.size < 102400 , "Le fichier ne doit pas dépasser 100ko")
  .refine((file) => ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type), "Les formats acceptés sont: png, jpeg ou jpg")
  .refine( async (file) => await getDimensionsBanner(file, 250, 250)  , "Les dimensions requis sont 250x250px").optional(),
})