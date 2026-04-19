import type { Picture } from '@/types/api'
import { useApiFetch } from '@/composables/api/useApiFetch'

export const useGetImages = (options: { limit?: number } = {}) => {
  const { limit } = options
  const baseUrl = 'https://picsum.photos'

  return useApiFetch<Picture[]>('/v2/list', {
    baseURL: baseUrl,
    params: { limit },
  })
}
