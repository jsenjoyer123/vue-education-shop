<script setup lang="ts">
  import type { Product } from '@/types/api'
  import { ref, onMounted, nextTick, watch } from 'vue'
  import type { SwiperContainer } from 'swiper/element'
  import Card from './Card.vue'
  import CardSkeleton from './CardSkeleton.vue'
  import BaseAsyncWrapper from '@/components/UI/BaseAsyncWrapper.vue'

  const props = defineProps<{
    products: Product[] | null
    pending?: boolean
    carouselOnMobile?: boolean
  }>()

  const activeCardId = ref<number | null>(null)

  const setActiveCard = (id: number) => {
    activeCardId.value = activeCardId.value === id ? null : id
  }

  const swiperRef = ref<SwiperContainer | null>(null)
  let isSwiperLoaded = false

  const loadSwiper = async () => {
    if (!isSwiperLoaded) {
      const { register } = await import('swiper/element')
      register()
      isSwiperLoaded = true
    }
  }

  const initSwiper = async () => {
    if (!props.carouselOnMobile || !props.products?.length) return
    await nextTick()

    const swiperEl = swiperRef.value
    if (!swiperEl || swiperEl.swiper) return

    await loadSwiper()

    if (!swiperEl || swiperEl.swiper || typeof swiperEl.initialize !== 'function') return

    Object.assign(swiperEl, {
      slidesPerView: 2.2,
      spaceBetween: 10,
      breakpoints: {
        480: { slidesPerView: 3.2 },
      },
    })
    swiperEl.initialize()
    swiperEl.classList.add('is-swiper-ready')
  }

  onMounted(() => {
    if (props.carouselOnMobile && swiperRef.value) {
      initSwiper()
    }
  })

  watch(swiperRef, (el) => {
    if (el && props.carouselOnMobile) {
      initSwiper()
    }
  })

  watch(
    () => props.products,
    async () => {
      if (props.carouselOnMobile) {
        await initSwiper()
        await nextTick()
        swiperRef.value?.swiper?.update()
      }
    },
    { immediate: true, flush: 'post' },
  )
</script>

<template>
  <BaseAsyncWrapper :pending="pending" :is-empty="!products?.length">
    <template #loading>
      <div v-if="carouselOnMobile" class="mobile-only-swiper">
        <div class="skeleton-slider">
          <div v-for="n in 3" :key="n" class="skeleton-slide"><CardSkeleton /></div>
        </div>
      </div>
      <div class="product-list" :class="{ 'hidden-on-mobile': carouselOnMobile }">
        <CardSkeleton v-for="n in 6" :key="n" />
      </div>
    </template>
    <template #empty>
      <div>No products</div>
    </template>

    <div v-if="carouselOnMobile" class="mobile-only-swiper">
      <swiper-container ref="swiperRef" :init="false" class="products-slider">
        <swiper-slide v-for="product in products" :key="product.id">
          <Card v-bind="product" :active-card-id="activeCardId" @set-active="setActiveCard" />
        </swiper-slide>
      </swiper-container>
    </div>

    <div class="product-list" :class="{ 'hidden-on-mobile': carouselOnMobile }">
      <Card
        v-for="product in products"
        :key="product.id"
        v-bind="product"
        :active-card-id="activeCardId"
        @set-active="setActiveCard"
      />
    </div>
  </BaseAsyncWrapper>
</template>

<style scoped lang="scss">
  .product-list {
    --product-list-row-gap: 24px;
    --product-list-column-gap: 24px;

    display: flex;
    flex-wrap: wrap;
    gap: var(--product-list-row-gap) var(--product-list-column-gap);

    @media (width < $breakpoints-xxl) {
      --product-list-row-gap: 20px;
      --product-list-column-gap: 20px;
    }

    @media (width < $breakpoints-xl) {
      --product-list-row-gap: 18px;
      --product-list-column-gap: 18px;
    }

    @media (width <= $breakpoints-l) {
      --product-list-row-gap: 16px;
      --product-list-column-gap: 16px;
    }

    @media (max-width: $breakpoints-m) {
      gap: 32px 20px;
      justify-content: space-between;
    }
  }

  .mobile-only-swiper {
    display: none;

    @media (max-width: $breakpoints-m) {
      display: block;
    }
  }

  .hidden-on-mobile {
    @media (max-width: $breakpoints-m) {
      display: none;
    }
  }

  .products-slider {
    width: 100%;
    padding-bottom: 20px;
    overflow: hidden;
  }

  swiper-slide {
    display: flex;
    height: auto;

    > * {
      flex: 1;
    }
  }

  .skeleton-slider {
    display: flex;
    gap: 10px;
    overflow: hidden;
  }

  .skeleton-slide {
    display: flex;
    flex: 0 0 calc((100% - 10px) / 3.2);

    > * {
      flex: 1;
    }

    @media (width <= 479px) {
      flex: 0 0 calc((100% - 10px) / 2.2);
    }
  }

  .product-list > * {
    box-sizing: border-box;
    flex: 0 0 calc((100% - (var(--product-list-column-gap) + var(--product-list-column-gap))) / 3);

    @media (max-width: $breakpoints-m) {
      flex: 0 0 calc((100% - 20px) / 2);
    }
  }

  .popup-product-details-wrapper {
    width: 100%;
    min-width: 600px;
    max-width: 1000px;
  }
</style>
