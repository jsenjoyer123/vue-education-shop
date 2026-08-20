<script setup>
  import { Autoplay, Pagination } from 'swiper/modules'
  import { computed, ref } from 'vue'
  import { useGetImages, getOptimizedImageUrl } from '@/composables/api/picsum/useGetImages'
  import BaseAsyncWrapper from '@/components/UI/BaseAsyncWrapper.vue'

  const imagesLimit = 10
  const placeholderSlides = Array.from({ length: imagesLimit }, () => null)

  const { data: pictures, error } = useGetImages({ limit: imagesLimit })

  const loadedImages = ref({})
  const containerRef = ref(null)

  const sliderSlides = computed(() => (pictures.value?.length ? pictures.value : placeholderSlides))

  const swiperOptions = {
    modules: [Autoplay, Pagination],
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

  const swiper = useSwiper(containerRef, swiperOptions)

  const onImageLoad = (id) => {
    loadedImages.value[id] = true
    swiper.instance.value?.update()
  }

  const handleViewProduct = () => {
    console.log('View Product clicked')
  }
</script>

<template>
  <div class="container">
    <BaseAsyncWrapper :error="error && !pictures?.length ? error : null">
      <template #error="{ error: err }">
        <div class="error-container">
          <p>Error loading data: {{ err.message }}</p>
        </div>
      </template>

      <swiper-container ref="containerRef" :init="false">
        <swiper-slide v-for="(pic, index) in sliderSlides" :key="index" class="my-slide">
          <div v-if="!pic || !loadedImages[pic.id]" class="image-spinner">
            <div class="spinner small" />
          </div>

          <img
            v-if="pic"
            :src="getOptimizedImageUrl(pic.id, 800, 400)"
            :alt="pic.author"
            :class="{ 'img-loaded': loadedImages[pic.id] }"
            :loading="index === 0 ? 'eager' : 'lazy'"
            :fetchpriority="index === 0 ? 'high' : 'auto'"
            @load="onImageLoad(pic.id)"
          />

          <SliderSlideOverlay @view-product="handleViewProduct" />
        </swiper-slide>
      </swiper-container>
    </BaseAsyncWrapper>
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

  .image-spinner {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    background: $color-bg-light;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba($color-black, 0.1);
    border-top: 4px solid $color-accent;
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

  swiper-container::part(bullet) {
    width: 4px;
    height: 4px;
    background: $color-white;
    border-radius: 50%;
    opacity: 0.5;
  }

  swiper-container::part(bullet-active) {
    width: 7px;
    height: 7px;
    background: transparent;
    border: 2px solid $color-white;
    border-radius: 50%;
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
    position: absolute;
    right: 0;
    bottom: 8px;
    left: 0;
    z-index: 10;
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

  .error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 354px;
    padding: 20px;
    color: $color-error;
    text-align: center;
    background-color: rgba($color-error, 0.1);
    border: 1px solid rgba($color-error, 0.2);
    border-radius: 8px;

    @media (width >= $breakpoints-xl) {
      height: 646px;
    }
  }
</style>
