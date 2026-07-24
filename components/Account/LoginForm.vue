<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import { useToast } from '@/composables/useToast'
  import { validateUsername, validatePassword } from '@/utils/validation'

  const authStore = useAuthStore()
  const router = useRouter()
  const toast = useToast()

  const username = ref('')
  const password = ref('')
  const usernameError = ref('')
  const passwordError = ref('')

  const handleLogin = async () => {
    usernameError.value = validateUsername(username.value) ?? ''
    passwordError.value = validatePassword(password.value) ?? ''

    if (usernameError.value || passwordError.value) return

    const success = await authStore.login(username.value, password.value)

    if (success) {
      toast.show('Successfully logged in!', 'success')
      router.push('/')
    } else {
      toast.show(authStore.error || 'Authorization failed', 'error')
    }
  }
</script>

<template>
  <form class="login-form" @submit.prevent="handleLogin">
    <div class="form-control">
      <UIBaseInput
        v-model="username"
        label="Username"
        type="text"
        placeholder="username"
        :error="usernameError"
        @update:model-value="usernameError = ''"
      />
    </div>
    <div class="form-control">
      <UIBaseInput
        v-model="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        :error="passwordError"
        @update:model-value="passwordError = ''"
      />
    </div>
    <UIBaseButton type="submit" variant="primary" size="lg" :disabled="authStore.isLoading">
      {{ authStore.isLoading ? 'Signing in...' : 'Sign In' }}
    </UIBaseButton>
    <NuxtLink to="/reset-password" class="forgot-link">Forgot password?</NuxtLink>
    <p v-if="authStore.error" class="login-error">{{ authStore.error }}</p>
  </form>
</template>
