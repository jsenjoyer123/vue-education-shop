<script setup lang="ts">
  definePageMeta({
    middleware: ['guest'],
  })

  useHead({
    title: 'Reset Password',
    meta: [{ name: 'description', content: 'Reset your account password' }],
  })
</script>

<template>
  <div class="account-page">
    <div class="accont-container">
      <h1>Reset Password</h1>
      <p class="reset-description">Enter your email address and we'll send you a new password.</p>
      <AccountResetPasswordForm />
    </div>
  </div>
</template>
