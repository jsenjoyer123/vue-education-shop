<template>
  <BaseMobileMenu :is-open="isOpen" @close="$emit('close')">
    <div class="header-mobile">
      <div class="header-mobile__search">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          class="header-mobile__search-input"
          @keyup.enter="handleSearch"
        />
        <IconAppSearch class="header-mobile__search-icon" @click="handleSearch" />
      </div>

      <nav class="header-mobile__nav">
        <ul class="header-mobile__list">
          <li v-for="link in links" :key="link.id" class="header-mobile__item">
            <NuxtLink :to="link.path" class="header-mobile__link" @click="$emit('close')">
              {{ link.title }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <hr class="header-mobile__divider" />

      <div class="header-mobile__actions">
        <NuxtLink to="#" class="header-mobile__action" @click="$emit('close')">
          <IconAppUser class="header-mobile__action-icon" />
          <span>My account</span>
        </NuxtLink>
        <BaseButton variant="transparent" class="header-mobile__action" @click="$emit('logout')">
          <IconAppLogout class="header-mobile__action-icon" />
          <span>Logout</span>
        </BaseButton>
      </div>
    </div>
  </BaseMobileMenu>
</template>

<script setup lang="ts">
  import type { HeaderLink } from '@/types/HeaderLink'
  import BaseButton from '@/components/UI/BaseButton.vue'

  defineProps<{
    isOpen: boolean
    links: HeaderLink[]
  }>()

  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'logout'): void
    (e: 'search', query: string): void
  }>()

  const searchQuery = ref('')

  const handleSearch = () => {
    if (searchQuery.value.trim()) {
      emit('search', searchQuery.value)
      searchQuery.value = ''
    }
  }
</script>

<style scoped lang="scss">
  .header-mobile {
    &__search,
    &__list {
      margin-bottom: 32px;
    }

    &__search {
      position: relative;
    }

    &__search-input {
      width: 100%;
      height: 32px;
      padding: 0 12px 0 40px;
      font-size: 12px;
      background-color: $color-bg-light;
      border: none;
      border-radius: 4px;

      &::placeholder {
        color: $color-text-gray;
      }

      &:focus {
        outline: none;
      }
    }

    &__search-icon {
      position: absolute;
      top: 50%;
      left: 12px;
      width: 20px;
      aspect-ratio: 1;
      color: $color-text-gray;
      cursor: pointer;
      transform: translateY(-50%);
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    &__link,
    &__action {
      font-size: 20px;
      font-weight: 500;
      transition: color 0.2s;
    }

    &__divider {
      margin-bottom: 24px;
      border: none;
      border-top: 1px solid $color-border-gray;
    }

    &__actions {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    &__action {
      display: flex;
      gap: 12px;
      align-items: center;

      span {
        text-transform: uppercase;
      }
    }

    &__action-icon {
      width: 20px;
      aspect-ratio: 1;
    }
  }
</style>
