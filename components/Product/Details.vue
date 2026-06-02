<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import type { Product } from '@/types/api'

  const props = defineProps<{
    product: Product
  }>()

  const images = ref<string[]>([])
  const activeImage = ref<string>('')

  watchEffect(() => {
    if (props.product) {
      const img = props.product.image
      images.value = [img, img, img, img]
      activeImage.value = images.value[0]
    }
  })
</script>

<template>
  <div class="product-container">
    <section class="mini-image">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        alt="thumbnail"
        @click="activeImage = image"
      />
    </section>

    <section class="image">
      <img :src="activeImage" alt="product image" />
    </section>

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

  .product-container section {
    height: 500px;
  }

  .mini-image {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    background-color: green;
  }

  .mini-image img {
    width: 80px;
    height: 80px;
    cursor: pointer;
    object-fit: cover;
  }

  .image {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: blue;
  }

  .image img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .product-description {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background-color: yellow;
  }
</style>
