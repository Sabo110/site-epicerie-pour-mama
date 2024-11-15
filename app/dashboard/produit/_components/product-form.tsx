"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import React from 'react'
import { productFormSchema, partialproductFormSchema } from "@/schemas/product"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllSC } from "@/actions/subCategory"
import { getAllSSC } from "@/actions/sous-sous-category"
import slugify from 'react-slugify';

import { Form, } from "@/components/ui/form"
import { InputField } from "../../_components/input-field"
import { VisibleField } from "../../_components/visible-field"
import { SelectField } from "../../_components/select-field"
import { BtnSubmit } from "../../_components/btn-submit"
import { BtnCancel } from "../../_components/btn-cancel"
import { useProduct } from "@/app/store"
import { FileUploader } from "../../_components/file-uploader"
import { createP, updateP } from "@/actions/product"
import { CreateP } from "@/types/product"
import { showSuccessMessage } from "@/lib/show-message"
import { TextAreaField } from "../../_components/text-area-field"
import { DateField } from "../../_components/date-field"
import { Button } from "@/components/ui/button"
import { UndoIcon } from "lucide-react"

export const ProductForm = () => {
  const queryClient = useQueryClient()
  const setFormVisible = useProduct((state) => state.setFormVisible)
  const product = useProduct((state) => state.product)
  type formSchema = z.infer<typeof productFormSchema>
  //recuperation des sous-categories
  const { data: subCategories, isPending: subCategoriesisPending, error: subCategorieserror } = useQuery({
    queryKey: ['subCategories'],
    queryFn: getAllSC
  })
  //recuperation des sous-sous-categories
  const { data: subSubCategories, isPending: subSubCategoriesisPending, error: subSubCategorieserror } = useQuery({
    queryKey: ['subSubCategories'],
    queryFn: getAllSSC
  })
  //mutation de création
  const createM = useMutation({
    mutationFn: (data: { data: CreateP, imageFile: File }) => createP(data.data, data.imageFile),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      setFormVisible(false)
      showSuccessMessage(data.message)
    }
  })
  //mutation de mise a jour
  const updateM = useMutation({
    mutationFn: (data: { data: CreateP, imageFile?: File }) => updateP(data.data, product?.id!, data.imageFile),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      setFormVisible(false)
      showSuccessMessage(data.message)
    }
  })
  // le formulaire par defaut qui sera celui de la création d'une sous-sous categorie
  let form = useForm<formSchema>({
    resolver: zodResolver(!product ? productFormSchema : partialproductFormSchema),
    defaultValues: product ? {
      name: product.name,
      description: product.description,
      price: product.price,
      visible: product.visible,
      isFeatured: product.isFeatured,
      isOnSale: product.isOnSale,
      isNew: product.isNew,
      packeding: product.packeding,
      salePrice: product.salePrice ? product.salePrice : undefined,
      saleStartDate: product.saleStartDate ? product.saleStartDate : undefined,
      saleEndDate: product.saleEndDate ? product.saleEndDate : undefined,
      subCategoryId: product.subCategoryId ? product.subCategoryId : undefined,
      subSubCategoryId: product.subSubCategoryId ? product.subSubCategoryId : undefined,
      stockQuantity: product.stockQuantity ? product.stockQuantity : undefined
    } : {
      name: "",
      description: "",
      price: 0,
      visible: true,
      isFeatured: false,
      isOnSale: false,
      isNew: false,
      packeding: false,
      salePrice: 1
    },
  })
  //ecoutons les changement de ces champ
  const [isOnSale, packeding] = form.watch(['isOnSale', 'packeding'])
  React.useEffect(() => {
    if (!product) {
      form.setValue("name", "")
      form.setValue("visible", true)
    }
  }, [product])
  // 2. Define a submit handler.
  function onSubmit(values: formSchema) {
    //on recupere le fichier image de la baniere
    const { imageFile, ...data } = values
    if (!data.isOnSale) {
      data.salePrice = undefined
    }
    if (!product) {
      createM.mutate({
        data: { ...data, ['slug']: slugify(data.name), ['imageUrl']: "" },
        imageFile
      })
    } else {
      updateM.mutate({
        data: { ...data, ['slug']: slugify(data.name), ['imageUrl']: "" },
        imageFile
      })
    }
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <p className='text-red-400 my-2'> {createM.error ? createM.error.message : updateM.error ? updateM.error.message : null} </p>
        <div className="flex flex-wrap items-center gap-4">
          <VisibleField name="isNew" label="Nouveau" control={form.control} />
          <VisibleField name="packeding" label="Packeding" control={form.control} />
          <VisibleField name="isFeatured" label="Phare" control={form.control} />
          <VisibleField name="isOnSale" label="Promotion" control={form.control} />
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <InputField name="name" control={form.control} label="Nom de la sous-sous-catégorie" placeholder="Entrer le nom de la sous-sous-catégorie" />
          <TextAreaField name="description" control={form.control} label="Description" placeholder="Entrer une description pour le produit" />
          <InputField name="price" control={form.control} label="Prix du produit" type="number" />
          <FileUploader control={form.control} name="imageFile" label="Sélectionner l'image du produit" />
          <InputField name="stockQuantity" control={form.control} label="Quantité en stock" type="number" />
          {!packeding ? <SelectField control={form.control} name="subCategoryId" label="Sous-catégorie" options={subCategories} isPending={subCategoriesisPending} valueKey="id" labelKey="name" placeholder="Sélectionner une sous-catégorie" /> : null}
          {!packeding ? <SelectField control={form.control} name="subSubCategoryId" label="Sous-sous-catégorie" options={subSubCategories} isPending={subSubCategoriesisPending} valueKey="id" labelKey="name" placeholder="Sélectionner une sous-sous-catégorie" /> : null}
          {isOnSale ? <InputField name="salePrice" control={form.control} label="Prix de promotion" type="number" /> : null}
          {isOnSale ? <DateField name="saleStartDate" control={form.control} label="Date de début de promotion" placeholder="Sélectionner une date" />: null}
          {isOnSale ? <DateField name="saleEndDate" control={form.control} label="Date de fin de promotion" placeholder="Sélectionner une date" />: null}
          <div className="flex flex-wrap items-center gap-3">
            <BtnSubmit label={product ? 'Modifier' : 'Créer'} isPending={(createM.isPending || updateM.isPending)} />
            <BtnCancel setVisible={() => setFormVisible(false)} />
            <Button variant={"outline"} onClick={() => form.reset()} >Rénitialiser</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

