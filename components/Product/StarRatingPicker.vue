<script setup lang="ts">
  import { ref } from 'vue'

  defineProps<{
    modelValue: number
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
  }>()

  const hoverRating = ref(0)
</script>

<template>
  <div class="rating-picker">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      class="star-btn"
      :class="{ 'star-btn--active': star <= (hoverRating || modelValue) }"
      @click="emit('update:modelValue', star)"
      @mouseenter="hoverRating = star"
      @mouseleave="hoverRating = 0"
    >
      ★
    </button>
  </div>
</template>

<style scoped lang="scss">
  .rating-picker {
    display: flex;
    gap: 4px;
  }

  .star-btn {
    padding: 0;
    font-size: 24px;
    color: $color-border-gray;
    cursor: pointer;
    background: none;
    border: none;
    transition: color 0.2s;

    &:hover,
    &--active {
      color: $color-black;
    }
  }
</style>
