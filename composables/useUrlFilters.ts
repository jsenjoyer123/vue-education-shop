import { reactive, watch } from 'vue'
import { useRoute, useRouter, type LocationQueryValue } from 'vue-router'

import { type FiltersState, SortOption, type StockStatusFilter } from '@/types/filters'

export const defaultFilters: FiltersState = {
  searchQuery: '',
  category: '',
  sort: SortOption.LowPrice,
  stockStatus: '',
  priceRange: [0, 1000],
}

const parsePriceRange = (val: LocationQueryValue | LocationQueryValue[]): [number, number] => {
  if (typeof val === 'string') {
    const [min, max] = val.split(',').map(Number)
    if (!isNaN(min) && !isNaN(max)) {
      return [min, max]
    }
  }
  return [...defaultFilters.priceRange]
}

export const useUrlFilters = () => {
  const route = useRoute()
  const router = useRouter()

  const filters = reactive<FiltersState>({
    searchQuery: (route.query.searchQuery as string) || defaultFilters.searchQuery,
    category: (route.query.category as string) || defaultFilters.category,
    sort: (route.query.sort as SortOption) || defaultFilters.sort,
    stockStatus: (route.query.stockStatus as StockStatusFilter) || defaultFilters.stockStatus,
    priceRange: parsePriceRange(route.query.priceRange),
  })

  watch(
    filters,
    (newFilters) => {
      const query: Record<string, string | undefined> = {
        ...(route.query as Record<string, string>),
      }

      Object.entries(newFilters).forEach(([key, value]) => {
        if (key === 'priceRange' && Array.isArray(value)) {
          if (
            value[0] !== defaultFilters.priceRange[0] ||
            value[1] !== defaultFilters.priceRange[1]
          ) {
            query[key] = `${value[0]},${value[1]}`
          } else {
            query[key] = undefined
          }
        } else if (value) {
          query[key] = value as string
        } else {
          query[key] = undefined
        }
      })

      query.page = '1'

      router.push({ query })
    },
    { deep: true },
  )

  return {
    filters,
  }
}
