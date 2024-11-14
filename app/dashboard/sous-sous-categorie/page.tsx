"use client"

import React from 'react'
import { Header } from '../_components/Header'
import { useSubSubcategory } from '@/app/store'
import { SubSubCategoryForm } from './_components/sub-sub-category-form'
import { useQuery } from '@tanstack/react-query'
import { getAllSSC } from '@/actions/sous-sous-category'
import { columns } from './_components/columns'
import { DataTable } from '../_components/data-table'

export default function page() {
  const {data, isPending, error} = useQuery({
    queryKey: ['subSubCategories'],
    queryFn: getAllSSC
  })
  const setSubSubCategory = useSubSubcategory((state) => state.setSubSubCategory)
  const setFormVisible = useSubSubcategory((state) => state.setFormVisible)
  const formVisible = useSubSubcategory((state) => state.formVisible)
  return (
    <div>
      <Header pageTitle='Sous-sous catégorie' btnTitle='Créer une sous-sous catégorie' setVisible={() => {
        setSubSubCategory(undefined)
        setFormVisible(true)
      }} />
      <div className='max-w-[400px] mt-4'>
        {formVisible ? <SubSubCategoryForm /> : null}
      </div>
      <div>
        {(data && !formVisible) ? <DataTable columns={columns} data={data} /> : null}
      </div>
    </div>
  )
}
