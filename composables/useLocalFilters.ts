import { computed, type Ref } from 'vue'
import type { Product } from '@/types/api'

export interface FiltersState {
  searchQuery: string
  category: string
  sort: string
  stockStatus: string
}

export const useLocalFilters = (products: Ref<Product[] | null>, filters: FiltersState) => {
  const filteredProducts = computed(() => {
    if (!products.value) return []

    let result = [...products.value]

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter((product) => product.title?.toLowerCase().includes(query))
    }

    if (filters.stockStatus === 'on-sale') {
      result = result.filter((product) => product.badge === 'on-sale')
    } else if (filters.stockStatus === 'in-stock') {
      result = result.filter((product) => product.badge !== 'sold-out')
    }

    if (filters.sort === 'low-price') {
      result.sort((a, b) => a.price - b.price)
    } else if (filters.sort === 'high-price') {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  })

  return {
    filteredProducts,
  }
}
