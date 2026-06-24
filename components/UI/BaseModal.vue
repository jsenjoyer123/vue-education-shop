<script setup lang="ts">
  import { watch } from 'vue'

  const props = defineProps<{
    isOpen: boolean
  }>()

  defineEmits<{
    (e: 'close'): void
  }>()

  watch(
    () => props.isOpen,
    (val) => {
      if (import.meta.client) {
        document.body.style.overflow = val ? 'hidden' : ''
      }
    },
  )
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-backdrop" @click.self="$emit('close')">
        <div class="modal-container">
          <button class="modal-close" @click="$emit('close')">×</button>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 50%);
  }

  .modal-container {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    padding: 32px;
    overflow-y: auto;
    background-color: $color-white;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgb(0 0 0 / 10%);
  }

  .modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    font-size: 28px;
    color: $color-text-gray;
    cursor: pointer;
    background: none;
    border: none;
    transition: color 0.2s;

    &:hover {
      color: $color-black;
    }
  }

  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s ease;
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }

  .modal-enter-active .modal-container,
  .modal-leave-active .modal-container {
    transition: transform 0.3s ease;
  }

  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    transform: scale(0.95);
  }
</style>
