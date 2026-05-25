<script setup lang="ts">
  import type { CartItem } from '@/stores/cart'
  import { useCartStore } from '@/stores/cart'

  const props = defineProps<{
    item: CartItem
  }>()

  const cartStore = useCartStore()

  const handleIncrement = () => {
    cartStore.addItem(props.item)
  }

  const handleDecrement = () => {
    cartStore.decrementItem(props.item.id)
  }

  const handleRemove = () => {
    cartStore.removeItem(props.item.id)
  }
</script>

<template>
  <div class="cart-item">
    <div class="cart-item__image-wrapper">
      <img :src="item.image" :alt="item.title" class="cart-item__image" />
    </div>

    <div class="cart-item__details">
      <div class="cart-item__header">
        <h3 class="cart-item__title">{{ item.title }}</h3>
        <button class="cart-item__remove" aria-label="Remove item" @click="handleRemove">✕</button>
      </div>

      <div class="cart-item__variant">Black / Medium</div>

      <div class="cart-item__price">${{ item.price }}</div>

      <div class="cart-item__controls">
        <div class="quantity-selector">
          <button
            class="quantity-selector__btn"
            aria-label="Decrease quantity"
            @click="handleDecrement"
          >
            −
          </button>
          <span class="quantity-selector__value">{{ item.quantity }}</span>
          <button
            class="quantity-selector__btn"
            aria-label="Increase quantity"
            @click="handleIncrement"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .cart-item {
    display: flex;
    gap: 16px;
    padding: 16px 0;

    &:last-child {
      border-bottom: none;
    }

    &__image-wrapper {
      flex-shrink: 0;
      width: 80px;
      height: 80px;
      overflow: hidden;
      background-color: #f9f9f9;
      border-radius: 4px;
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &__details {
      display: flex;
      flex: 1;
      flex-direction: column;
    }

    &__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    &__title {
      margin: 0;
      font-family: $font-family-primary;
      font-size: 14px;
      font-weight: $font-weight-medium;
      line-height: 1.4;
      color: $color-black;
    }

    &__remove {
      padding: 0 0 0 8px;
      font-size: 14px;
      color: $color-text-gray;
      cursor: pointer;
      background: none;
      border: none;
      transition: color 0.2s;

      &:hover {
        color: $color-black;
      }
    }

    &__variant {
      margin-top: 4px;
      font-family: $font-family-primary;
      font-size: 12px;
      color: $color-text-gray;
    }

    &__price {
      margin-top: 4px;
      font-family: $font-family-primary;
      font-size: 14px;
      font-weight: $font-weight-bold;
      color: $color-accent;
    }

    &__controls {
      display: flex;
      justify-content: flex-end;
      padding-top: 12px;
      margin-top: auto;
    }
  }

  .quantity-selector {
    display: inline-flex;
    align-items: center;
    height: 32px;
    background-color: $color-text-gray;
    border: 1px solid $color-border-gray;
    border-radius: 4px;

    &__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 100%;
      font-size: 16px;
      color: $color-black;
      cursor: pointer;
      background: transparent;
      border: none;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }

    &__value {
      min-width: 24px;
      font-family: $font-family-primary;
      font-size: 14px;
      text-align: center;
    }
  }
</style>
