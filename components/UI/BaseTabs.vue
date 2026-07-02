<script setup lang="ts">
  import { ref, watchEffect } from 'vue'

  export interface Tab {
    id: string
    title: string
    count?: number
  }

  const props = defineProps<{
    tabs: Tab[]
  }>()

  const activeTab = ref<string>('')

  watchEffect(() => {
    if (!activeTab.value && props.tabs && props.tabs.length > 0) {
      activeTab.value = props.tabs[0].id
    }
  })
</script>

<template>
  <div class="base-tabs">
    <div class="base-tabs__header">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="base-tabs__tab"
        :class="{ 'is-active': activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <span class="base-tabs__title">{{ tab.title }}</span>
        <span v-if="tab.count !== undefined" class="base-tabs__count">{{ tab.count }}</span>
      </button>
    </div>
    <div class="base-tabs__content">
      <template v-for="tab in tabs" :key="tab.id">
        <div v-show="activeTab === tab.id">
          <slot :name="tab.id" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .base-tabs {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__header {
      display: flex;
      gap: 32px;
      justify-content: center;
      margin-bottom: 32px;
      border-bottom: 1px solid $color-border-gray;
    }

    &__tab {
      display: flex;
      gap: 8px;
      align-items: center;
      padding: 0 0 16px;
      margin-bottom: -1px;
      font-size: 1.25rem;
      font-weight: 400;
      color: $color-text-gray;
      cursor: pointer;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      transition: all 0.3s ease;

      &:hover {
        color: $color-text-gray;
      }

      &.is-active {
        font-weight: 500;
        color: $color-black;
        border-bottom-color: $color-black;
      }
    }

    &__count {
      padding: 2px 8px;
      font-size: 0.875rem;
      color: $color-white;
      background-color: $color-black;
      border-radius: 4px;
    }

    &__content {
      font-size: 1rem;
      line-height: 1.6;
      color: $color-text-gray;
    }
  }
</style>
