<script setup lang="ts">
  import IconAppSearch from '~icons/app/search'
  import IconAppCart from '~icons/app/cart'
  import IconAppUser from '~icons/app/user'
  import type { ActionLink } from '@/types/ActionLink'
  import type { HeaderLink } from '@/types/HeaderLink'
  import { useCartStore } from '@/stores/cart'
  import { useAuthStore } from '@/stores/auth'
  import { useToast } from '@/composables/useToast'

  const cartStore = useCartStore()
  const authStore = useAuthStore()
  const toast = useToast()
  const router = useRouter()

  const headerLinks: HeaderLink[] = [
    { id: 1, title: 'Shop', path: '/shop' },
    { id: 2, title: 'Blog', path: '#' },
    { id: 3, title: 'Our Story', path: '#' },
    { id: 4, title: 'Contact', path: '#', onlyMobile: true },
    { id: 5, title: 'Terms Of Services', path: '#', onlyMobile: true },
    { id: 6, title: 'Shipping And Returns', path: '#', onlyMobile: true },
  ]

  const actionLinks = computed<ActionLink[]>(() => [
    {
      id: 1,
      name: 'search',
      path: '#',
      ariaLabel: 'Search',
      icon: IconAppSearch,
    },
    {
      id: 2,
      name: 'cart',
      path: '#',
      ariaLabel: 'Cart',
      icon: IconAppCart,
      badge: cartStore.totalCount,
    },
    {
      id: 3,
      name: 'profile',
      path: '#',
      ariaLabel: 'Profile',
      icon: IconAppUser,
    },
  ])

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

  const handleActionClick = (name: string) => {
    if (name === 'cart') {
      cartStore.openCart()
    } else if (name === 'profile') {
      if (authStore.isAuthenticated) {
        authStore.logout()
        toast.show('You have been logged out', 'success')
      } else {
        router.push('/account')
      }
    }
  }

  watch(isMobileMenuOpen, (val) => {
    if (import.meta.client) {
      document.body.style.overflow = val ? 'hidden' : ''
    }
  })
</script>

<template>
  <header class="header">
    <div class="header__container">
      <NuxtLink to="/" class="header__logo"> <span>S</span>HOPPE </NuxtLink>

      <HeaderNav :links="headerLinks" />

      <HeaderActions
        :actions="actionLinks"
        :is-menu-open="isMobileMenuOpen"
        :is-authenticated="authStore.isAuthenticated"
        @toggle="toggleMenu"
        @action-click="handleActionClick"
      />
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
