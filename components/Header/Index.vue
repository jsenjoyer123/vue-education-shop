<template>
  <header class="header">
    <div class="header__container">
      <NuxtLink to="/" class="header__logo"> <span>S</span>HOPPE </NuxtLink>

      <HeaderNav :links="headerLinks" />

      <HeaderActions :actions="actionLinks" :is-menu-open="isMobileMenuOpen" @toggle="toggleMenu" />
    </div>

    <div class="container">
      <hr class="header__divider" />
    </div>

    <HeaderMobileMenu
      :is-open="isMobileMenuOpen"
      :links="headerLinks"
      @close="isMobileMenuOpen = false"
      @logout="handleLogout"
      @search="handleSearch"
    />
  </header>
</template>

<script setup lang="ts">
  import IconAppSearch from '~icons/app/search'
  import IconAppCart from '~icons/app/cart'
  import IconAppUser from '~icons/app/user'
  import type { ActionLink } from '@/types/ActionLink'
  import type { HeaderLink } from '@/types/HeaderLink'

  const headerLinks: HeaderLink[] = [
    { id: 1, title: 'Shop', path: '#' },
    { id: 2, title: 'Blog', path: '#' },
    { id: 3, title: 'Our Story', path: '#' },
    { id: 4, title: 'Contact', path: '#', onlyMobile: true },
    { id: 5, title: 'Terms Of Services', path: '#', onlyMobile: true },
    { id: 6, title: 'Shipping And Returns', path: '#', onlyMobile: true },
  ]

  const actionLinks: ActionLink[] = [
    {
      id: 1,
      name: 'search',
      path: '#',
      ariaLabel: 'Поиск',
      icon: IconAppSearch,
    },
    { id: 2, name: 'cart', path: '#', ariaLabel: 'Корзина', icon: IconAppCart },
    {
      id: 3,
      name: 'profile',
      path: '#',
      ariaLabel: 'Профиль',
      icon: IconAppUser,
    },
  ]

  const isMobileMenuOpen = ref(false)

  const toggleMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const handleSearch = (query: string) => {
    console.log('Searching for:', query)
    isMobileMenuOpen.value = false
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
    top: 0;
    left: 0;
    z-index: 50;
    width: 100%;

    &__container {
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

    &__divider {
      display: none;
      margin: 0;
      border: none;
      border-top: 1px solid $color-border-gray;

      @media (min-width: $breakpoints-m) {
        display: block;
      }
    }

    &__logo {
      font-family: $font-family-stencil;
      font-size: clamp(25px, 3.75vw, 35px);
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 1px;

      span {
        color: $color-accent;
      }
    }
  }
</style>
