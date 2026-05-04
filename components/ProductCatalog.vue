<template>
  <div v-if="error" class="error-message">Ошибка загрузки товаров: {{ error.message }}</div>
  <div v-else class="catalog-container">
    <ProductFilters class="product-filters" />
    <ProductList :products="products" :pending="pending" class="product-list" />
  </div>
</template>

<script setup lang="ts">
  const { data: products, pending, error } = useGetAllProducts()
</script>
<style scoped lang="scss">
  .catalog-container {
    display: flex;
    gap: 35px;
  }

  .product-filters {
    flex-shrink: 0;
    width: 261px;
    background-color: gray;
  }

  .product-list {
    display: grid;
    grid-template-rows: repeat(3, 300px);
    grid-template-columns: repeat(3, 300px);
    gap: 20px;
  }
</style>
