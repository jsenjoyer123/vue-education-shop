<template>
  <Transition name="mobile-menu">
    <div v-show="isOpen" class="mobile-menu" @click.self="$emit('close')">
      <div class="mobile-menu__container">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  defineProps<{
    isOpen: boolean
  }>()

  defineEmits<{
    (e: 'close'): void
  }>()
</script>

<style scoped lang="scss">
  .mobile-menu {
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 45;
    width: 100%;
    height: calc(100vh - 60px);
    overflow-y: auto;
    background-color: $color-white;

    @media (min-width: $breakpoints-m) {
      display: none;
    }

    &__container {
      padding-top: 24px;
      padding-bottom: 40px;
    }

    &-enter-active {
      transition:
        clip-path 0.6s ease-in-out,
        opacity 0.6s ease-in-out;
    }

    &-leave-active {
      transition:
        clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.5s ease-in-out;
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
      clip-path: inset(0 0 100% 0);
    }

    &-enter-to,
    &-leave-from {
      opacity: 1;
      clip-path: inset(0 0 0 0);
    }
  }
</style>
