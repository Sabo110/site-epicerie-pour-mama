"use client"

import React from 'react'
import { Header } from '../_components/Header'
import { CategoryForm } from './_components/category-form'
import { useCategoryFormIsVisible } from '@/app/store'

export default function Category() {
  const categoryFormIsVisible = useCategoryFormIsVisible((state) => state.categoryFormIsVisible)
  const setVisible = useCategoryFormIsVisible((state) => state.setVisible)

  return (
    <div>
      <Header pageTitle='Catégorie' btnTitle='Créer une catégorie' setVisible={() => setVisible(true)} />
      <div className='max-w-[400px] mt-4'>
        {categoryFormIsVisible ? <CategoryForm /> : null}
      </div>
    </div>
  )
}
