import { reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const defaultFilters = {
  searchQuery: '',
  category: '',
  sort: 'low-price',
  stockStatus: '',
}

export const useUrlFilters = () => {
  const route = useRoute()
  const router = useRouter()

  const filters = reactive({
    searchQuery: (route.query.searchQuery as string) || defaultFilters.searchQuery,
    category: (route.query.category as string) || defaultFilters.category,
    sort: (route.query.sort as string) || defaultFilters.sort,
    stockStatus: (route.query.stockStatus as string) || defaultFilters.stockStatus,
  })

  watch(
    filters,
    (newFilters) => {
      const query = { ...route.query }

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) {
          query[key] = value
        } else {
          console.log('temp')
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
