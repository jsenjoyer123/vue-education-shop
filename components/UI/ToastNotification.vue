<script setup lang="ts">
  import { useToast, type ToastType } from '@/composables/useToast'
  import checkIcon from '~/assets/icons/check.svg'
  import errorIcon from '~/assets/icons/error.svg'
  import infoIcon from '~/assets/icons/info.svg'

  const { toasts, removeToast } = useToast()

  const getToastIcon = (type: ToastType) => {
    if (type === 'error') return errorIcon
    if (type === 'info') return infoIcon
    return checkIcon
  }
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <div class="toast-container">
        <TransitionGroup name="toast">
          <div
            v-for="toast in toasts"
            :key="toast.id"
            class="toast"
            :class="`toast--${toast.type}`"
          >
            <div class="toast__icon" :class="`toast__icon--${toast.type}`">
              <img :src="getToastIcon(toast.type)" :alt="toast.type" />
            </div>
            <span class="toast__message">{{ toast.message }}</span>
            <button v-if="toast.action" class="toast__link" @click.prevent="toast.action.handler()">
              {{ toast.action.label }}
            </button>
            <button class="toast__close" @click="removeToast(toast.id)">&times;</button>
          </div>
        </TransitionGroup>
      </div>
    </Teleport>
  </ClientOnly>
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
    box-shadow: 0 4px 12px rgba($color-black, 0.15);

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
      border-radius: 50%;

      &--success {
        background-color: $color-accent;
      }

      &--error {
        background-color: $color-error;
      }

      &--info {
        background-color: $color-text-gray;
      }

      img {
        width: 14px;
        height: 14px;
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
      cursor: pointer;
      background: none;
      border: none;
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
      cursor: pointer;
      background: none;
      border: none;
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
