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
  <div class="reset-password-page container">
    <div class="reset-password-page__wrapper">
      <h1>
        <span class="desktop-text">Have you Forgotten Your Password ?</span>
        <span class="mobile-text">Lost password</span>
      </h1>
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

    @media (width <= $breakpoints-m) {
      padding-top: 24px;
      padding-bottom: 96px;
    }
  }

  .reset-password-page__wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 33px;
      font-weight: 500;
      line-height: 1.25;
      color: $color-black;

      .mobile-text {
        display: none;
      }

      @media (width <= $breakpoints-m) {
        margin-bottom: 16px;
        font-size: 24px;

        .desktop-text {
          display: none;
        }

        .mobile-text {
          display: inline;
        }
      }
    }

    .reset-description {
      max-width: 480px;
      margin: 0 auto 64px;
      font-size: 20px;
      font-weight: 400;
      line-height: 1.5;
      color: $color-black;

      @media (width <= $breakpoints-m) {
        margin-bottom: 32px;
        font-size: 14px;
        text-align: left;
      }
    }
  }
</style>
