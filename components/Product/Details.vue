<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import type { Product } from '@/types/api'

  const props = defineProps<{
    product: Product
  }>()

  const images = ref<string[]>([])

  watchEffect(() => {
    if (props.product) {
      const img = props.product.image
      images.value = [img, img, img, img]
    }
  })
</script>

<template>
  <div class="product-wrapper">
    <ProductGallery :images="images" />
    <ProductInfo :product="product" />
  </div>
</template>

<style scoped lang="scss">
  .product-wrapper {
    display: flex;
    flex-direction: column;
    gap: 32px;

    @media (min-width: $breakpoints-xl) {
      flex-direction: row;
      gap: 62px;
      height: 600px;
    }
  }
</style>
