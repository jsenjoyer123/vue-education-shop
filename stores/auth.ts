import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  function login(token: string) {
    user.value = token
  }

  function logout() {
    user.value = null
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
  }
})
