<script setup lang="ts">
  const filters = defineModel<{
    searchQuery: string
    category: string
    sort: string
    stockStatus: string
  }>({ required: true })

  defineProps<{
    categories: string[]
  }>()

  const localSearchQuery = ref(filters.value.searchQuery)

  const debouncedSearch = useDebounce(localSearchQuery, 500)

  watch(debouncedSearch, (newVal) => {
    filters.value.searchQuery = newVal
  })
</script>

<template>
  <div class="filters-container">
    <input
      v-model="localSearchQuery"
      class="filter-element search-input"
      placeholder="Search products..."
    />

    <select v-model="filters.category" class="filter-element category-select">
      <option value="">All Categories</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category.charAt(0).toUpperCase() + category.slice(1) }}
      </option>
    </select>

    <select v-model="filters.sort" class="filter-element sort-select">
      <option value="low-price">Low price</option>
      <option value="high-price">High price</option>
    </select>

    <p class="filter-element price-range">
      Цена:
      <data value="100">100$</data> — <data value="500">500$</data>
    </p>

    <div class="filter-element radio-group">
      <label class="radio-label">
        <input v-model="filters.stockStatus" type="radio" value="" />
        Any
      </label>

      <label class="radio-label">
        <input v-model="filters.stockStatus" type="radio" value="on-sale" />
        On-sale
      </label>

      <label class="radio-label">
        <input v-model="filters.stockStatus" type="radio" value="in-stock" />
        In stock
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .filters-container {
    display: flex;
    flex-direction: column;
  }
</style>
