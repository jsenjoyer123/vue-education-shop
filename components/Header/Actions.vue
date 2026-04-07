<template>
  <div class="header-actions">
    <NuxtLink
      v-for="action in actions"
      :key="action.id"
      :to="action.path"
      class="header-actions__link"
      :class="`header-actions__link--${action.name}`"
      :aria-label="action.ariaLabel"
    >
      <component :is="action.icon" class="header-actions__icon" />
    </NuxtLink>

    <button
      class="header-actions__burger"
      :class="{ 'header-actions__burger--active': isMenuOpen }"
      type="button"
      @click="$emit('toggle')"
    >
      <span></span>
    </button>
  </div>
</template>

<script setup lang="ts">
  import type { Component } from 'vue'

  interface ActionLink {
    id: number
    name: string
    path: string
    ariaLabel: string
    icon: Component
  }

  defineProps<{
    actions: ActionLink[]
    isMenuOpen: boolean
  }>()

  defineEmits<{
    (e: 'toggle'): void
  }>()
</script>

<style scoped lang="scss">
  .header-actions {
    display: flex;
    gap: 16px;
    align-items: center;

    @media (min-width: $breakpoints-m) {
      gap: 24px;
    }

    @media (min-width: $breakpoints-l) {
      gap: 39px;
    }
  }

  .header-actions__link {
    display: flex;

    &--search,
    &--profile {
      display: none;

      @media (min-width: $breakpoints-m) {
        display: flex;
      }
    }

    /* &:hover {
      color: $color-accent;
    } */
  }

  .header-actions__icon {
    width: 18px;
    height: 18px;
    stroke-width: 1.5;

    @media (min-width: $breakpoints-m) {
      width: 24px;
      height: 24px;
    }
  }

  .header-actions__burger {
    position: relative;
    z-index: 51;
    width: 20px;
    height: 16px;

    @media (min-width: $breakpoints-m) {
      display: none;
    }

    span,
    span::before,
    span::after {
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: $color-black;
      transition: all 0.3s ease-in-out;
    }

    span {
      top: 50%;
      transform: translateY(-50%);

      &::before,
      &::after {
        content: '';
      }

      &::before {
        top: -7px;
      }

      &::after {
        bottom: -7px;
      }
    }

    &--active span {
      background-color: transparent;

      &::before {
        top: 0;
        transform: rotate(45deg);
      }

      &::after {
        bottom: 0;
        transform: rotate(-45deg);
      }
    }
  }
</style>
