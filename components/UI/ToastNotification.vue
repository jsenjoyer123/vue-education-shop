<script setup lang="ts">
  import { useToast } from '@/composables/useToast'

  const { toasts } = useToast()
</script>

<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div v-for="toast in toasts" :key="toast.id" class="toast" :class="`toast--${toast.type}`">
          <div class="toast__icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span class="toast__message">{{ toast.message }}</span>
          <a href="#" class="toast__link">VIEW CART</a>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
  .toast-container {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: none;
  }

  .toast {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 100%;
    min-height: 68px;
    padding: 16px 24px;
    margin-top: 12px;
    pointer-events: auto;
    background-color: $color-white;
    border: 1px solid $color-border-gray;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgb(0 0 0 / 15%);

    &--success {
      border-left: 4px solid $color-accent;
    }

    &--error {
      border-left: 4px solid $color-error;
    }

    &--info {
      border-left: 4px solid $color-text-gray;
    }

    &__icon {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      margin-right: 12px;
      background-color: $color-accent;
      border-radius: 50%;

      svg {
        width: 14px;
        height: 14px;
        color: $color-white;
      }
    }

    &__message {
      flex: 1;
      font-family: $font-family-primary;
      font-size: 16px;
      color: $color-black;
    }

    &__link {
      flex-shrink: 0;
      margin-right: 16px;
      font-family: $font-family-primary;
      font-size: 14px;
      font-weight: $font-weight-medium;
      color: $color-accent;
      text-decoration: none;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.7;
      }
    }

    &__close {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      font-size: 20px;
      color: $color-text-gray;
      transition: color 0.2s;

      &:hover {
        color: $color-black;
      }
    }
  }

  .toast-enter-active,
  .toast-leave-active {
    transition: all 0.3s ease;
  }

  .toast-enter-from {
    opacity: 0;
    transform: translateY(-100%);
  }

  .toast-leave-to {
    opacity: 0;
    transform: translateY(-100%);
  }
</style>
