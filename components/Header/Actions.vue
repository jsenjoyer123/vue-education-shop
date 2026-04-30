<script setup lang="ts">
  import type { ActionLink } from '@/types/ActionLink'
  import BaseButton from '@/components/UI/BaseButton.vue'

  defineProps<{
    actions: ActionLink[]
    isMenuOpen: boolean
  }>()

  defineEmits<{
    (e: 'toggle'): void
  }>()
</script>

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

    <BaseButton
      variant="transparent"
      class="header-actions__burger"
      :class="{ 'header-actions__burger--active': isMenuOpen }"
      @click="$emit('toggle')"
    >
      <span class="header-actions__burger-line"></span>
    </BaseButton>
  </div>
</template>

<style scoped lang="scss">
  .header-actions {
    display: flex;
    gap: clamp(16px, 3vw, 39px);
    align-items: center;

    &__link {
      display: flex;

      &--search,
      &--profile {
        display: none;

        @media (min-width: $breakpoints-m) {
          display: flex;
        }
      }
    }

    &__icon {
      width: clamp(18px, 2vw, 24px);
      height: clamp(18px, 2vw, 24px);
      stroke-width: 1.5;
    }
  }

  .header-actions__burger {
    position: relative;
    z-index: 51;
    width: 20px;
    height: 16px;
    padding: 0;
    cursor: pointer;
    background: none;
    border: none;

    @media (min-width: $breakpoints-m) {
      display: none;
    }

    &-line {
      &,
      &::before,
      &::after {
        position: absolute;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: $color-black;
        transition: all 0.3s ease-in-out;
      }

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

    &--active {
      .header-actions__burger-line {
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
  }
</style>
