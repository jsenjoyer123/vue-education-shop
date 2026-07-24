<script setup lang="ts">
  import { useToast } from '@/composables/useToast'
  import { useEmailValidation } from '@/composables/useEmailValidation'

  const toast = useToast()
  const { email, error: emailError, validate, handleInput } = useEmailValidation()

  const handleReset = () => {
    if (!validate()) return

    toast.show('Отправили пароль на email', 'success')
    email.value = ''
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
    <UIBaseButton type="submit" variant="primary"> RESET PASSWORD </UIBaseButton>
    <NuxtLink to="/account" class="back-link"> Back to Sign In </NuxtLink>
  </form>
</template>
