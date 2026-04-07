<template>
  <header class="header">
    <div class="container header__inner">
      <NuxtLink to="/" class="header__logo"> <span>S</span>HOPPE </NuxtLink>

      <nav class="header__nav">
        <ul class="header__list">
          <template v-for="link in headerLinks" :key="link.id">
            <li v-if="!link.onlyMobile" class="header__item">
              <NuxtLink :to="link.path" class="header__link">
                {{ link.title }}
              </NuxtLink>
            </li>
          </template>
        </ul>
      </nav>

      <div class="header__actions">
        <NuxtLink
          v-for="action in actionLinks"
          :key="action.id"
          :to="action.path"
          class="header__actions-link"
          :class="`header__actions-link--${action.name}`"
          :aria-label="action.ariaLabel"
        >
          <component :is="action.icon" class="header__actions-icon" />
        </NuxtLink>

        <button
          class="header__actions-burger"
          :class="{ 'header__actions-burger--active': isMobileMenuOpen }"
          type="button"
          @click="toggleMenu"
        >
          <span></span>
        </button>
      </div>
    </div>

    <div class="container">
      <hr class="header__divider" />
    </div>

    <BaseMobileMenu :is-open="isMobileMenuOpen" @close="isMobileMenuOpen = false">
      <div class="header__mobile-content">
        <div class="header__mobile-search">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search"
            class="header__mobile-search-input"
            @keyup.enter="handleSearch"
          />
          <IconAppSearch class="header__mobile-search-icon" @click="handleSearch" />
        </div>

        <nav class="header__mobile-nav">
          <ul class="header__mobile-list">
            <li v-for="link in headerLinks" :key="link.id" class="header__mobile-item">
              <NuxtLink
                :to="link.path"
                class="header__mobile-link"
                @click="isMobileMenuOpen = false"
              >
                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <hr class="header__mobile-divider" />

        <div class="header__mobile-actions">
          <NuxtLink to="/profile" class="header__mobile-action" @click="isMobileMenuOpen = false">
            <IconAppUser class="header__mobile-action-icon" />
            <span>My account</span>
          </NuxtLink>
          <button class="header__mobile-action" @click="handleLogout">
            <IconAppLogout class="header__mobile-action-icon" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </BaseMobileMenu>
  </header>
</template>

<script setup lang="ts">
  import IconAppSearch from '~icons/app/search'
  import IconAppCart from '~icons/app/cart'
  import IconAppUser from '~icons/app/user'
  import IconAppLogout from '~icons/app/logout'
  import { markRaw, type Component } from 'vue'

  interface HeaderLink {
    id: number
    title: string
    path: string
    onlyMobile?: boolean
  }

  const headerLinks: HeaderLink[] = [
    { id: 1, title: 'Shop', path: '/shop' },
    { id: 2, title: 'Blog', path: '/blog' },
    { id: 3, title: 'Our Story', path: '/our-story' },
    { id: 4, title: 'Contact', path: '/contact', onlyMobile: true },
    { id: 5, title: 'Terms Of Services', path: '/terms', onlyMobile: true },
    { id: 6, title: 'Shipping And Returns', path: '/shipping', onlyMobile: true },
  ]

  interface ActionLink {
    id: number
    name: string
    path: string
    ariaLabel: string
    icon: Component
  }

  const actionLinks: ActionLink[] = [
    {
      id: 1,
      name: 'search',
      path: '/search',
      ariaLabel: 'Поиск',
      icon: markRaw(IconAppSearch),
    },
    { id: 2, name: 'cart', path: '/cart', ariaLabel: 'Корзина', icon: markRaw(IconAppCart) },
    {
      id: 3,
      name: 'profile',
      path: '/profile',
      ariaLabel: 'Профиль',
      icon: markRaw(IconAppUser),
    },
  ]

  // Mobile menu logic
  const isMobileMenuOpen = ref(false)
  const searchQuery = ref('')

  const toggleMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const handleSearch = () => {
    if (searchQuery.value.trim()) {
      console.log('Searching for:', searchQuery.value)
      isMobileMenuOpen.value = false
    }
  }

  const handleLogout = () => {
    console.log('Logging out...')
    isMobileMenuOpen.value = false
  }

  watch(isMobileMenuOpen, (val) => {
    if (process.client) {
      document.body.style.overflow = val ? 'hidden' : ''
    }
  })
</script>

<style scoped lang="scss">
  * {
    -webkit-tap-highlight-color: transparent;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    width: 100%;
    background-color: $color-white;
  }

  .header__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    padding-bottom: 16px;

    @media (min-width: $breakpoints-m) {
      height: 80px;
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  .header__divider {
    display: none;
    margin: 0;
    border: none;
    border-top: 1px solid $color-border-gray;

    @media (min-width: $breakpoints-m) {
      display: block;
    }
  }

  .header__logo {
    font-family: $font-family-stencil;
    font-size: 24px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 1px;

    @media (min-width: $breakpoints-l) {
      font-size: 35px;
    }

    span {
      color: $color-accent;
    }

    /* &:hover {
      opacity: 0.7;
    } */
  }

  .header__nav {
    display: none;
    padding-right: 32px;
    margin: 0 32px 0 auto;
    border-right: 1px solid $color-border-gray;

    @media (min-width: $breakpoints-m) {
      display: block;
    }

    @media (min-width: $breakpoints-l) {
      padding-right: 48px;
      margin-right: 48px;
    }
  }

  .header__list {
    display: flex;
    gap: 32px;

    @media (min-width: $breakpoints-l) {
      gap: 60px;
    }
  }

  .header__link {
    font-weight: 500;

    @media (min-width: $breakpoints-l) {
      font-size: 16px;
    }

    /* &:hover {
      color: $color-accent;
    } */
  }

  .header__actions {
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

  .header__actions-link {
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

  .header__actions-icon {
    width: 18px;
    height: 18px;
    stroke-width: 1.5;

    @media (min-width: $breakpoints-m) {
      width: 24px;
      height: 24px;
    }
  }

  .header__actions-burger {
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

  .header__mobile-search {
    position: relative;
    margin-bottom: 32px;
  }

  .header__mobile-search-input {
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

  .header__mobile-search-icon {
    position: absolute;
    top: 50%;
    right: 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
    transform: translateY(-50%);
  }

  .header__mobile-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 32px;
  }

  .header__mobile-link,
  .header__mobile-action {
    font-size: 16px;
    font-weight: 500;
    transition: color 0.2s;

    /* &:hover {
      color: $color-accent;
    } */
  }

  .header__mobile-divider {
    margin-bottom: 24px;
    border: none;
    border-top: 1px solid $color-border-gray;
  }

  .header__mobile-actions {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .header__mobile-action {
    display: flex;
    gap: 12px;
    align-items: center;

    span {
      text-transform: uppercase;
    }
  }

  .header__mobile-action-icon {
    width: 20px;
    height: 20px;
  }
</style>
