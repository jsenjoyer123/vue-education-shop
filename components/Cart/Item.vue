<script setup lang="ts">
  import type { CartItem } from '@/stores/cart'
  import { useCartStore } from '@/stores/cart'
  import deleteIcon from '~/assets/icons/delete.svg'

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
        <button class="cart-item__remove" aria-label="Remove item" @click="handleRemove">
          <img :src="deleteIcon" alt="Remove item" />
        </button>
      </div>

      <div class="cart-item__variant">Black / Medium</div>

      <div class="cart-item__footer">
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
  </div>
</template>

<style scoped lang="scss">
  .cart-item {
    display: flex;
    gap: 24px;
    padding: 24px 0;

    &:last-child {
      border-bottom: none;
    }

    &__image-wrapper {
      flex-shrink: 0;
      width: 136px;
      height: 136px;
      overflow: hidden;
      background-color: $color-bg-light;
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
      font-size: 16px;
    }

    &__title {
      margin: 0;
      font-family: $font-family-primary;
      font-size: 1em;
      font-weight: $font-weight-regular;
      line-height: 1.4;
      color: $color-black;
    }

    &__remove {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      padding: 4px;
      font-size: 1em;
      cursor: pointer;
      background: none;
      border: none;
      transition: opacity 0.2s;

      img {
        width: 0.5em;
        height: 0.5em;
      }

      &:hover {
        opacity: 0.6;
      }
    }

    &__variant {
      margin-top: 4px;
      font-family: $font-family-primary;
      font-size: 14px;
      color: $color-text-gray;
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
    }

    &__price {
      font-family: $font-family-primary;
      font-size: 16px;
      font-weight: $font-weight-medium;
      color: $color-accent;
    }

    &__controls {
      display: flex;
    }
  }

  .quantity-selector {
    display: inline-flex;
    align-items: center;
    height: 32px;
    background-color: $color-bg-light;
    border-radius: 4px;

    &__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 100%;
      font-size: 16px;
      color: $color-text-gray;
      cursor: pointer;
      background: transparent;
      border: none;
      transition: color 0.2s;

      &:hover {
        color: $color-black;
      }
    }

    &__value {
      min-width: 24px;
      font-family: $font-family-primary;
      font-size: 14px;
      font-weight: $font-weight-medium;
      text-align: center;
    }
  }
</style>
