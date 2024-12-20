import { create } from 'zustand'
import { C } from '../types/category'
import { SC } from '@/types/subCategory'
import { SSC } from '@/types/subSubCategory'
import { P } from '@/types/product'


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
  setCategory: (category) => set({ category })
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
  setFormVisible: (visible) => set({ formVisible: visible }),
  subCategory: undefined,
  setSubCategory: (subCategory) => set({ subCategory })
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
  setFormVisible: (visible) => set({ formVisible: visible }),
  subSubCategory: undefined,
  setSubSubCategory: (subSubCategory) => set({ subSubCategory })
}))

//product
type product = {
  formVisible: boolean
  setFormVisible: (visible: boolean) => void
  product: P | undefined
  setProduct: (product: P | undefined) => void
}
export const useProduct = create<product>((set) => ({
  formVisible: false,
  setFormVisible: (visible) => set({ formVisible: visible }),
  product: undefined,
  setProduct: (product) => set({ product })
}))

//le store qui servira d'ecouter la valeur du champ input pour pouvoir rechercher un produit a partir de son nom
type SearchP = {
  name: string
  setName: (name: string) => void
}


export const useSearchP = create<SearchP>((set) => ({
  name: "",
  setName: (name) => set({name})
}))