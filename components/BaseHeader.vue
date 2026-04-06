<template>
  <header class="header">
    <div class="header__container container">
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

      <div class="header__actions actions">
        <NuxtLink to="/search" class="actions__link" aria-label="Поиск">
          <IconAppSearch class="actions__icon" />
        </NuxtLink>

        <NuxtLink to="/cart" class="actions__link" aria-label="Корзина">
          <IconAppCart class="actions__icon" />
        </NuxtLink>

        <NuxtLink to="/profile" class="actions__link" aria-label="Профиль">
          <IconAppUser class="actions__icon" />
        </NuxtLink>

        <button
          class="actions__burger"
          :class="{ 'actions__burger--active': isMobileMenuOpen }"
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

    &__divider {
      width: 100%;
      margin: 0;
      border: none;
      border-bottom: 1px solid $color-border-gray;
    }

    &__container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80px; // Высота шапки
    }

    &__logo {
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

    &__nav {
      display: none; // На мобильных скрыто
      padding-right: 32px;
      margin: 0 32px 0 auto; // Объединили margin-left: auto и margin-right: 32px
      border-right: 1px solid $color-border-gray;

      @media (min-width: $breakpoints-m) {
        display: block; // Показываем на планшетах и шире
      }

      @media (min-width: $breakpoints-l) {
        padding-right: 48px;
        margin: 0 48px 0 auto;
      }
    }

    &__list {
      display: flex;
      gap: 32px;

      @media (min-width: $breakpoints-l) {
        gap: 60px;
      }
    }

    &__link {
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
  }

  .actions {
    display: flex;
    gap: 16px;
    align-items: center;

    @media (min-width: $breakpoints-m) {
      gap: 24px;
    }

    @media (min-width: $breakpoints-l) {
      gap: 39px;
    }

    &__link {
      display: flex;
      color: $color-black;
      transition: color 0.2s ease;

      &:hover {
        color: $color-accent;
      }
    }

    &__icon {
      width: 24px;
      height: 24px;
      stroke-width: 1.5;
    }

    &__burger {
      position: relative;
      z-index: 51;
      width: 30px;
      height: 20px;
      padding: 0;
      cursor: pointer;
      background: transparent;
      border: none;

      @media (min-width: $breakpoints-m) {
        display: none;
      }

      span {
        &,
        &::before,
        &::after {
          position: absolute;
          width: 100%;
          height: 2px;
          background-color: $color-black;
          transition: 0.3s;
        }

        top: 50%;
        transform: translateY(-50%);

        &::before,
        &::after {
          left: 0;
          content: '';
        }

        &::before {
          top: -8px;
        }

        &::after {
          bottom: -8px;
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

  const isMobileMenuOpen = ref(false)

  const toggleMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }
</script>
