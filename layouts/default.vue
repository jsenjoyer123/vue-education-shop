<script setup lang="ts">
  const route = useRoute()
</script>

<template>
  <div class="layout" :class="{ 'layout--no-flex-main': route.meta.layoutMainFlex === false }">
    <Header />
    <main class="layout__main">
      <slot />
    </main>
    <BaseFooter />
  </div>
</template>

<style scoped lang="scss">
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    &__main {
      flex: 1;
    }

    &--no-flex-main &__main {
      flex: none;
    }
  }
</style>
