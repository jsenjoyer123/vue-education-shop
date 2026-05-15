<script setup lang="ts">
  useHead({
    title: 'Магазин',
  })
</script>

<template>
  <Header />
  <main class="shop-page">
    <section class="catalog-section container">
      <ProductCatalog />
    </section>
  </main>
  <BaseFooter />
</template>

<style scoped lang="scss">
  .shop-page {
    margin-top: 120px;

    @media (max-width: $breakpoints-xl) {
      margin-top: 25px;
    }
  }

  .page-title {
    margin-bottom: 32px;
    font-family: $font-family-secondary;
    font-size: 32px;
    font-weight: 500;
    text-transform: uppercase;
  }

  .catalog-section {
    margin-top: 48px;
    margin-bottom: 48px;

    @media (min-width: $breakpoints-xl) and (width < $breakpoints-xxl) {
      max-width: 1280px;
      padding: 0 48px;
    }
  }
</style>
