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
        placeholder="Enter your email"
        :error="emailError"
        @update:model-value="handleInput"
      />
    </div>
    <UIBaseButton type="submit" variant="primary" :loading="isLoading" :success="isSuccess">
      RESET PASSWORD
    </UIBaseButton>
    <NuxtLink to="/account" class="back-link"> Back to Sign In </NuxtLink>
  </form>
</template>
