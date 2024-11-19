"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import React from 'react'
import { subCategoryFormSchema } from "@/schemas/sub-category"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllC } from "@/actions/category"
import slugify from 'react-slugify';

import { Form, } from "@/components/ui/form"
import { InputField } from "../../_components/input-field"
import { VisibleField } from "../../_components/visible-field"
import { SelectField } from "../../_components/select-field"
import { BtnSubmit } from "../../_components/btn-submit"
import { BtnCancel } from "../../_components/btn-cancel"
import { useSubcategory } from "@/app/store"
import { createSC, updateSC } from "@/actions/subCategory"
import { CreateSC } from "@/types/subCategory"
import { showSuccessMessage } from "@/lib/show-message"

export const SubCategoryForm = () => {
  const queryClient = useQueryClient()
  type formSchema = z.infer<typeof subCategoryFormSchema>
  const setFormVisible = useSubcategory((state) => state.setFormVisible)
  const subCategory = useSubcategory((state) => state.subCategory)
  //recuperation des categories
  const { data, isPending, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllC
  })
  //mutation de création
  const createM = useMutation({
    mutationFn: (data: CreateSC) => createSC(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['subCategories']})
      setFormVisible(false)
      showSuccessMessage(data.message)
    }
  })
  //mutation de mise a jour
  const updateM = useMutation({
    mutationFn: (data: CreateSC) => updateSC(data, subCategory?.id!),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['subCategories']})
      setFormVisible(false)
      showSuccessMessage(data.message)
    }
  })
  // 1. Define your form.
  const form = useForm<formSchema>({
    resolver: zodResolver(subCategoryFormSchema),
    defaultValues: subCategory ? {
      name: subCategory.name,
      visible: subCategory.visible,
      categoryId: subCategory.categoryId
    } : {
      name: "",
      visible: true
    },
  })
  React.useEffect(() => {
    if (!subCategory) {
      form.setValue("name",  "")
      form.setValue("visible", true)
    }
  }, [subCategory])
  // 2. Define a submit handler.
  function onSubmit(values: formSchema) {
    const slug = slugify(values.name)
    if (!subCategory) {
      createM.mutate({...values, ['slug']: slug})
    } else {
      updateM.mutate({...values, ['slug']: slug})
    }
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <p className='text-red-400 my-2'> {createM.error ? createM.error.message : updateM.error ? updateM.error.message : null} </p>
        <InputField name="name" control={form.control} label="Nom de la sous-catégorie" placeholder="Entrer le nom de la sous-catégorie" />
        <VisibleField name="visible" label="Visible" control={form.control} />
        <SelectField control={form.control} name="categoryId" label="Catégorie" options={data} isPending={isPending} valueKey="id" labelKey="name" placeholder="Sélectionner une catégorie" />
        <div className="flex items-center gap-3">
          <BtnSubmit label={subCategory ? 'Modifier' : 'Créer'} isPending={(createM.isPending || updateM.isPending)} />
          <BtnCancel setVisible={() => setFormVisible(false)} />
        </div>
      </form>
    </Form>
  )
}
