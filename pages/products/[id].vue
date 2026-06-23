<script setup lang="ts">
  import { ref, watchEffect, onMounted, nextTick, watch } from 'vue'
  import type { SwiperModule, SwiperOptions } from 'swiper/types'
  import type { Product } from '~/types/api'
  import ProductDetails from '@/components/Product/Details.vue'
  import BaseButton from '@/components/UI/BaseButton.vue'
  import { useCartStore } from '@/stores/cart'
  import { useToast } from '@/composables/useToast'

  import type { SwiperContainer } from 'swiper/element'

  const images = ref<string[]>([])
  const route = useRoute()
  const productId = route.params.id
  const {
    data: product,
    pending,
    error,
  } = await useFetch<Product>(`https://fakestoreapi.com/products/${productId}`)

  const cartStore = useCartStore()
  const { show } = useToast()

  const isExpanded = ref(false)

  const handleAddToCart = () => {
    if (product.value) {
      cartStore.addItem(product.value)
      show(`"${product.value.title}" was added to your Shopping bag.`, 'success')
    }
  }

  const swiperRef = ref<SwiperContainer | null>(null)
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
  <div class="product-page container">
    <div v-if="pending" class="loading">Loading product...</div>
    <div v-else-if="error" class="error">An error occurred while loading</div>

    <template v-else-if="product">
      <div class="mobile-layout">
        <swiper-container ref="swiperRef" :init="false" class="product-slider">
          <swiper-slide v-for="(image, index) in images" :key="index">
            <img :src="image" alt="product image" />
          </swiper-slide>
        </swiper-container>

        <section class="product-description">
          <h1>{{ product.title }}</h1>
          <p class="price">${{ product.price }}</p>
          <BaseButton class="add-to-cart-btn" @click="handleAddToCart">ADD TO CART</BaseButton>
          <p class="description" :class="{ 'is-truncated': !isExpanded }">
            {{ product.description }}
          </p>
          <button
            v-if="product.description.length > 100"
            class="view-more-btn"
            @click="isExpanded = !isExpanded"
          >
            {{ isExpanded ? 'View less' : 'View more' }}
          </button>
        </section>
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

  .product-slider {
    width: 100%;
    height: 340px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 8px;
  }

  .product-slider.is-swiper-ready {
    display: block;
  }

  swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }

  swiper-slide img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .product-description {
    background-color: #fff;

    h1 {
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 20px;
      white-space: nowrap;
    }

    .description {
      margin-bottom: 8px;

      &.is-truncated {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .view-more-btn {
      padding: 0;
      font-size: 14px;
      font-weight: bold;
      color: $color-accent;
      cursor: pointer;
      background: none;
      border: none;
    }
  }

  .price {
    margin: 10px 0;
    font-size: 16px;
    font-weight: bold;
    color: $color-accent;
  }

  .add-to-cart-btn {
    width: 100%;
    margin-bottom: 20px;
    font-size: 12px;
    border: 1px solid $color-black;
    border-radius: 4px;
  }

  swiper-container::part(pagination) {
    bottom: 10px;
    display: flex;
    width: 100%;
    padding: 0;
  }

  swiper-container::part(bullet) {
    flex: 1;
    height: 2px;
    margin: 0;
    background-color: $color-border-gray;
    border-radius: 0;
    opacity: 1;
    transition: background-color 0.3s ease;
  }

  swiper-container::part(bullet-active) {
    flex: 1;
    height: 2px;
    margin: 0;
    background-color: $color-black;
    border-radius: 0;
  }
</style>
