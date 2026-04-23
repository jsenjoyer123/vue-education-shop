<template>
  <div class="slide-overlay">
    <h3 class="slide-title">{{ title }}</h3>
    <p class="slide-price">{{ price }}</p>
    <BaseButton class="view-product-btn" variant="transparent" @click="$emit('viewProduct')">
      View Product
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  import BaseButton from '@/components/UI/BaseButton.vue'

  interface Props {
    title?: string
    price?: string
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
    margin-bottom: 26px;
    color: $color-white;
    pointer-events: none;

    @media (width >= $breakpoints-xl) {
      top: 226px;
      bottom: auto;
      left: 39px;
    }
  }

  .slide-title {
    margin: 0 0 4px;
    font-size: 20px;
    font-weight: $font-weight-medium;
    line-height: 26px;
    text-transform: capitalize;
    text-shadow: 0 2px 4px rgb(0 0 0 / 30%);

    @media (width >= $breakpoints-xl) {
      font-size: 33px;
      letter-spacing: 0;
    }
  }

  .slide-price {
    margin: 0 0 16px;
    font-size: 16px;
    text-shadow: 0 2px 4px rgb(0 0 0 / 30%);

    @media (width >= $breakpoints-xl) {
      margin: 0 0 48px;
      font-size: 26px;
      letter-spacing: 0;
    }
  }

  .view-product-btn {
    width: 92px;
    height: 32px;
    margin-bottom: 26px;
    font-size: 12px;
    font-weight: $font-weight-regular;
    color: $color-white;
    pointer-events: auto;
    border: 1px solid $color-white;
    border-radius: 6px;

    @media (width <= $breakpoints-xl) {
      padding: 9px 6px;
      font-size: 12px;
    }

    @media (width >= $breakpoints-xl) {
      width: auto;
      height: auto;
      padding: 8px 16px;
      font-size: 20px;
    }
  }
</style>
