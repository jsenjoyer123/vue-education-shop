<script setup lang="ts">
  import { useCartStore } from '@/stores/cart'
  import { storeToRefs } from 'pinia'
  import CartItem from '@/components/Cart/Item.vue'
  import cartBackIcon from '~/assets/icons/cartBack.svg'

  const cartStore = useCartStore()
  const { isOpen, totalCount, items, totalPrice } = storeToRefs(cartStore)
  const { closeCart } = cartStore

  watch(isOpen, (val) => {
    if (import.meta.client) {
      document.body.style.overflow = val ? 'hidden' : ''
    }
  })
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="cart-overlay" @click="closeCart"></div>

    <Transition name="slide-right">
      <div v-if="isOpen" class="cart-drawer">
        <div class="cart-drawer__header">
          <button class="cart-drawer__back" @click="closeCart">
            <img :src="cartBackIcon" alt="Back" />
          </button>
          <h2>Shopping bag</h2>
          <span class="cart-drawer__count"
            >{{ totalCount }} {{ totalCount === 1 ? 'item' : 'items' }}</span
          >
        </div>

        <div class="cart-drawer__body">
          <p v-if="items.length === 0" class="empty-message">Your cart is currently empty.</p>
          <div v-else class="cart-items">
            <CartItem v-for="item in items" :key="item.id" :item="item" />
          </div>
        </div>

        <div class="cart-drawer__footer">
          <div class="cart-drawer__subtotal">
            <span>Subtotal ({{ totalCount }} {{ totalCount === 1 ? 'item' : 'items' }})</span>
            <span>${{ totalPrice.toFixed(2) }}</span>
          </div>
          <button class="checkout-button">CHECKOUT</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
  .cart-overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    background-color: rgb(0 0 0 / 50%);
  }

  .cart-drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 101;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    background-color: $color-white;
    box-shadow: -4px 0 24px rgb(0 0 0 / 10%);

    &__header {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 72px 16px 3px;

      @media (min-width: $breakpoints-m) {
        padding-right: 36px;
        padding-left: 36px;
      }

      h2 {
        padding-bottom: 17px;
        margin: 0;
        font-family: $font-family-primary;
        font-size: 20px;
        font-weight: $font-weight-medium;
        letter-spacing: 1px;
      }
    }

    &__count {
      font-family: $font-family-primary;
      font-size: 14px;
      color: $color-text-gray;
    }

    &__back {
      position: absolute;
      top: 24px;
      left: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      cursor: pointer;
      outline: none;
      background: transparent;
      border: none;
      transition: opacity 0.2s ease;
      -webkit-tap-highlight-color: transparent;

      @media (min-width: $breakpoints-m) {
        display: none;
      }

      &:hover {
        opacity: 0.6;
      }
    }

    &__close {
      padding: 8px;
      font-size: 20px;
      color: $color-black;
      cursor: pointer;
      background: transparent;
      border: none;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.6;
      }
    }

    &__body {
      flex: 1;
      padding: 24px 16px;
      overflow-y: auto;

      @media (min-width: $breakpoints-m) {
        padding: 0 36px;
        padding-top: 3px;
      }

      .cart-items {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .empty-message {
        margin-top: 40px;
        font-family: $font-family-primary;
        color: $color-text-gray;
        text-align: center;
      }
    }

    &__footer {
      padding: 24px 16px 37px;
      background-color: $color-white;
      border-top: 1px solid $color-border-gray;

      @media (min-width: $breakpoints-m) {
        padding: 24px 36px;
      }
    }

    &__subtotal {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      font-family: $font-family-primary;
      font-size: 18px;
      font-weight: $font-weight-medium;
    }

    &__taxes {
      margin-bottom: 24px;
      font-size: 14px;
      color: $color-text-gray;
    }

    .checkout-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 32px;
      padding: 0;
      margin: 0;
      font-family: $font-family-mono;
      font-size: 14px;
      font-weight: $font-weight-bold;
      color: $color-black;
      text-transform: uppercase;
      cursor: pointer;
      outline: none;
      background-color: $color-white;
      border: 1px solid $color-black;
      border-radius: 4px;
      transition: background-color 0.2s ease;
      -webkit-tap-highlight-color: transparent;

      @media (min-width: $breakpoints-m) {
        display: block;
        width: 100%;
        height: auto;
        padding: 16px;
        margin: 0;
      }

      &:hover {
        background-color: $color-accent;
      }
    }
  }

  /* Animations */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .slide-right-enter-from,
  .slide-right-leave-to {
    transform: translateX(100%);
  }
</style>
