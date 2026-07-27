<script setup lang="ts">
  import { ref } from 'vue'
  import { useToast } from '@/composables/useToast'
  import { useEmailValidation } from '@/composables/useEmailValidation'

  const toast = useToast()
  const { email, error: emailError, validate, handleInput } = useEmailValidation()

  const isLoading = ref(false)
  const isSuccess = ref(false)

  const handleReset = async () => {
    if (!validate()) return

    isLoading.value = true

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      isSuccess.value = true
      toast.show('Password reset link sent to your email', 'success')

      setTimeout(() => {
        isSuccess.value = false
        email.value = ''
      }, 1500)
    } catch {
      toast.show('Failed to send email. Please try again.', 'error')
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <form class="reset-form" @submit.prevent="handleReset">
    <div class="form-control">
      <UIBaseInput
        :model-value="email"
        type="email"
        placeholder="Email"
        :error="emailError"
        @update:model-value="handleInput"
      />
    </div>
    <UIBaseButton
      type="submit"
      variant="primary"
      class="submit-button"
      :loading="isLoading"
      :success="isSuccess"
    >
      RESET PASSWORD
    </UIBaseButton>

    <NuxtLink to="/account" class="back-link">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Back to Sign In
    </NuxtLink>
  </form>
</template>

<style scoped lang="scss">
  .reset-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .form-control {
    width: 100%;
    margin-bottom: 64px;
  }

  .submit-button {
    width: 500px;
    height: 53px;
    margin: 0 auto;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.5px;
    border-radius: 4px;
  }

  .back-link {
    display: inline-flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
    font-size: 16px;
    font-weight: 500;
    color: #000;
    text-decoration: none;
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }
</style>
