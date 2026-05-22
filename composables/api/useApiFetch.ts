import type { UseFetchOptions } from 'nuxt/app'

export const useApiFetch = <DataT = unknown>(
  request: string | (() => string),
  options?: UseFetchOptions<DataT>,
) => {
  const config = useRuntimeConfig()
  const authToken = useCookie('authToken')

  const defaults: UseFetchOptions<DataT> = {
    baseURL: options?.baseURL || config.public.apiBaseUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken.value ? `Bearer ${authToken.value}` : '',
    },
  }

  const params = { ...defaults, ...options }
  return useFetch(request, params)
}
