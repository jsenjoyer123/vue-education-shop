<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div v-for="toast in toasts" :key="toast.id" class="toast" :class="`toast--${toast.type}`">
          <span class="toast__message">{{ toast.message }}</span>
          <button class="toast__close" @click="removeToast(toast.id)">×</button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import { useToast } from '@/composables/useToast'

  const { toasts, removeToast } = useToast()
</script>
