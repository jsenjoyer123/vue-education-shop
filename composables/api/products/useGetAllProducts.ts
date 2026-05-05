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
      const rand = Math.random()
      let badge: Product['badge'] = null
      if (rand < 0.2) {
        badge = 'sold-out'
      } else if (rand < 0.5) {
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
