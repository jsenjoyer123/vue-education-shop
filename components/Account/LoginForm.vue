<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import { useToast } from '@/composables/useToast'
  import { validateUsername, validatePassword } from '@/utils/validation'

  const authStore = useAuthStore()
  const router = useRouter()
  const toast = useToast()

  const username = ref('mor_2314')
  const password = ref('83r5^_')
  const rememberMe = ref(false)
  const usernameError = ref('')
  const passwordError = ref('')
  const isSuccess = ref(false)

  const handleLogin = async () => {
    usernameError.value = validateUsername(username.value) ?? ''
    passwordError.value = validatePassword(password.value) ?? ''

    if (usernameError.value || passwordError.value) return

    const success = await authStore.login(username.value, password.value)

    if (success) {
      isSuccess.value = true
      toast.show('Successfully logged in!', 'success')

      setTimeout(() => {
        router.push('/')
      }, 800)
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
        type="text"
        placeholder="Username"
        :error="usernameError"
        @update:model-value="usernameError = ''"
      />
    </div>
    <div class="form-control">
      <UIBaseInput
        v-model="password"
        type="password"
        placeholder="Password"
        :error="passwordError"
        @update:model-value="passwordError = ''"
      />
    </div>

    <div class="remember-me">
      <input id="remember" v-model="rememberMe" type="checkbox" class="remember-checkbox" />
      <label for="remember" class="remember-label">Remember me</label>
    </div>

    <UIBaseButton
      type="submit"
      variant="primary"
      class="submit-button"
      :loading="authStore.isLoading"
      :success="isSuccess"
    >
      SIGN IN
    </UIBaseButton>

    <NuxtLink to="/reset-password" class="forgot-link">
      Have you forgotten your password?
    </NuxtLink>
  </form>
</template>

<style scoped lang="scss">
  .login-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 16px;
  }

  .form-control {
    margin-bottom: 46px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .remember-me {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 15px;
    margin-bottom: 69px;

    .remember-checkbox {
      width: 18px;
      height: 18px;
      accent-color: #000;
      cursor: pointer;
      border: 1px solid #d8d8d8;
      border-radius: 2px;
    }

    .remember-label {
      font-size: 16px;
      color: #000;
      cursor: pointer;
      user-select: none;
    }
  }

  .submit-button {
    width: 100%;
    height: 53px;
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.5px;
    border-radius: 4px;
  }

  .forgot-link {
    font-size: 16px;
    color: #000;
    text-align: center;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.7;
    }
  }
</style>
