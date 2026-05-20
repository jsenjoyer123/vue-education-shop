<script setup lang="ts">
  import IconAppFilterSearch from '~icons/app/filter_search'
  import { ref, watch } from 'vue'

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

  const handleToggle = (value: string) => {
    if (filters.value.stockStatus === value) {
      filters.value.stockStatus = ''
    } else {
      filters.value.stockStatus = value
    }
  }
</script>

<template>
  <div class="filters-container">
    <div class="filter-element search-wrapper">
      <input v-model="localSearchQuery" class="search-input" placeholder="Search" />
      <IconAppFilterSearch class="search-icon" />
    </div>

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
        <span class="label-text">On-sale</span>
        <input
          v-model="filters.stockStatus"
          type="radio"
          value="on-sale"
          class="toggle-switch"
          @click="handleToggle('on-sale')"
        />
      </label>

      <label class="radio-label">
        <span class="label-text">In stock</span>
        <input
          v-model="filters.stockStatus"
          type="radio"
          value="in-stock"
          class="toggle-switch"
          @click="handleToggle('in-stock')"
        />
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .filters-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 0;
    margin: 0;
    font-family: $font-family-primary;
    color: $color-black;

    @media (width > $breakpoints-l) {
      padding: 0;
    }
  }

  .filter-element {
    width: 100%;
  }

  .search-wrapper {
    display: flex;
    align-items: center;
    padding-bottom: 6px;
    margin-bottom: 15px;
    border-bottom: 2px solid $color-border-gray;
    transition: border-color 0.2s ease;

    .search-input {
      flex: 1;
      width: 100%;
      font-family: $font-family-primary;
      font-size: 16px;
      color: $color-black;
      outline: none;
      background: transparent;
      border: none;

      &::placeholder {
        color: $color-text-gray;
      }
    }

    .search-icon {
      margin-left: 8px;
      color: $color-text-gray;
      cursor: text;
      transition: color 0.2s ease;
    }

    &:focus-within {
      border-bottom-color: $color-black;

      .search-icon {
        color: $color-black;
      }
    }
  }

  select.filter-element {
    padding: 8px;
    font-family: $font-family-primary;
    font-size: 16px;
    color: $color-black;
    cursor: pointer;
    outline: none;
    background-color: $color-white;
    border: 1px solid $color-border-gray;
    border-radius: 4px;

    &:focus {
      border-color: $color-black;
    }

    @media (width > $breakpoints-l) {
      height: 53px;
    }
  }

  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 42px;

    .radio-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      cursor: pointer;
      user-select: none;
    }
  }

  .toggle-switch {
    position: relative;
    flex-shrink: 0;
    width: 44px;
    height: 24px;
    appearance: none;
    cursor: pointer;
    outline: none;
    background-color: $color-border-gray;
    border-radius: 24px;
    transition: background-color 0.3s ease;

    &::after {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      content: '';
      background-color: $color-white;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba($color-black, 0.2);
      transition: transform 0.3s ease;
    }

    &:checked {
      background-color: $color-accent;

      &::after {
        transform: translateX(20px);
      }
    }
  }

  .category-select {
    margin-bottom: -8px;
  }

  .sort-select {
    margin-bottom: 15px;
  }

  .price-range {
    margin-bottom: 15px;
    font-weight: $font-weight-medium;
  }
</style>
