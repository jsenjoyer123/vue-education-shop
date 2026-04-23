<script setup>
  import { computed, nextTick, onMounted, ref, watch } from 'vue'
  import { useGetImages, getOptimizedImageUrl } from '@/composables/api/picsum/useGetImages'

  const imagesLimit = 10
  const placeholderSlides = Array.from({ length: imagesLimit }, () => null)

  const { data: pictures, error } = useGetImages({ limit: imagesLimit })

  const loadedImages = ref({})

  const swiperRef = ref(null)
  let swiperModules = []
  let isSwiperLoaded = false

  const sliderSlides = computed(() => (pictures.value?.length ? pictures.value : placeholderSlides))

  const swiperOptions = {
    slidesPerView: 1,
    pagination: true,
    spaceBetween: 20,
    loop: true,
    observer: true,
    observeParents: true,
    lazyPreloadPrevNext: 1,
    autoplay: {
      delay: 7000,
      pauseOnMouseEnter: true,
    },
  }

  const initSwiper = async () => {
    await nextTick()

    const swiperEl = swiperRef.value

    if (
      !isSwiperLoaded ||
      !pictures.value?.length ||
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

    swiperModules = [swiperModuleImports.Autoplay, swiperModuleImports.Pagination]
    isSwiperLoaded = true
    register()
    await initSwiper()
  })

  watch(sliderSlides, initSwiper, { immediate: true, flush: 'post' })

  watch(sliderSlides, async () => {
    await nextTick()
    swiperRef.value?.swiper?.update()
  })

  const onImageLoad = (id) => {
    loadedImages.value[id] = true
    swiperRef.value?.swiper?.update()
  }

  const handleViewProduct = () => {
    console.log('View Product clicked')
  }
</script>

<template>
  <div class="container">
    <div v-if="error && !pictures?.length" class="error-container">
      <p>Ошибка загрузки данных: {{ error.message }}</p>
    </div>

    <swiper-container v-else ref="swiperRef" :init="false">
      <swiper-slide v-for="(pic, index) in sliderSlides" :key="index" class="my-slide">
        <div v-if="!pic || !loadedImages[pic.id]" class="image-spinner">
          <div class="spinner small" />
        </div>

        <img
          v-if="pic"
          :src="getOptimizedImageUrl(pic.id, 800, 400)"
          :alt="pic.author"
          :class="{ 'img-loaded': loadedImages[pic.id] }"
          loading="lazy"
          @load="onImageLoad(pic.id)"
        />

        <SliderSlideOverlay @view-product="handleViewProduct" />
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<style scoped lang="scss">
  swiper-container {
    display: flex;
    gap: 20px;
    height: 354px;
    overflow: auto hidden;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    border-radius: 8px;
  }

  swiper-container::-webkit-scrollbar {
    display: none;
  }

  swiper-container.is-swiper-ready {
    display: block;
    overflow: hidden;
    scroll-snap-type: none;
  }

  @media (width >= $breakpoints-xl) {
    swiper-container {
      height: 646px;
      border-radius: 16px;
    }
  }

  swiper-slide {
    position: relative;
    flex: 0 0 100%;
    height: 100%;
    scroll-snap-align: start;
  }

  swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.3s ease;

    &.img-loaded {
      opacity: 1;
    }
  }

  /* Спиннер для картинки */
  .image-spinner {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    background: #f5f5f5;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgb(0 0 0 / 10%);
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    &.small {
      width: 30px;
      height: 30px;
      border-width: 2px;
    }
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  /* Пагинация */
  swiper-container::part(bullet) {
    width: 4px;
    height: 4px;
    background: white;
    opacity: 0.5;
  }

  swiper-container::part(bullet-active) {
    width: 7px;
    height: 7px;
    background: transparent;
    border: 2px solid white;
    opacity: 1;
  }

  @media (width >= #{$breakpoints-xl}) {
    swiper-container::part(bullet) {
      width: 9.14px;
      height: 9.14px;
    }

    swiper-container::part(bullet-active) {
      width: 16px;
      height: 16px;
    }
  }

  swiper-container::part(pagination) {
    bottom: 8px;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
  }

  @media (width >= $breakpoints-xl) {
    swiper-container::part(pagination) {
      bottom: 24px;
    }
  }

  /* Ошибка */
  .error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 354px;
    padding: 20px;
    color: #ff4d4f;
    text-align: center;
    background-color: #fff2f0;
    border: 1px solid #ffccc7;
    border-radius: 8px;

    @media (width >= $breakpoints-xl) {
      height: 646px;
    }
  }
</style>
