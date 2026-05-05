<template>
  <div v-if="pending" class="product-list">
    <CardSkeleton v-for="n in 6" :key="n" />
  </div>
  <div v-else-if="!products?.length">Нет товаров</div>
  <div v-else class="product-list">
    <Card v-for="product in products" :key="product.id" v-bind="product" />
  </div>
</template>

<script setup lang="ts">
  import type { Product } from '@/types/api'
  import Card from './Card.vue'
  import CardSkeleton from './CardSkeleton.vue'

  defineProps<{
    products: Product[] | null
    pending?: boolean
  }>()
</script>

<style scoped lang="scss">
  .product-list {
    display: flex;
    flex-wrap: wrap;
    gap: 40px 70px;

    @media (max-width: $breakpoints-m) {
      gap: 32px 20px;
      justify-content: space-between;
    }
  }

  .product-list > * {
    box-sizing: border-box;
    flex: 0 0 calc(33.333% - 47px);

    @media (max-width: $breakpoints-m) {
      flex: 0 0 136px;
    }
  }
</style>
