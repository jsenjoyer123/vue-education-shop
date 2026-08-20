<script setup lang="ts">
  defineProps<{
    modelValue: 'login' | 'register'
  }>()

  defineEmits<{
    (e: 'update:modelValue', value: 'login' | 'register'): void
  }>()
</script>

<template>
  <div class="auth-toggle">
    <UIBaseButton
      class="toggle-btn"
      :class="{ 'toggle-btn--active': modelValue === 'login' }"
      variant="transparent"
      @click="$emit('update:modelValue', 'login')"
    >
      Sign in
    </UIBaseButton>

    <UIBaseButton
      class="toggle-btn"
      :class="{ 'toggle-btn--active': modelValue === 'register' }"
      variant="transparent"
      @click="$emit('update:modelValue', 'register')"
    >
      Register
    </UIBaseButton>
  </div>
</template>

<style scoped lang="scss">
  .auth-toggle {
    display: flex;
    width: 100%;
    height: 60px;
    padding: 5px;
    margin-bottom: 126px;
    background: #f0f0f0;
    border-radius: 10px;

    @media (width <= $breakpoints-m) {
      height: 32px;
      padding: 2px;
      margin-bottom: 87px;
      border-radius: 6px;
    }
  }

  .toggle-btn {
    flex: 1;
    justify-content: center;
    padding: 14px 16px;
    font-size: 18px;
    font-weight: 400;
    color: $color-black;
    border-radius: 8px;
    transition: all 0.2s ease;

    @media (width <= $breakpoints-m) {
      padding: 0 8px;
      font-size: 12px;
      border-radius: 4px;
    }

    &--active {
      background: #fff;
      box-shadow: 0 2px 6px rgb(0 0 0 / 8%);
    }
  }
</style>
