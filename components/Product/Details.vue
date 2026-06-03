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

    <section class="product-description">
      <h1>{{ product.title }}</h1>
      <p class="price">${{ product.price }}</p>
      <p>Категория: {{ product.category }}</p>
      <p>{{ product.description }}</p>
    </section>
  </div>
</template>

<style scoped lang="scss">
  .product-container {
    display: flex;
    background-color: red;
  }

  .product-description {
    flex: 1;
    height: 500px;
    padding: 20px;
    overflow-y: auto;
    background-color: yellow;
  }
</style>
