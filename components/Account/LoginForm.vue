<script setup lang="ts">
  import { ref } from 'vue'

  const email = ref('')
  const password = ref('')

  const handleLogin = async () => {
    console.log('Login attempt:', email.value, password.value)
  }
</script>

<template>
  <form class="login-form" @submit.prevent="handleLogin">
    <div class="form-control">
      <UIBaseInput v-model="email" label="Email" type="email" placeholder="email" />
    </div>
    <div class="form-control">
      <UIBaseInput v-model="password" label="Password" type="password" placeholder="••••••••" />
    </div>
    <UIBaseButton type="submit" variant="primary" size="lg">Sign In</UIBaseButton>
  </form>
</template>
