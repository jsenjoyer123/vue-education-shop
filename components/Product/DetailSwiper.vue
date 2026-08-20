<script setup lang="ts">
  import { ref, watch, onMounted, nextTick } from 'vue'
  import type { SwiperModule, SwiperOptions } from 'swiper/types'
  import type { SwiperContainer } from 'swiper/element'

  const props = defineProps<{
    images: string[]
  }>()

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
      !props.images?.length ||
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
    const [{ register }, { Pagination: paginationClass }] = await Promise.all([
      import('swiper/element'),
      import('swiper/modules'),
    ])

    swiperModules = [paginationClass]
    isSwiperLoaded = true
    register()
    await initSwiper()
  })

  watch(() => props.images, initSwiper, { immediate: true, flush: 'post' })

  watch(
    () => props.images,
    async () => {
      await nextTick()
      const swiperEl = swiperRef.value
      swiperEl?.swiper?.update()
    },
  )
</script>

<template>
  <swiper-container ref="swiperRef" :init="false" class="product-slider">
    <swiper-slide v-for="(image, index) in images" :key="index">
      <img :src="image" alt="product image" />
    </swiper-slide>
  </swiper-container>
</template>

<style scoped lang="scss">
  .product-slider {
    width: 100%;
    height: 340px;
    overflow: hidden;
    background-color: $color-white;
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
    background-color: $color-bg-light;
    border-radius: 8px;
  }

  swiper-slide img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
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
