import type { Picture } from '@/types/api'

export const useGetImages = (options: { limit?: number } = {}) => {
  const { limit } = options
  const baseUrl = 'https://picsum.photos'

  return useFetch<Picture[]>('/v2/list', {
    baseURL: baseUrl,
    params: { limit },
    server: false,
    lazy: true,
  })
}
