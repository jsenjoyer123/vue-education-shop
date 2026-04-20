<template>
  <div class="slide-overlay">
    <h3 class="slide-title">{{ title }}</h3>
    <p class="slide-price">{{ price }}</p>
    <BaseButton variant="secondary" @click="$emit('viewProduct')"> View Product </BaseButton>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    title: string
    price: string
  }

  withDefaults(defineProps<Props>(), {
    title: 'Gold big hoops',
    price: '$ 68.00',
  })

  defineEmits<{
    viewProduct: []
  }>()
</script>

<style scoped lang="scss">
  .slide-overlay {
    position: absolute;
    bottom: 24px;
    left: 24px;
    z-index: 10;
    color: white;
  }

  .slide-title {
    margin: 0 0 4px;
    font-size: 24px;
    font-weight: 600;
    text-shadow: 0 2px 4px rgb(0 0 0 / 30%);
  }

  .slide-price {
    margin: 0 0 16px;
    font-size: 16px;
    text-shadow: 0 2px 4px rgb(0 0 0 / 30%);
  }
</style>
