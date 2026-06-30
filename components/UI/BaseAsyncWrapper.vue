<script setup lang="ts">
  defineProps<{
    pending?: boolean
    error?: (Error & { statusMessage?: string }) | null
    isEmpty?: boolean
  }>()
</script>

<template>
  <slot v-if="pending" name="loading">
    <div class="base-loading">Loading...</div>
  </slot>

  <slot v-else-if="error" name="error" :error="error">
    <div class="base-error">
      <p class="base-error__title">Failed to load data</p>
      <p v-if="error.message || error.statusMessage" class="base-error__message">
        {{ error.message || error.statusMessage }}
      </p>
    </div>
  </slot>

  <slot v-else-if="isEmpty" name="empty">
    <div class="base-empty">No data available</div>
  </slot>

  <slot v-else />
</template>

<style scoped lang="scss">
  .base-loading,
  .base-error,
  .base-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px;
    text-align: center;
  }

  .base-error {
    color: #dc2626;

    &__title {
      margin: 0 0 8px;
      font-family: $font-family-secondary;
      font-size: 24px;
      font-weight: 500;
    }

    &__message {
      margin: 0;
      font-size: 16px;
      color: $color-text-gray;
    }
  }
</style>
