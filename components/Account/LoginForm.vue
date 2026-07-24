<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import { useToast } from '@/composables/useToast'

  const authStore = useAuthStore()
  const router = useRouter()
  const toast = useToast()

  const username = ref('')
  const password = ref('')

  const handleLogin = async () => {
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
      <UIBaseInput v-model="username" label="Username" type="text" placeholder="username" />
    </div>
    <div class="form-control">
      <UIBaseInput v-model="password" label="Password" type="password" placeholder="••••••••" />
    </div>
    <UIBaseButton type="submit" variant="primary" size="lg" :disabled="authStore.isLoading">
      {{ authStore.isLoading ? 'Signing in...' : 'Sign In' }}
    </UIBaseButton>
    <NuxtLink to="/reset-password" class="forgot-link">Forgot password?</NuxtLink>
    <p v-if="authStore.error" class="login-error">{{ authStore.error }}</p>
  </form>
</template>
