<template>
  <div v-if="pending">Загрузка...</div>
  <div v-else-if="!products?.length">Нет товаров</div>
  <template v-else>
    <Card v-for="product in products" :key="product.id" v-bind="product" />
  </template>
</template>

<script setup lang="ts">
  import type { Product } from '@/types/api'
  import Card from './Card.vue'

  defineProps<{
    products: Product[] | null
    pending?: boolean
  }>()
</script>
