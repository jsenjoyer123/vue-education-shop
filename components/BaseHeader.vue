<template>
  <header class="header">
    <div class="container header__inner">
      <NuxtLink to="/" class="header__logo"> <span>S</span>HOPPE </NuxtLink>

      <nav class="header__nav">
        <ul class="header__list">
          <li v-for="link in navLinks" :key="link.id" class="header__item">
            <NuxtLink :to="link.path" class="header__link">
              {{ link.title }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="header__actions">
        <NuxtLink
          v-for="action in actionLinks"
          :key="action.id"
          :to="action.path"
          class="header__actions-link"
          :class="{ 'header__actions-link--hide-mobile': action.hideOnMobile }"
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
  </header>
</template>

<style scoped lang="scss">
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
    height: 18px;
    margin-top: 16px;

    @media (min-width: $breakpoints-m) {
      height: 80px;
      margin-top: 0;
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
    color: $color-black;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-decoration: none;
    transition: opacity 0.2s ease;

    @media (min-width: $breakpoints-l) {
      font-size: 35px;
    }

    span {
      color: $color-accent;
    }

    &:hover {
      opacity: 0.7;
    }
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
    color: $color-black;
    text-decoration: none;
    transition: color 0.2s ease;

    @media (min-width: $breakpoints-l) {
      font-size: 16px;
    }

    &:hover {
      color: $color-accent;
    }
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
    color: $color-black;
    transition: color 0.2s ease;

    &--hide-mobile {
      display: none;

      @media (min-width: $breakpoints-m) {
        display: flex;
      }
    }

    &:hover {
      color: $color-accent;
    }
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
    padding: 0;
    cursor: pointer;
    background: transparent;
    border: none;

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
      transition: 0.3s;
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

<script setup lang="ts">
  interface NavLink {
    id: number
    title: string
    path: string
  }

  const navLinks: NavLink[] = [
    { id: 1, title: 'Shop', path: '/shop' },
    { id: 2, title: 'Blog', path: '/blog' },
    { id: 3, title: 'Our Story', path: '/our-story' },
  ]

  import IconAppSearch from '~icons/app/search'
  import IconAppCart from '~icons/app/cart'
  import IconAppUser from '~icons/app/user'
  import { markRaw, type Component } from 'vue'

  interface ActionLink {
    id: number
    path: string
    ariaLabel: string
    icon: Component
    hideOnMobile?: boolean
  }

  const actionLinks: ActionLink[] = [
    {
      id: 1,
      path: '/search',
      ariaLabel: 'Поиск',
      icon: markRaw(IconAppSearch),
      hideOnMobile: true,
    },
    { id: 2, path: '/cart', ariaLabel: 'Корзина', icon: markRaw(IconAppCart) },
    {
      id: 3,
      path: '/profile',
      ariaLabel: 'Профиль',
      icon: markRaw(IconAppUser),
      hideOnMobile: true,
    },
  ]

  const isMobileMenuOpen = ref(false)

  const toggleMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }
</script>
