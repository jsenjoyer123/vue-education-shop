<script setup lang="ts">
  interface Props {
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'transparent' | 'outline'
    disabled?: boolean
    loading?: boolean
    success?: boolean
  }

  withDefaults(defineProps<Props>(), {
    type: 'button',
    variant: 'primary',
    disabled: false,
    loading: false,
    success: false,
  })

  defineEmits<{
    (e: 'click', event: MouseEvent): void
  }>()
</script>

<template>
  <button
    :type="type"
    class="base-button"
    :class="[
      `base-button--${variant}`,
      {
        'base-button--disabled': disabled,
        'base-button--loading': loading,
        'base-button--success': success,
      },
    ]"
    :disabled="disabled || loading || success"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="base-button__spinner" />
    <IconAppCheck v-else-if="success" class="base-button__check" />
    <span v-else class="base-button__content">
      <slot />
    </span>
  </button>
</template>

<style scoped lang="scss">
  .base-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    font-family: inherit;
    cursor: pointer;
    background: none;
    border: none;
    transition: all 0.2s ease;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &:hover,
    &:active,
    &:focus {
      cursor: pointer;
    }

    &--primary {
      color: #fff;
      background: #000;
      border: 2px solid #000;

      &:hover:not(:disabled) {
        background: #222;
        border-color: #222;
      }
    }

    &--transparent {
      color: inherit;
      background: transparent;
      border: none;
    }

    &--loading,
    &--success {
      pointer-events: none;
      opacity: 1 !important;
    }

    &--success {
      background: #22c55e;
      border-color: #22c55e;
    }

    &__content {
      display: inline-flex;
      gap: 8px;
      align-items: center;
    }

    &__spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 2.5px solid rgb(255 255 255 / 30%);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    &__check {
      width: 20px;
      height: 20px;
      animation: check-pop 0.35s ease-out forwards;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes check-pop {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }

    50% {
      opacity: 1;
      transform: scale(1.15);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
