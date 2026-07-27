<template>
  <div class="layout">
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
  }
</style>
