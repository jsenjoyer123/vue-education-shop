import type { Product } from '@/types/api'
import { useApiFetch } from '@/composables/api/useApiFetch'

export const useGetAllProducts = (options: { limit?: number } = {}) => {
  const { limit } = options

  return useApiFetch<Product[]>('/products', {
    params: { limit },
  })
}
