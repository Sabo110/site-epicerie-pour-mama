
import { z } from "zod"

export const subCategoryFormSchema = z.object({
  name: z.string().min(1, "Champ obligatoire"),
  visible: z.boolean(),
  categoryId: z.number({required_error: "Champ obligatoire"})
})