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
  <div class="reset-password-page">
    <div class="reset-password-container">
      <h1>Have you Forgotten Your Password ?</h1>
      <p class="reset-description">
        If you've forgotten your password, enter your e-mail address and we'll send you an e-mail
      </p>
      <AccountResetPasswordForm />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .reset-password-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 128px;
    padding-bottom: 250px;
  }

  .reset-password-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 514px;
    padding: 0;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 33px;
      font-weight: 500;
      line-height: 1.25;
      color: #000;
      white-space: nowrap;
    }

    .reset-description {
      max-width: 480px;
      margin: 0 auto 64px;
      font-size: 20px;
      font-weight: 400;
      line-height: 1.5;
      color: #000;
    }
  }
</style>
