<script setup lang="ts">
  import type { Product } from '@/types/api'
  import { ref } from 'vue'
  import Card from './Card.vue'
  import CardSkeleton from './CardSkeleton.vue'

  defineProps<{
    products: Product[] | null
    pending?: boolean
  }>()

  const activeCardId = ref<number | null>(null)

  const setActiveCard = (id: number) => {
    activeCardId.value = activeCardId.value === id ? null : id
  }
</script>

<template>
  <div v-if="pending" class="product-list">
    <CardSkeleton v-for="n in 6" :key="n" />
  </div>
  <div v-else-if="!products?.length">No products</div>
  <div v-else class="product-list">
    <Card
      v-for="product in products"
      :key="product.id"
      v-bind="product"
      :active-card-id="activeCardId"
      @set-active="setActiveCard"
    />
  </div>
</template>

<style scoped lang="scss">
  .product-list {
    --product-list-row-gap: 24px;
    --product-list-column-gap: 24px;

    display: flex;
    flex-wrap: wrap;
    gap: var(--product-list-row-gap) var(--product-list-column-gap);

    @media (width < $breakpoints-xxl) {
      --product-list-row-gap: 20px;
      --product-list-column-gap: 20px;
    }

    @media (width < $breakpoints-xl) {
      --product-list-row-gap: 18px;
      --product-list-column-gap: 18px;
    }

    @media (width <= $breakpoints-l) {
      --product-list-row-gap: 16px;
      --product-list-column-gap: 16px;
    }

    @media (max-width: $breakpoints-m) {
      gap: 32px 20px;
      justify-content: space-between;
    }
  }

  .product-list > * {
    box-sizing: border-box;
    flex: 0 0 calc((100% - (var(--product-list-column-gap) + var(--product-list-column-gap))) / 3);

    @media (max-width: $breakpoints-m) {
      flex: 0 0 calc((100% - 20px) / 2);
    }
  }

  .popup-product-details-wrapper {
    width: 100%;
    min-width: 600px;
    max-width: 1000px;
  }
</style>
