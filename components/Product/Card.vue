<script setup lang="ts">
  import type { Product } from '@/types/api'
  import { useToast } from '@/composables/useToast'
  import { computed } from 'vue'

  const props = defineProps<Product>()

  const { show } = useToast()

  const truncatedTitle = computed(() => {
    return props.title.length > 20 ? props.title.slice(0, 20) + '...' : props.title
  })

  const handleAddToCart = () => {
    show('The item was added to your Shopping bag.', 'success')
  }
</script>

<template>
  <div class="product-card">
    <div class="image-wrapper">
      <svg class="product-status"></svg>
      <img class="product-img" :src="image" :alt="title" />
      <button @click="handleAddToCart">ADD TO CART</button>
    </div>
    <h2>{{ truncatedTitle }}</h2>
    <p>{{ price }}</p>
  </div>
</template>

<style scoped lang="scss">
  .image-wrapper {
    position: relative;

    .product-status {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }

    button {
      position: absolute;
      bottom: 0;
      left: 0;
      visibility: hidden;
      width: 100%;
      height: 64px;
      padding: 0;
      font-family: $font-family-mono;
      font-size: 14px;
      font-weight: $font-weight-medium;
      color: $color-black;
      background: $color-white;
      border-radius: 0 0 4px 4px;
      opacity: 0;
      transition:
        opacity 0.3s ease,
        visibility 0.3s ease;
    }

    .product-img {
      width: 100%;
      height: auto;
      object-fit: cover;
      border-radius: 4px;

      @media (min-width: $breakpoints-xxl) {
        width: 300px;
        height: 300px;
        border-radius: 8px;
      }
    }
  }

  .product-card {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;

    @media (min-width: $breakpoints-xxl) {
      width: 300px;
      height: 392px;
    }

    h2 {
      font-family: $font-family-primary;
      font-size: 20px;
      font-weight: $font-weight-medium;
      text-align: left;
    }

    p {
      font-family: $font-family-primary;
      font-size: 20px;
      font-weight: $font-weight-bold;
      color: $color-accent;
      text-align: left;
    }

    &:hover .image-wrapper button {
      @media (min-width: $breakpoints-xxl) {
        visibility: visible;
        opacity: 1;
      }
    }
  }
</style>
