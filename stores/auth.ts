import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { usePostLogin } from '@/composables/api/auth/usePostLogin'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(username: string, password: string) {
    isLoading.value = true
    error.value = null

    try {
      const { execute } = usePostLogin()
      const response = await execute({ username, password })

      if (response?.token) {
        token.value = response.token
        return true
      }

      error.value = 'Token not received'
      return false
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Authorization failed'
      error.value = message
      return false
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    token.value = null
  }

  return {
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
  }
})
