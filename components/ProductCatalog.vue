<script setup lang="ts">
  import Pagination from '@/components/UI/Pagination.vue'

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
</script>

<template>
  <div v-if="error" class="error-message">Ошибка загрузки товаров: {{ error.message }}</div>
  <div v-else class="catalog-container">
    <ProductFilters class="product-filters" />
    <div class="product-list-wrapper">
      <Transition name="fade" mode="out-in">
        <ProductList
          :key="currentPage"
          :products="paginatedProducts"
          :pending="pending"
          class="product-list"
        />
      </Transition>
      <Pagination
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
  }
</style>
