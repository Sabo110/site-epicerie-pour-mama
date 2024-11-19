"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import React from 'react'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllSC } from "@/actions/subCategory"
import slugify from 'react-slugify';
import { subSubCategoryFormSchema } from "@/schemas/sub-sub-category"
import { Form, } from "@/components/ui/form"
import { InputField } from "../../_components/input-field"
import { VisibleField } from "../../_components/visible-field"
import { SelectField } from "../../_components/select-field"
import { BtnSubmit } from "../../_components/btn-submit"
import { BtnCancel } from "../../_components/btn-cancel"
import { useSubSubcategory } from "@/app/store"
import { createSSC, updateSSC } from "@/actions/sous-sous-category"
import { CreateSSC } from "@/types/subSubCategory"
import { showSuccessMessage } from "@/lib/show-message"

export const SubSubCategoryForm = () => {
  const queryClient = useQueryClient()
  const setFormVisible = useSubSubcategory((state) => state.setFormVisible)
  const subSubCategory = useSubSubcategory((state) => state.subSubCategory)
  type formSchema = z.infer<typeof subSubCategoryFormSchema>
  //recuperation des sous-categories
  const { data, isPending, error } = useQuery({
    queryKey: ['subCategories'],
    queryFn: getAllSC
  })
  //mutation de création
  const createM = useMutation({
    mutationFn: (data: CreateSSC) => createSSC(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['subSubCategories'] })
      setFormVisible(false)
      showSuccessMessage(data.message)
    }
  })
  //mutation de mise a jour
  const updateM = useMutation({
    mutationFn: (data: CreateSSC) => updateSSC(data, subSubCategory?.id!),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['subSubCategories'] })
      setFormVisible(false)
      showSuccessMessage(data.message)
    }
  })
  // le formulaire par defaut qui sera celui de la création d'une sous-sous categorie
  let form = useForm<formSchema>({
    resolver: zodResolver(subSubCategoryFormSchema),
    defaultValues: subSubCategory ? {
      name: subSubCategory.name,
      visible: subSubCategory.visible,
      subCategoryId: subSubCategory.subCategoryId
    } : {
      name: "",
      visible: true
    },
  })
  React.useEffect(() => {
    if (!subSubCategory) {
      form.setValue("name", "")
      form.setValue("visible", true)
    }
  }, [subSubCategory])
  // 2. Define a submit handler.
  function onSubmit(values: formSchema) {
    //on genere le slug
    const slug = slugify(values.name)
    if (!subSubCategory) {
      createM.mutate({ ...values, ['slug']: slug})
    } else {
      updateM.mutate({ ...values, ['slug']: slug})
    }
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <p className='text-red-400 my-2'> {createM.error ? createM.error.message : updateM.error ? updateM.error.message : null} </p>
        <InputField name="name" control={form.control} label="Nom de la sous-sous-catégorie" placeholder="Entrer le nom de la sous-sous-catégorie" />
        <VisibleField name="visible" label="Visible" control={form.control} />
        <SelectField control={form.control} name="subCategoryId" label="Sous-catégorie" options={data} isPending={isPending} valueKey="id" labelKey="name" placeholder="Sélectionner une sous-catégorie" />
        <div className="flex items-center gap-3">
          <BtnSubmit label={subSubCategory ? 'Modifier' : 'Créer'} isPending={(createM.isPending || updateM.isPending)} />
          <BtnCancel setVisible={() => setFormVisible(false)} />
        </div>
      </form>
    </Form>
  )
}
