import { create } from 'zustand'

type Store = {
  categoryFormIsVisible: boolean
  setVisible: (visible: boolean) => void
}

export const useCategoryFormIsVisible = create<Store>()((set) => ({
    categoryFormIsVisible: false,
    setVisible: (visible) => set(() => ({ categoryFormIsVisible: visible })),
}))
