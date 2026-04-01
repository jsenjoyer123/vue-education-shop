import type { Product } from '@/types/api'
import { useApiFetch } from '@/composables/api/useApiFetch'

export const useGetProductById = (id: number | string) => {
  return useApiFetch<Product>(`/products/${id}`)
}
