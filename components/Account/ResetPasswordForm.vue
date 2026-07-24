<script setup lang="ts">
  import { ref } from 'vue'
  import { useToast } from '@/composables/useToast'

  const toast = useToast()
  const email = ref('')

  const handleReset = () => {
    if (!email.value.trim()) {
      toast.show('Please enter your email', 'error')
      return
    }

    toast.show('Отправили пароль на email', 'success')
    email.value = ''
  }
</script>

<template>
  <form class="reset-form" @submit.prevent="handleReset">
    <div class="form-control">
      <UIBaseInput v-model="email" type="email" placeholder="Enter your email" />
    </div>
    <UIBaseButton type="submit" variant="primary"> RESET PASSWORD </UIBaseButton>
    <NuxtLink to="/account" class="back-link"> Back to Sign In </NuxtLink>
  </form>
</template>
