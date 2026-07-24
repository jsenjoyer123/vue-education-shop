interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse {
  token: string
}

export const usePostLogin = () => {
  const config = useRuntimeConfig()

  const execute = (body: LoginRequest) => {
    return $fetch<LoginResponse>('/auth/login', {
      baseURL: config.public.apiBaseUrl,
      method: 'POST',
      body,
    })
  }

  return { execute }
}
