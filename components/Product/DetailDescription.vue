<script setup lang="ts">
  import { ref } from 'vue'
  import type { Product } from '~/types/api'
  import BaseButton from '@/components/UI/BaseButton.vue'
  import { useCartStore } from '@/stores/cart'
  import { useToast } from '@/composables/useToast'

  const props = defineProps<{
    product: Product
  }>()

  const cartStore = useCartStore()
  const { show } = useToast()

  const isExpanded = ref(false)

  const handleAddToCart = () => {
    cartStore.addItem(props.product)
    show(`"${props.product.title}" was added to your Shopping bag.`, 'success')
  }
</script>

<template>
  <section class="product-description">
    <h1>{{ product.title }}</h1>
    <p class="price">${{ product.price }}</p>
    <BaseButton class="add-to-cart-btn" @click="handleAddToCart">ADD TO CART</BaseButton>
    <p class="description" :class="{ 'is-truncated': !isExpanded }">
      {{ product.description }}
    </p>
    <button
      v-if="product.description.length > 100"
      class="view-more-btn"
      @click="isExpanded = !isExpanded"
    >
      {{ isExpanded ? 'View less' : 'View more' }}
    </button>
  </section>
</template>

<style scoped lang="scss">
  .product-description {
    background-color: #fff;

    h1 {
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 20px;
      white-space: nowrap;
    }

    .description {
      margin-bottom: 8px;

      &.is-truncated {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .view-more-btn {
      padding: 0;
      font-size: 14px;
      font-weight: bold;
      color: $color-accent;
      cursor: pointer;
      background: none;
      border: none;
    }
  }

  .price {
    margin: 10px 0;
    font-size: 16px;
    font-weight: bold;
    color: $color-accent;
  }

  .add-to-cart-btn {
    width: 100%;
    margin-bottom: 20px;
    font-size: 12px;
    border: 1px solid $color-black;
    border-radius: 4px;
  }
</style>
