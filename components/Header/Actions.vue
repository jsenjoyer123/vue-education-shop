<script setup lang="ts">
  import type { ActionLink } from '@/types/ActionLink'
  import BaseButton from '@/components/UI/BaseButton.vue'

  defineProps<{
    actions: ActionLink[]
    isMenuOpen: boolean
    isAuthenticated: boolean
  }>()

  defineEmits<{
    (e: 'toggle'): void
    (e: 'action-click', name: string): void
  }>()
</script>

<template>
  <div class="header-actions">
    <template v-for="action in actions" :key="action.id">
      <a
        v-if="action.path === '#'"
        class="header-actions__link"
        :class="`header-actions__link--${action.name}`"
        :aria-label="action.ariaLabel"
        style="cursor: pointer"
        @click.prevent="$emit('action-click', action.name)"
      >
        <component :is="action.icon" class="header-actions__icon" />
        <span v-if="action.badge" class="header-actions__badge">{{ action.badge }}</span>
        <span
          v-if="action.name === 'profile'"
          class="header-actions__auth-dot"
          :class="
            isAuthenticated
              ? 'header-actions__auth-dot--online'
              : 'header-actions__auth-dot--offline'
          "
        ></span>
      </a>

      <NuxtLink
        v-else
        :to="action.path"
        class="header-actions__link"
        :class="`header-actions__link--${action.name}`"
        :aria-label="action.ariaLabel"
      >
        <component :is="action.icon" class="header-actions__icon" />
        <span v-if="action.badge" class="header-actions__badge">{{ action.badge }}</span>
      </NuxtLink>
    </template>

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
      position: relative;
      display: flex;

      &--search,
      &--profile {
        display: none;

        @media (min-width: $breakpoints-m) {
          display: flex;
        }
      }
    }

    &__badge {
      position: absolute;
      top: -6px;
      right: -8px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 16px;
      height: 16px;
      padding: 0 3px;
      font-size: 10px;
      font-weight: 500;
      line-height: 1;
      color: $color-black;
      background-color: $color-white;
      border: 1px solid $color-black;
      border-radius: 10px;
    }

    &__icon {
      width: clamp(18px, 2vw, 24px);
      height: clamp(18px, 2vw, 24px);
      stroke-width: 1.5;
    }

    &__auth-dot {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      box-shadow: 0 0 0 2px $color-white;

      &--online {
        top: -3px;
        right: -3px;
        background-color: #22c55e;
      }

      &--offline {
        top: -3px;
        left: -3px;
        background-color: #ef4444;
      }
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
