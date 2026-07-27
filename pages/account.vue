<script setup lang="ts">
  import { ref } from 'vue'

  definePageMeta({
    middleware: ['guest'],
  })

  const activeTab = ref<'login' | 'register'>('login')
</script>

<template>
  <div class="account-page container">
    <div class="account-page__wrapper">
      <h1>My account</h1>
      <AccountAuthToggle v-model="activeTab" />
      <div class="tab-content">
        <AccountLoginForm v-if="activeTab === 'login'" />
        <div v-else-if="activeTab === 'register'" class="register-placeholder">
          <p>Registration form placeholder</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .account-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 128px;
    padding-bottom: 247px;

    @media (width <= 768px) {
      padding-top: 24px;
      padding-bottom: 96px;
    }
  }

  .account-page__wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;

    h1 {
      margin-bottom: 64px;
      font-size: 33px;
      font-weight: 500;
      color: #000;
      text-align: center;

      @media (width <= 768px) {
        margin-bottom: 24px;
      }
    }
  }

  .tab-content {
    display: flex;
    flex-direction: column;
    min-height: 380px;
  }

  .register-placeholder {
    padding: 32px 0;
    color: #666;
    text-align: center;
  }
</style>
