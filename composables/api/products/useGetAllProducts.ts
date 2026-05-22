import { computed } from 'vue'
import type { Ref } from 'vue'
import { type Product, ProductBadge } from '@/types/api'
import { useApiFetch } from '@/composables/api/useApiFetch'

export const useGetAllProducts = (options: { limit?: number; category?: Ref<string> } = {}) => {
  const { limit, category } = options

  const getRequestUrl = () => {
    if (category?.value) {
      return `/products/category/${category.value}`
    }
    return '/products'
  }

  const { data, pending, error } = useApiFetch<Product[]>(getRequestUrl, {
    params: { limit },
  })

  const enrichedData = computed(() => {
    if (!data.value) return null

    return data.value.map((product) => {
      let badge: ProductBadge | null = null
      const pseudoRandom = product.id % 10

      if (pseudoRandom < 2) badge = ProductBadge.SoldOut
      else if (pseudoRandom < 5) badge = ProductBadge.OnSale

      return { ...product, badge }
    })
  })

  return {
    data: enrichedData,
    pending,
    error,
  }
}
