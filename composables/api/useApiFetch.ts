import type { UseFetchOptions } from 'nuxt/app'

export const useApiFetch = <DataT = unknown>(request: string, options?: UseFetchOptions<DataT>) => {
  const config = useRuntimeConfig()
  const authToken = useCookie<string | null>('authToken')

  if (!config.public.apiBaseUrl) {
    throw new Error('public.apiBaseUrl is not set')
  }

  const defaults: UseFetchOptions<DataT> = {
    baseURL: config.public.apiBaseUrl,
    key: request + JSON.stringify(options?.params),
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken.value ? `Bearer ${authToken.value}` : '',
    },
  }
  // *Уточнить про spread здесь
  return useFetch(request, { ...defaults, ...options })
}
