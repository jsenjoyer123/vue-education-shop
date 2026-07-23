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
      :variant="modelValue === 'login' ? 'primary' : 'transparent'"
      @click="$emit('update:modelValue', 'login')"
    >
      Sign In
    </UIBaseButton>

    <UIBaseButton
      :variant="modelValue === 'register' ? 'primary' : 'transparent'"
      @click="$emit('update:modelValue', 'register')"
    >
      Register
    </UIBaseButton>
  </div>
</template>
