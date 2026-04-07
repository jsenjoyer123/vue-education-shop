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
        <NuxtLink to="/profile" class="header-mobile__action" @click="$emit('close')">
          <IconAppUser class="header-mobile__action-icon" />
          <span>My account</span>
        </NuxtLink>
        <button class="header-mobile__action" @click="$emit('logout')">
          <IconAppLogout class="header-mobile__action-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  </BaseMobileMenu>
</template>

<script setup lang="ts">
  import IconAppSearch from '~icons/app/search'
  import IconAppUser from '~icons/app/user'
  import IconAppLogout from '~icons/app/logout'

  interface HeaderLink {
    id: number
    title: string
    path: string
    onlyMobile?: boolean
  }

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
    &__search {
      position: relative;
      margin-bottom: 32px;
    }

    &__search-input {
      width: 100%;
      padding: 12px 40px 12px 0;
      font-size: 14px;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid $color-border-gray;

      &::placeholder {
        color: $color-text-gray;
      }

      &:focus {
        outline: none;
        border-bottom-color: $color-black;
      }
    }

    &__search-icon {
      position: absolute;
      top: 50%;
      right: 0;
      width: 20px;
      height: 20px;
      cursor: pointer;
      transform: translateY(-50%);
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 32px;
    }

    &__link,
    &__action {
      font-size: 16px;
      font-weight: 500;
      transition: color 0.2s;

      /* &:hover {
        color: $color-accent;
      } */
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
      height: 20px;
    }
  }
</style>
