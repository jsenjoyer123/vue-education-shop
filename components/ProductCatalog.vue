<script setup lang="ts">
  import Pagination from '@/components/UI/Pagination.vue'
  import IconAppFilter from '~icons/app/filter'
  import IconMdiAlertCircle from '~icons/mdi/alert-circle'

  const route = useRoute()
  const router = useRouter()
  const ITEMS_PER_PAGE = 6

  const { data: allProducts, pending, error } = useGetAllProducts()

  const currentPage = computed(() => {
    const page = parseInt(route.query.page as string)
    return isNaN(page) || page < 1 ? 1 : page
  })

  const paginatedProducts = computed(() => {
    if (!allProducts.value) return []
    const start = (currentPage.value - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return allProducts.value.slice(start, end)
  })

  const totalPages = computed(() => {
    if (!allProducts.value) return 1
    return Math.ceil(allProducts.value.length / ITEMS_PER_PAGE)
  })

  const handlePageChange = (page: number) => {
    router.push({ query: { ...route.query, page: page.toString() } })
  }

  const isMobileFiltersOpen = ref(false)

  const openMobileFilters = () => {
    isMobileFiltersOpen.value = true
  }

  const closeMobileFilters = () => {
    isMobileFiltersOpen.value = false
  }

  watch(isMobileFiltersOpen, (val) => {
    if (import.meta.client) {
      document.body.style.overflow = val ? 'hidden' : ''
    }
  })
</script>

<template>
  <div class="catalog-container">
    <ProductFilters class="product-filters" />

    <BaseMobileMenu :is-open="isMobileFiltersOpen" @close="closeMobileFilters">
      <div class="mobile-filters">
        <div class="mobile-filters__header">
          <h2 class="mobile-filters__title">Filters</h2>
          <button class="mobile-filters__close" @click="closeMobileFilters">×</button>
        </div>
        <ProductFilters />
      </div>
    </BaseMobileMenu>

    <div class="product-list-wrapper">
      <span class="mobile-filters-btn" @click="openMobileFilters">
        <IconAppFilter class="mobile-filters-btn__icon" />
        <span>Filters</span>
      </span>
      <Transition name="fade" mode="out-in">
        <div v-if="error" class="error-state">
          <IconMdiAlertCircle class="error-state__icon" />
          <p class="error-state__title">Не удалось загрузить товары</p>
          <p class="error-state__message">{{ error.message }}</p>
        </div>
        <ProductList
          v-else
          :key="currentPage"
          :products="paginatedProducts"
          :pending="pending"
          class="product-list"
        />
      </Transition>
      <Pagination
        v-if="!error"
        :current-page="currentPage"
        :total-pages="totalPages"
        class="catalog-pagination"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .product-list {
    flex: 1;
  }

  .catalog-container {
    display: flex;
    gap: 35px;
  }

  .product-filters {
    flex-shrink: 0;
    width: 261px;
    background-color: gray;

    @media (width <= calc($breakpoints-m - 1px)) {
      display: none;
    }
  }

  .product-list-wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 20px;
    min-height: 974.873px;
  }

  .catalog-pagination {
    align-self: center;
    margin-top: 86px;

    @media (max-width: $breakpoints-m) {
      margin-top: 0;
    }
  }

  .mobile-filters-btn {
    display: none;
    gap: 8px;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: $color-accent;
    text-transform: uppercase;
    cursor: pointer;

    @media (width <= calc($breakpoints-m - 1px)) {
      display: flex;
    }

    &__icon {
      width: 18px;
      height: 18px;
    }
  }

  .error-state {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    text-align: center;

    &__icon {
      width: 64px;
      height: 64px;
      color: #dc2626;
    }

    &__title {
      margin: 0;
      font-family: $font-family-secondary;
      font-size: 24px;
      font-weight: 500;
      color: $color-black;
    }

    &__message {
      margin: 0;
      font-size: 16px;
      color: $color-gray;
    }
  }

  .mobile-filters {
    padding: 24px 20px 40px;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 32px;
    }

    &__title {
      margin: 0;
      font-family: $font-family-secondary;
      font-size: 20px;
      font-weight: 500;
      text-transform: uppercase;
    }

    &__close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      font-size: 24px;
      color: $color-black;
      cursor: pointer;
      background: none;
      border: none;
      transition: color 0.2s;

      &:hover {
        color: $color-accent;
      }
    }
  }
</style>
