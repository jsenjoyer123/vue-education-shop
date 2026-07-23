<script setup lang="ts">
  import { ref } from 'vue'

  const activeTab = ref<'login' | 'register'>('login')
</script>

<template>
  <div class="account-page">
    <div class="accont-container">
      <h1>Authentication</h1>
      <AccountLoginForm v-if="activeTab === 'login'" />
      <div v-else-if="activeTab === 'register'">
        <p>Registration form placeholder</p>
      </div>
    </div>
  </div>
</template>
