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
  <div class="product-container">
    <ProductGallery :images="images" />
    <ProductInfo :product="product" />
  </div>
</template>

<style scoped lang="scss">
  .product-container {
    display: flex;
    background-color: red;

    @media (min-width: $breakpoints-xl) {
      height: 600px;
    }
  }
</style>
