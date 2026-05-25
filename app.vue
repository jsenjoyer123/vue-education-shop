<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ToastNotification />
  <CartDrawer />
</template>

<script setup>
  import ToastNotification from '@/components/UI/ToastNotification.vue'
  import CartDrawer from '@/components/Cart/Drawer.vue'
</script>
