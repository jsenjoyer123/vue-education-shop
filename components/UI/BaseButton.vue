<script setup lang="ts">
  interface Props {
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'transparent' | 'outline'
    disabled?: boolean
  }

  withDefaults(defineProps<Props>(), {
    type: 'button',
    variant: 'primary',
    disabled: false,
  })

  defineEmits<{
    (e: 'click', event: MouseEvent): void
  }>()
</script>

<template>
  <button
    :type="type"
    class="base-button"
    :class="[`base-button--${variant}`, { 'base-button--disabled': disabled }]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
  .base-button {
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
  }
</style>
