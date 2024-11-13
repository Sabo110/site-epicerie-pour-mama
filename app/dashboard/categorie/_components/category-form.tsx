"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { categoryFormSchema } from '@/app/schemas/category'
import { z } from "zod"
import { useCategoryFormIsVisible } from '@/app/store'
import { createC } from '@/app/actions/category'
import { useMutation } from '@tanstack/react-query'
import slugify from 'react-slugify';

import { Form, } from "@/components/ui/form"
import { InputField } from '../../_components/input-field'
import { VisibleField } from '../../_components/visible-field'
import { BtnSubmit } from '../../_components/btn-submit'
import { BtnCancel } from '../../_components/btn-cancel'
import { CreateC } from '@/app/types/category'
import { showSuccessMessage } from '@/lib/show-message'


export const CategoryForm = () => {
  const setVisible = useCategoryFormIsVisible((state) => state.setVisible)
  //mutation de creation
  const createM = useMutation({
    mutationFn: (data: CreateC) => createC(data),
    onSuccess: (data) => {
      showSuccessMessage(data.message)
    }
  })
  type formSchema = z.infer<typeof categoryFormSchema>
  // 1. Define your form.
  const form = useForm<formSchema>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      visible: true
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: formSchema) {
    //on genere le slug
    const slug = slugify(values.name);
    console.log(values)
    createM.mutate({...values, ['slug']: slug})
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {createM.error ? <p className='text-red-400 my-2'> {createM.error.message} </p> : null}
        <InputField name='name' placeholder='Entrer le nom de la catégorie' control={form.control} label='Nom de la catégorie' />
        <VisibleField control={form.control} name='visible' label='Visible' />
        <div className='flex items-center gap-4'>
          <BtnSubmit label='Créer' isPending={createM.isPending} />
          <BtnCancel setVisible={() => setVisible(false)} />
        </div>
      </form>
    </Form>
  )
}
