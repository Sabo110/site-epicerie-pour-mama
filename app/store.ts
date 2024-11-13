import { create } from 'zustand'
import { C } from './types/category'

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
