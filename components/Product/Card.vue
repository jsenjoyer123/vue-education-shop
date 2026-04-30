<script setup lang="ts">
  defineProps<{
    productName: string
    poroductImage: string
    productStatus: string
    productPrice: number
  }>()
</script>

<template>
  <div class="image-wrapper">
    <svg class="product-status"></svg>
    <img class="product-img" />
    <button>ADD TO CART</button>
  </div>
  <h2>{{ productName }}</h2>
  <p>{{ productPrice }}</p>
</template>
