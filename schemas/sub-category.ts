import { getDimensionsBanner } from "@/actions/get-dimensions-image"
import { z } from "zod"

export const subCategoryFormSchema = z.object({
  name: z.string().min(1, "Champ obligatoire"),
  visible: z.boolean(),
  bannerImageFile: z.instanceof(File, {message: "Obligatoire"})
  .refine((file) => file.size < 307200 , "Le fichier ne doit pas dépasser 300ko")
  .refine((file) => ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type), "Les formats acceptés sont: png, jpeg ou jpg")
  .refine( async (file) => await getDimensionsBanner(file, 1080, 350)  , "Les dimensions requis sont 1080x350px")
  .optional(),
  categoryId: z.number({required_error: "Champ obligatoire"})
})