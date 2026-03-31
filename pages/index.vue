<script setup lang="ts">
  const { data: products, pending, error, refresh } = useGetAllProducts({ limit: 10 })
</script>

<template>
  <div>
    <div class="catlog-container">
      <IconAppCart class="cart-icon" />
      <span>Каталог</span>
    </div>
    <div v-if="pending">Загрузка...</div>

    <div v-else-if="error">Ошибка: {{ error.message }}</div>

    <ul v-else>
      <li v-for="p in products" :key="p.id">{{ p.title }} — {{ p.price }}</li>
    </ul>

    <button @click="refresh()">Обновить</button>

    <div class="container container-test">контейнер</div>
  </div>
</template>

<style lang="scss" scoped>
  .catlog-container {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 12px;
  }

  .cart-icon {
    width: 20px;
    height: 20px;
  }

  .container-test {
    padding-top: 20px;
    padding-bottom: 20px;
    margin-top: 20px;
    text-align: center;
    background-color: #f0f0f0;
    border: 2px dashed #000;
  }
</style>
