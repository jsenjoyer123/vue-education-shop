<template>
  <nav class="header-nav">
    <ul class="header-nav__list">
      <li v-for="link in desktopLinks" :key="link.id" class="header-nav__item">
        <NuxtLink :to="link.path" class="header-nav__link">
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  interface HeaderLink {
    id: number
    title: string
    path: string
    onlyMobile?: boolean
  }

  const props = defineProps<{
    links: HeaderLink[]
  }>()

  const desktopLinks = computed(() => props.links.filter((link) => !link.onlyMobile))
</script>

<style scoped lang="scss">
  .header-nav {
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

  .header-nav__list {
    display: flex;
    gap: 32px;

    @media (min-width: $breakpoints-l) {
      gap: 60px;
    }
  }

  .header-nav__link {
    font-weight: 500;
    transition: color 0.3s;

    @media (min-width: $breakpoints-l) {
      font-size: 16px;
    }

    &:hover,
    &.router-link-active {
      color: $color-accent;
    }
  }
</style>
