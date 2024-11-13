"use client"

import React from 'react'
import { Header } from '../_components/Header'
import { CategoryForm } from './_components/category-form'
import { useCategory, useCategoryFormIsVisible } from '@/app/store'
import { DataTable } from '../_components/data-table'
import { columns } from './_components/columns'
import { useQuery } from '@tanstack/react-query'
import { getAllC } from '@/actions/category'

export default function Category() {
  const categoryFormIsVisible = useCategoryFormIsVisible((state) => state.categoryFormIsVisible)
  const setVisible = useCategoryFormIsVisible((state) => state.setVisible)
  const setCategory = useCategory((state) => state.setCategory)
  const { isPending, data, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllC
  })
  return (
    <div>
      <Header pageTitle='Catégorie' btnTitle='Créer une catégorie' setVisible={() => {
        setCategory(undefined)
        setVisible(true)
      }} />
      <div className='max-w-[400px] mt-4'>
        {categoryFormIsVisible ? <CategoryForm /> : null}
      </div>
      <div>
        {(data && !categoryFormIsVisible) ? <DataTable columns={columns} data={data} /> : null}
      </div>
    </div>
  )
}
