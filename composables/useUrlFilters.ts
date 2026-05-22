import { reactive, watch } from 'vue'
import { useRoute, useRouter, type LocationQueryValue } from 'vue-router'
import { type FiltersState, SortOption, StockStatusFilter } from '@/types/filters'

export const defaultFilters: FiltersState = {
  searchQuery: '',
  category: '',
  sort: SortOption.LowPrice,
  stockStatus: '',
  priceRange: [0, 1000],
}

const tuple = <T, U>(x: T, y: U): [T, U] => [x, y]

const parseStringQuery = (val: LocationQueryValue | LocationQueryValue[]) => {
  if (Array.isArray(val)) return val[0] ?? ''
  return val ?? ''
}

const isSortOption = (val: string): val is SortOption => {
  return Object.values(SortOption).includes(val as SortOption)
}

const isStockStatus = (val: string): val is StockStatusFilter => {
  return Object.values(StockStatusFilter).includes(val as StockStatusFilter)
}

const parsePriceRange = (val: LocationQueryValue | LocationQueryValue[]) => {
  const strVal = parseStringQuery(val)
  if (strVal) {
    const [min, max] = strVal.split(',').map(Number)
    if (!isNaN(min) && !isNaN(max)) {
      return tuple(min, max)
    }
  }

  return tuple(defaultFilters.priceRange[0], defaultFilters.priceRange[1])
}

export const useUrlFilters = () => {
  const route = useRoute()
  const router = useRouter()

  const initSort = parseStringQuery(route.query.sort)
  const initStock = parseStringQuery(route.query.stockStatus)

  const filters = reactive<FiltersState>({
    searchQuery: parseStringQuery(route.query.searchQuery) || defaultFilters.searchQuery,
    category: parseStringQuery(route.query.category) || defaultFilters.category,
    sort: isSortOption(initSort) ? initSort : defaultFilters.sort,
    stockStatus: isStockStatus(initStock) ? initStock : defaultFilters.stockStatus,
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
        } else if (typeof value === 'string' && value !== '') {
          query[key] = value
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
