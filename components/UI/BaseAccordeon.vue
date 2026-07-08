<script setup lang="ts">
  import { ref } from 'vue'

  export interface AccordeonTab {
    id: string
    title: string
    count?: number
  }

  defineProps<{
    tabs: AccordeonTab[]
  }>()

  const activeTab = ref<string | null>(null)

  const toggle = (id: string) => {
    if (activeTab.value === id) {
      activeTab.value = null
    } else {
      activeTab.value = id
    }
  }
</script>

<template>
  <div class="base-accordeon">
    <div v-for="tab in tabs" :key="tab.id" class="base-accordeon__item">
      <button
        class="base-accordeon__header"
        :class="{ 'is-active': activeTab === tab.id }"
        @click="toggle(tab.id)"
      >
        <span class="base-accordeon__title">
          {{ tab.title }}
          <span v-if="tab.count !== undefined" class="base-accordeon__count">{{ tab.count }}</span>
        </span>
        <span class="base-accordeon__icon" :class="{ 'is-expanded': activeTab === tab.id }">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
      <div v-show="activeTab === tab.id" class="base-accordeon__content">
        <slot :name="tab.id" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .base-accordeon {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__item {
      border-bottom: 1px solid $color-border-gray;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 16px 0;
      color: $color-black;
      text-align: left;
      cursor: pointer;
      background: none;
      border: none;
    }

    &__title {
      display: flex;
      gap: 8px;
      align-items: center;
      font-size: 12px;
      font-weight: 500;
    }

    &__count {
      padding: 0;
      font-size: inherit;
      color: inherit;
      background-color: transparent;
      border-radius: 0;

      &::before {
        content: '(';
      }

      &::after {
        content: ')';
      }

      @media (width >= $breakpoints-m) {
        padding: 2px 8px;
        font-size: 0.875rem;
        color: $color-white;
        background-color: $color-black;
        border-radius: 4px;

        &::before,
        &::after {
          content: '';
        }
      }
    }

    &__icon {
      transition: transform 0.3s ease;

      &.is-expanded {
        transform: rotate(180deg);
      }
    }

    &__content {
      padding: 0 0 16px;
      font-size: 1rem;
      line-height: 1.6;
      color: $color-text-gray;
    }
  }
</style>
