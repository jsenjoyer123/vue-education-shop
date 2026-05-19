<script setup lang="ts">
  import Pagination from '@/components/UI/Pagination.vue'
  import IconAppFilter from '~icons/app/filter'

  const route = useRoute()
  const router = useRouter()

  const ITEMS_PER_PAGE = 6

  const defaultFilters = {
    searchQuery: '',
    category: '',
    sort: 'low-price',
    stockStatus: '',
  }

  const filters = reactive({
    searchQuery: (route.query.searchQuery as string) || defaultFilters.searchQuery,
    category: (route.query.category as string) || defaultFilters.category,
    sort: (route.query.sort as string) || defaultFilters.sort,
    stockStatus: (route.query.stockStatus as string) || defaultFilters.stockStatus,
  })

  watch(
    filters,
    (newFilters) => {
      const query: Record<string, string | undefined> = {
        ...(route.query as Record<string, string>),
      }

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) {
          query[key] = value
        } else {
          query[key] = undefined
        }
      })

      query.page = '1'

      router.push({ query })
    },
    { deep: true },
  )
  const { data: allProducts, pending, error } = useGetAllProducts()

  const { filteredProducts } = useLocalFilters(allProducts, filters)

  const currentPage = computed(() => {
    const page = parseInt(route.query.page as string)
    return isNaN(page) || page < 1 ? 1 : page
  })

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return filteredProducts.value.slice(start, end)
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / ITEMS_PER_PAGE) || 1
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
  <div class="shop-page-container">
    <h1 class="shop-title">
      <span class="shop-title__desktop">Shop The Latest</span>
      <span class="shop-title__mobile">Shop</span>
    </h1>
    <div class="catalog-layout">
      <ProductFilters v-model="filters" class="product-filters" />

      <BaseMobileMenu :is-open="isMobileFiltersOpen" @close="closeMobileFilters">
        <div class="mobile-filters">
          <div class="mobile-filters__header">
            <h2 class="mobile-filters__title">Filters</h2>
            <button class="mobile-filters__close" @click="closeMobileFilters">×</button>
          </div>
          <ProductFilters v-model="filters" />
        </div>
      </BaseMobileMenu>

      <div class="product-list-wrapper">
        <span class="mobile-filters-btn" @click="openMobileFilters">
          <IconAppFilter class="mobile-filters-btn__icon" />
          <span>Filters</span>
        </span>
        <Transition name="fade" mode="out-in">
          <div v-if="error" class="error-state">
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
  </div>
</template>

<style scoped lang="scss">
  .shop-title {
    margin-bottom: 32px;
    font-family: $font-family-secondary;
    font-size: 32px;
    font-weight: 500;
    color: $color-black;

    &__mobile {
      display: none;
    }

    @media (width <= $breakpoints-m) {
      margin-bottom: 24px;
      font-size: 20px;

      &__desktop {
        display: none;
      }

      &__mobile {
        display: inline;
      }
    }
  }

  .catalog-layout {
    display: flex;
    gap: 35px;
  }

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

    @media (width < $breakpoints-xxl) {
      flex: 0 0 auto;
    }
  }

  .product-filters {
    flex-shrink: 0;
    width: 261px;
    background-color: gray;

    @media (width <= $breakpoints-l) {
      display: none;
    }
  }

  .product-list-wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 20px;
    min-height: 974.873px;

    --pagination-offset: 86px;

    @media (width < $breakpoints-xxl) {
      --pagination-offset: 40px;

      gap: 4px;
      min-height: auto;
    }

    @media (max-width: $breakpoints-m) {
      --pagination-offset: 60px;
    }
  }

  .catalog-pagination {
    align-self: center;
    margin-top: var(--pagination-offset);
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

    @media (width <= $breakpoints-l) {
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
      color: $color-text-gray;
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
