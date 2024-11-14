import { create } from 'zustand'
import { C } from '../types/category'
import { SC } from '@/types/subCategory'
import { SSC } from '@/types/subSubCategory'


type visibleCategoryForm = {
  categoryFormIsVisible: boolean
  setVisible: (visible: boolean) => void
}

export const useCategoryFormIsVisible = create<visibleCategoryForm>()((set) => ({
    categoryFormIsVisible: false,
    setVisible: (visible) => set(() => ({ categoryFormIsVisible: visible })),
}))


type categoryUpdate = {
  category: C | undefined
  setCategory: (category: C | undefined) => void
}

export const useCategory = create<categoryUpdate>((set) => ({
  category: undefined,
  setCategory: (category) => set({category})
}))

//subcategory
type subCategory = {
  formVisible: boolean
  setFormVisible: (visible: boolean) => void
  subCategory: SC | undefined
  setSubCategory: (subCategory: SC | undefined) => void
}
export const useSubcategory = create<subCategory>((set) => ({
  formVisible: false,
  setFormVisible: (visible) => set({formVisible: visible}),
  subCategory: undefined,
  setSubCategory: (subCategory) => set({subCategory})
}))

//subsubcategory
type subSubCategory = {
  formVisible: boolean
  setFormVisible: (visible: boolean) => void
  subSubCategory: SSC | undefined
  setSubSubCategory: (subSubCategory: SSC | undefined) => void
}
export const useSubSubcategory = create<subSubCategory>((set) => ({
  formVisible: false,
  setFormVisible: (visible) => set({formVisible: visible}),
  subSubCategory: undefined,
  setSubSubCategory: (subSubCategory) => set({subSubCategory})
}))
