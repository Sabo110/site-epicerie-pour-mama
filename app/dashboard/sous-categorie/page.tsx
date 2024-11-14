"use client"

import React from 'react'
import { Header } from '../_components/Header'
import { useSubcategory } from '@/app/store'
import { SubCategoryForm } from './_components/sub-category-form'
import { useQuery } from '@tanstack/react-query'
import { getAllSC } from '@/actions/subCategory'
import { DataTable } from '../_components/data-table'
import { columns } from './_components/columns'

export default function page() {
  const {data, isPending, error} = useQuery({
    queryKey: ['subCategories'],
    queryFn: getAllSC
  })
    const setFormVisible = useSubcategory((state) => state.setFormVisible)
    const formVisible = useSubcategory((state) => state.formVisible)
    const setSubCategory = useSubcategory((state) => state.setSubCategory)
  return (
    <div>
        <Header btnTitle='Créer une sous-catégorie' pageTitle='Sous-catégorie'
        setVisible={() => {
          setSubCategory(undefined)
            setFormVisible(true)
        }}
         />
         <div className='max-w-[400px] mt-4'>
            {formVisible ? <SubCategoryForm /> : null}
         </div>
         <div>
          {(data && !formVisible) ? <DataTable data={data} columns={columns} /> : null}
         </div>
    </div>
  )
}
