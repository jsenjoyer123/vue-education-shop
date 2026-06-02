<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import type { Product } from '~/types/api'

  const images = ref<string[]>([])
  const activeImage = ref<string>('')
  const route = useRoute()
  const productId = route.params.id
  const {
    data: product,
    pending,
    error,
  } = await useFetch<Product>(`https://fakestoreapi.com/products/${productId}`)

  watchEffect(() => {
    if (product.value) {
      const img = product.value.image
      images.value = [img, img, img, img]
      activeImage.value = images.value[0]
    }
  })
</script>

<template>
  <main class="product-container">
    <div v-if="pending">Загрузка товара...</div>
    <div v-else-if="error">Произошла ошибка при загрузке</div>

    <template v-else-if="product">
      <section class="mini-image">
        <img
          v-for="image in images"
          :key="image"
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
    </template>
  </main>
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
    background-color: green;
  }

  .image {
    background-color: blue;
  }

  .product-description {
    background-color: yellow;
  }
</style>
