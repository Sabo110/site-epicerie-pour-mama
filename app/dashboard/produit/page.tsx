"use client"

import React from 'react'
import { Header } from '../_components/Header'
import { useProduct } from '@/app/store'
import { ProductForm } from './_components/product-form'
import { useQuery } from '@tanstack/react-query'
import { getAllP } from '@/actions/product'
import { DataTable } from '../_components/data-table'
import { columns } from './_components/columns'

export default function page() {
  const setFormVisible = useProduct((state) => state.setFormVisible)
  const setProduct = useProduct((state) => state.setProduct)
  const formVisible = useProduct((state) => state.formVisible)
  const {data, isPending, error} = useQuery({
    queryKey: ['products'],
    queryFn: getAllP
  })
  return (
    <div>
      <Header pageTitle='Produit' btnTitle='Créer un produit' setVisible={() => {
        setProduct(undefined)
        setFormVisible(true)
      }} />
      <div className='mt-4'>
        {formVisible ? <ProductForm /> : null}
      </div>
      <div>
        {(data && !formVisible) ? <DataTable columns={columns} data={data} /> : null}
      </div>
    </div>
  )
}
