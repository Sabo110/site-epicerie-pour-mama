"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { categoryFormSchema } from '@/app/schemas/category'
import { z } from "zod"
import { useCategoryFormIsVisible } from '@/app/store'

import { Form, } from "@/components/ui/form"
import { InputField } from '../../_components/input-field'
import { VisibleField } from '../../_components/visible-field'
import { BtnSubmit } from '../../_components/btn-submit'
import { BtnCancel } from '../../_components/btn-cancel'


export const CategoryForm = () => {
  const setVisible = useCategoryFormIsVisible((state) => state.setVisible)
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
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputField name='name' placeholder='Entrer le nom de la catégorie' control={form.control} label='Nom de la catégorie' />
        <VisibleField control={form.control} name='visible' label='Visible' />
        <div className='flex items-center gap-4'>
          <BtnSubmit label='Créerp' />
          <BtnCancel setVisible={() => setVisible(false)} />
        </div>
      </form>
    </Form>
  )
}
