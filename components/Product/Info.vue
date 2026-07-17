<script setup lang="ts">
  import { ref } from 'vue'
  import type { Product } from '@/types/api'
  import { useCartStore } from '@/stores/cart'
  import { useToast } from '@/composables/useToast'
  import BaseButton from '@/components/UI/BaseButton.vue'

  const props = defineProps<{
    product: Product
  }>()

  const quantity = ref(1)
  const cartStore = useCartStore()
  const { show } = useToast()

  const increment = () => {
    quantity.value++
  }

  const decrement = () => {
    if (quantity.value > 1) {
      quantity.value--
    }
  }

  const addToCart = () => {
    cartStore.addItem(props.product, quantity.value)
    show(`Added ${quantity.value} x "${props.product.title}" to your Shopping bag.`, 'success')
  }
</script>

<template>
  <section class="product-info">
    <h1>{{ product.title }}</h1>
    <p class="price">${{ product.price }}</p>
    <div v-if="product.rating" class="rating">
      <span class="stars">
        <span v-for="n in 5" :key="n" :class="{ filled: n <= Math.round(product.rating.rate) }"
          >★</span
        >
      </span>
      <span class="rate-value">{{ product.rating.rate }} ({{ product.rating.count }} reviews)</span>
    </div>
    <div v-else class="rating">
      <span class="stars">
        <span v-for="n in 5" :key="n">☆</span>
      </span>
      <span class="rate-value">No reviews</span>
    </div>
    <p class="description">
      {{ product.description }}
    </p>
    <div class="actions">
      <div class="counter">
        <BaseButton variant="transparent" :disabled="quantity <= 1" @click="decrement"
          >-</BaseButton
        >
        <span class="qty">{{ quantity }}</span>
        <BaseButton variant="transparent" @click="increment">+</BaseButton>
      </div>
      <BaseButton class="add-to-cart" @click="addToCart">ADD TO CART</BaseButton>
    </div>
    <div class="product-icons">
      <img src="~/assets/icons/productIcons.svg" alt="Product features" />
    </div>
    <div class="meta">
      <p class="sku"><strong>SKU:</strong> {{ product.id }}</p>
      <p class="category"><strong>Categories:</strong> {{ product.category }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .product-info {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 0 20px 20px;

    @media (min-width: $breakpoints-xl) {
      flex: none;
      width: 486px;
    }
  }

  h1 {
    margin: 0;
    margin-bottom: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 24px;
    white-space: nowrap;

    @media (min-width: $breakpoints-xl) {
      margin-bottom: 23px;
      font-size: 26px;
    }
  }

  .product-icons {
    margin-top: 81px;
  }

  .meta {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 38px;
    font-size: 14px;
    color: $color-text-gray;

    @media (min-width: $breakpoints-xl) {
      font-size: 16px;
    }

    p {
      margin: 0;
    }
  }

  .price {
    margin: 0;
    margin-bottom: 64px;
    font-size: 24px;
    font-weight: bold;
    color: $color-accent;

    @media (min-width: $breakpoints-xl) {
      font-size: 20px;
    }
  }

  .description {
    display: -webkit-box;
    margin: 0;
    overflow: hidden;
    -webkit-line-clamp: 4;
    line-height: 1.5;
    color: $color-text-gray;
    -webkit-box-orient: vertical;

    @media (min-width: $breakpoints-xl) {
      display: block;
      -webkit-line-clamp: unset;
      font-size: 16px;
    }
  }

  .rating {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 19px;

    @media (min-width: $breakpoints-xl) {
      font-size: 16px;
    }
  }

  .stars {
    color: $color-border-gray;

    span {
      font-size: 20px;
    }

    span.filled {
      color: $color-black;
    }
  }

  .actions {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-top: 48px;

    @media (min-width: $breakpoints-xl) {
      font-size: 16px;
    }
  }

  .counter {
    display: flex;
    align-items: center;
    background: $color-bg-light;
    border-radius: 4px;

    button {
      padding: 10px 15px;
      font-size: 18px;
      cursor: pointer;
      background: none;
      border: none;

      @media (min-width: $breakpoints-xl) {
        font-size: 16px;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }

    .qty {
      min-width: 20px;
      padding: 0 15px;
      font-weight: bold;
      text-align: center;
    }
  }

  .add-to-cart {
    padding: 12px 30px;
    font-size: 16px;
    font-weight: bold;
    color: $color-black;
    cursor: pointer;
    background-color: $color-white;
    border: 1px solid $color-black;
    border-radius: 4px;
    transition: background-color 0.2s;

    @media (min-width: $breakpoints-xl) {
      width: 360px;
    }

    &:hover {
      background-color: $color-bg-light;
    }
  }
</style>
