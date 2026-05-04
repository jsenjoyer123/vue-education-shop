<script setup lang="ts">
  import type { Product } from '@/types/api'
  import { useToast } from '@/composables/useToast'

  defineProps<Product>()

  const { show } = useToast()

  const handleAddToCart = (productTitle: string) => {
    show(`${productTitle} добавлен в корзину`, 'success')
  }
</script>

<template>
  <div class="image-wrapper">
    <svg class="product-status"></svg>
    <img class="product-img" :src="image" :alt="title" />
    <button @click="handleAddToCart(title)">ADD TO CART</button>
  </div>
  <h2>{{ title }}</h2>
  <p>{{ price }}</p>
</template>
