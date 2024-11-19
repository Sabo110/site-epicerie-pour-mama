
import { z } from "zod"

export const subSubCategoryFormSchema = z.object({
  name: z.string().min(1, "Champ obligatoire"),
  visible: z.boolean(),
  subCategoryId: z.number({required_error: "Champ obligatoire"})
})
