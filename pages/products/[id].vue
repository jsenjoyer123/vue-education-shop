<script setup lang="ts">
  import { ref, watchEffect, onMounted, nextTick, watch } from 'vue'
  import type { SwiperModule, SwiperOptions } from 'swiper/types'
  import type { Product } from '~/types/api'

  interface SwiperElement extends HTMLElement {
    swiper?: {
      update: () => void
    }
    initialize: () => void
  }

  const images = ref<string[]>([])
  const route = useRoute()
  const productId = route.params.id
  const {
    data: product,
    pending,
    error,
  } = await useFetch<Product>(`https://fakestoreapi.com/products/${productId}`)

  const swiperRef = ref<SwiperElement | null>(null)
  let swiperModules: SwiperModule[] = []
  let isSwiperLoaded = false

  const swiperOptions: SwiperOptions = {
    slidesPerView: 1,
    pagination: true,
    spaceBetween: 20,
    loop: true,
  }

  const initSwiper = async () => {
    await nextTick()

    const swiperEl = swiperRef.value

    if (
      !isSwiperLoaded ||
      !images.value?.length ||
      !swiperEl ||
      swiperEl.swiper ||
      typeof swiperEl.initialize !== 'function'
    ) {
      return
    }

    Object.assign(swiperEl, { ...swiperOptions, modules: swiperModules })
    swiperEl.initialize()
    swiperEl.classList.add('is-swiper-ready')
  }

  onMounted(async () => {
    const [{ register }, swiperModuleImports] = await Promise.all([
      import('swiper/element'),
      import('swiper/modules'),
    ])

    swiperModules = [swiperModuleImports.Pagination]
    isSwiperLoaded = true
    register()
    await initSwiper()
  })

  watch(images, initSwiper, { immediate: true, flush: 'post' })

  watch(images, async () => {
    await nextTick()
    const swiperEl = swiperRef.value
    swiperEl?.swiper?.update()
  })

  watchEffect(() => {
    if (product.value) {
      const img = product.value.image
      images.value = [img, img, img, img]
    }
  })
</script>

<template>
  <main class="product-container">
    <div v-if="pending" class="loading">Загрузка товара...</div>
    <div v-else-if="error" class="error">Произошла ошибка при загрузке</div>

    <template v-else-if="product">
      <swiper-container ref="swiperRef" :init="false" class="product-slider">
        <swiper-slide v-for="(image, index) in images" :key="index">
          <img :src="image" alt="product image" />
        </swiper-slide>
      </swiper-container>

      <section class="product-description">
        <h1>{{ product.title }}</h1>
        <p class="price">${{ product.price }}</p>
        <p>Категория: {{ product.category }}</p>
        <p>{{ product.description }}</p>
      </section>
    </template>
  </main>
</template>

<style scoped lang="scss">
  .product-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background-color: #fff;
  }

  .loading,
  .error {
    padding: 50px;
    text-align: center;
  }

  .product-slider {
    width: 100%;
    height: 300px;
    overflow: hidden;
    border-radius: 8px;
  }

  .product-slider.is-swiper-ready {
    display: block;
  }

  swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9f9f9;
  }

  swiper-slide img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .product-description {
    background-color: #fff;
  }

  .price {
    margin: 10px 0;
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }

  swiper-container::part(bullet) {
    width: 8px;
    height: 8px;
    background: #ccc;
    opacity: 0.5;
  }

  swiper-container::part(bullet-active) {
    background: #333;
    opacity: 1;
  }
</style>
