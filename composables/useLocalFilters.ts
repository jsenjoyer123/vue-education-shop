import { computed, type Ref } from 'vue'
import type { Product } from '@/types/api'
import { SortOption, StockStatusFilter, ProductBadge, type FiltersState } from '@/types/filters'

const stockFilters: Record<StockStatusFilter, (p: Product) => boolean> = {
  [StockStatusFilter.OnSale]: (p) => p.badge === ProductBadge.OnSale,
  [StockStatusFilter.InStock]: (p) => p.badge !== ProductBadge.SoldOut,
}

const sortStrategies: Record<SortOption, (a: Product, b: Product) => number> = {
  [SortOption.LowPrice]: (a, b) => a.price - b.price,
  [SortOption.HighPrice]: (a, b) => b.price - a.price,
}

export const useLocalFilters = (products: Ref<Product[] | null>, filters: FiltersState) => {
  const filteredProducts = computed(() => {
    if (!products.value) return []

    let result = [...products.value]

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter((p) => p.title?.toLowerCase().includes(query))
    }

    if (filters.stockStatus && stockFilters[filters.stockStatus]) {
      result = result.filter(stockFilters[filters.stockStatus])
    }

    if (filters.priceRange?.length === 2) {
      const [min, max] = filters.priceRange
      result = result.filter((p) => p.price >= min && p.price <= max)
    }

    if (filters.sort && sortStrategies[filters.sort]) {
      result.sort(sortStrategies[filters.sort])
    }

    return result
  })

  return { filteredProducts }
}
