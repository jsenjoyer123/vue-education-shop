<script setup lang="ts">
  const filters = defineModel<{
    searchQuery: string
    category: string
    sort: string
    stockStatus: string
  }>({ required: true })
</script>

<template>
  <div class="filters-container">
    <input
      v-model="filters.searchQuery"
      class="filter-element search-input"
      placeholder="Search products..."
    />

    <select v-model="filters.category" class="filter-element category-select">
      <option value="">All Categories</option>
      <option value="rings">Rings</option>
      <option value="earrings">Earrings</option>
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
