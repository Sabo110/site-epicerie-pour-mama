"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import React from 'react'
import { partialsubSubCategoryFormSchema, subSubCategoryFormSchema } from "@/schemas/sub-sub-category"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllSC } from "@/actions/subCategory"
import slugify from 'react-slugify';

import { Form, } from "@/components/ui/form"
import { InputField } from "../../_components/input-field"
import { VisibleField } from "../../_components/visible-field"
import { SelectField } from "../../_components/select-field"
import { BtnSubmit } from "../../_components/btn-submit"
import { BtnCancel } from "../../_components/btn-cancel"
import { useSubSubcategory } from "@/app/store"
import { FileUploader } from "../../_components/file-uploader"
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
    mutationFn: (data: { data: CreateSSC, bannerImageFile: File }) => createSSC(data.data, data.bannerImageFile),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['subSubCategories'] })
      setFormVisible(false)
      showSuccessMessage(data.message)
    }
  })
  //mutation de mise a jour
  const updateM = useMutation({
    mutationFn: (data: { data: CreateSSC, bannerImageFile?: File }) => updateSSC(data.data, subSubCategory?.id!, data.bannerImageFile),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['subSubCategories'] })
      setFormVisible(false)
      showSuccessMessage(data.message)
    }
  })
  // le formulaire par defaut qui sera celui de la création d'une sous-sous categorie
  let form = useForm<formSchema>({
    resolver: zodResolver(!subSubCategory ? subSubCategoryFormSchema : partialsubSubCategoryFormSchema),
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
    //on recupere le fichier image de la baniere
    const { bannerImageFile, ...data } = values
    if (!subSubCategory) {
      createM.mutate({
        data: { ...data, ['slug']: slugify(data.name), ['bannerImageUrl']: "" },
        bannerImageFile
      })
    } else {
      updateM.mutate({
        data: { ...data, ['slug']: slugify(data.name), ['bannerImageUrl']: "" },
        bannerImageFile
      })
    }
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <p className='text-red-400 my-2'> {createM.error ? createM.error.message : updateM.error ? updateM.error.message : null} </p>
        <InputField name="name" control={form.control} label="Nom de la sous-sous-catégorie" placeholder="Entrer le nom de la sous-sous-catégorie" />
        <FileUploader control={form.control} name="bannerImageFile" label="Sélectionner la banière" />
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
