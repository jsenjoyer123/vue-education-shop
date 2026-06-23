<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import type { Product } from '~/types/api'
  import ProductDetails from '@/components/Product/Details.vue'
  import ProductDetailSwiper from '@/components/Product/DetailSwiper.vue'
  import ProductDetailDescription from '@/components/Product/DetailDescription.vue'

  const route = useRoute()
  const productId = route.params.id
  const {
    data: product,
    pending,
    error,
  } = await useFetch<Product>(`https://fakestoreapi.com/products/${productId}`)

  const images = ref<string[]>([])

  watchEffect(() => {
    if (product.value) {
      const img = product.value.image
      images.value = [img, img, img, img]
    }
  })
</script>

<template>
  <div class="product-page container">
    <div v-if="pending" class="loading">Loading product...</div>
    <div v-else-if="error" class="error">An error occurred while loading</div>

    <template v-else-if="product">
      <div class="mobile-layout">
        <ProductDetailSwiper :images="images" />
        <ProductDetailDescription :product="product" />
      </div>

      <div class="desktop-layout">
        <ProductDetails :product="product" />
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
  .product-page {
    min-height: 50vh;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .loading,
  .error {
    padding: 50px;
    font-size: 1.5rem;
    text-align: center;
  }

  .mobile-layout {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #fff;
  }

  .desktop-layout {
    display: none;
  }

  @media (width >=1216px) {
    .mobile-layout {
      display: none;
    }

    .desktop-layout {
      display: block;
    }
  }
</style>
