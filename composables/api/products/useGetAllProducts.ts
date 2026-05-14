import type { Product } from '@/types/api'
import { useApiFetch } from '@/composables/api/useApiFetch'

export const useGetAllProducts = (options: { limit?: number } = {}) => {
  const { limit } = options

  const { data, pending, error } = useApiFetch<Product[]>('/products', {
    params: { limit },
  })

  const enrichedData = computed(() => {
    if (!data.value) return null

    return data.value.map((product) => {
      let badge: Product['badge'] = null

      const pseudoRandom = product.id % 10

      if (pseudoRandom < 2) {
        badge = 'sold-out'
      } else if (pseudoRandom < 5) {
        badge = 'on-sale'
      }
      return {
        ...product,
        badge,
      }
    })
  })

  return {
    data: enrichedData,
    pending,
    error,
  }
}
