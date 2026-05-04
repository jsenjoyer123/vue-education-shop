<script setup lang="ts">
  import type { Product } from '@/types/api'

  defineProps<Product>()
</script>

<template>
  <div class="image-wrapper">
    <svg class="product-status"></svg>
    <img class="product-img" :src="image" :alt="title" />
    <button>ADD TO CART</button>
  </div>
  <h2>{{ title }}</h2>
  <p>{{ price }}</p>
</template>
