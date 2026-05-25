<script setup lang="ts">
  import { useCartStore } from '@/stores/cart'
  import { storeToRefs } from 'pinia'

  const cartStore = useCartStore()
  const { isOpen, totalCount } = storeToRefs(cartStore)
  const { closeCart } = cartStore

  watch(isOpen, (val) => {
    if (import.meta.client) {
      document.body.style.overflow = val ? 'hidden' : ''
    }
  })
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="cart-overlay" @click="closeCart"></div>
    </Transition>

    <Transition name="slide-right">
      <div v-if="isOpen" class="cart-drawer">
        <div class="cart-drawer__header">
          <h2>Shopping bag</h2>
        </div>

        <div class="cart-drawer__body">
          <p class="empty-message">Your cart is currently empty.</p>
        </div>

        <div class="cart-drawer__footer">
          <div class="cart-drawer__subtotal">
            <span>Subtotal ({{ totalCount }} {{ totalCount === 1 ? 'item' : 'items' }})</span>
            <span>$0.00</span>
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
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 72px;
      padding-right: 36px;
      padding-left: 36px;

      h2 {
        font-family: $font-family-primary;
        font-size: 20px;
        font-weight: $font-weight-medium;
        letter-spacing: 1px;
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
      padding: 24px;
      overflow-y: auto;

      .empty-message {
        margin-top: 40px;
        font-family: $font-family-primary;
        color: $color-text-gray;
        text-align: center;
      }
    }

    &__footer {
      padding: 24px;
      padding-right: 36px;
      padding-left: 36px;
      background-color: $color-white;
      border-top: 1px solid $color-border-gray;
    }

    &__subtotal {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
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
      width: 100%;
      padding: 16px;
      font-family: $font-family-mono;
      font-size: 14px;
      font-weight: $font-weight-bold;
      color: $color-black;
      text-transform: uppercase;
      cursor: pointer;
      background-color: $color-white;
      border: none;
      border-radius: 4px;
      transition: background-color 0.2s ease;

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
