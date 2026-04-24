<script setup lang="ts">
  interface Props {
    modelValue?: string
    type?: 'text' | 'email' | 'password' | 'tel' | 'search'
    placeholder?: string
    width?: string
    error?: string
  }

  withDefaults(defineProps<Props>(), {
    modelValue: '',
    type: 'text',
    placeholder: '',
    width: '100%',
    error: '',
  })

  defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()
</script>

<template>
  <div class="base-input-wrapper" :style="{ width }">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      class="base-input"
      :class="{ 'base-input--error': error }"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <div class="input-line" :class="{ 'input-line--error': error }"></div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<style scoped lang="scss">
  .base-input-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .base-input {
    width: 100%;
    padding: 0.5rem 0;
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 27px;
    color: #707070;
    letter-spacing: 0%;
    outline: none;
    background: transparent;
    border: none;
  }

  .input-line {
    height: 1px;
    background: $color-border-gray;

    &.input-line--error {
      background: #f00;
    }
  }

  .base-input::placeholder {
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 27px;
    color: #707070;
    letter-spacing: 0%;
  }

  .error-message {
    position: absolute;
    bottom: -18px;
    left: 0;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: #f00;
  }
</style>
