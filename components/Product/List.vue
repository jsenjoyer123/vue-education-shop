<template>
  <div v-if="pending">Загрузка...</div>
  <div v-else-if="!products?.length">Нет товаров</div>
  <div v-else class="product-list">
    <Card v-for="product in products" :key="product.id" v-bind="product" />
  </div>
</template>

<script setup lang="ts">
  import type { Product } from '@/types/api'
  import Card from './Card.vue'

  defineProps<{
    products: Product[] | null
    pending?: boolean
  }>()
</script>

<style scoped>
  .product-list {
    display: flex;
    flex-wrap: wrap;
    gap: 40px 70px;
  }

  .product-list > * {
    box-sizing: border-box;
    flex: 0 0 calc(33.333% - 47px);
  }
</style>
