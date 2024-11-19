import { z } from "zod"
 
export const categoryFormSchema = z.object({
  name: z.string().min(1, "Champ obligatoire"),
  visible: z.boolean(),
  imageFile: z.instanceof(File, {message: "La bannière est obligatoire"})
  .refine((file) => file.size < 204800, "La taille de la bannière doit être indérieure à 200ko")
  .refine((file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type), "Les formats acceptés sont: png, jpeg ou jpg")
})

//pour la modification on rend le champ image file optionel donc peut etre undifined
export const categoryFormSchemaUpdate = categoryFormSchema.partial({
  imageFile: true
})