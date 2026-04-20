<template>
  <div class="container">
    <ClientOnly>
      <div v-if="error" class="error-container">
        <p>Ошибка загрузки данных: {{ error.message }}</p>
      </div>

      <div v-else-if="pending" class="spinner-container">
        <div class="spinner" />
      </div>

      <swiper-container
        v-else-if="pictures && pictures.length"
        slides-per-view="1"
        grid-rows="1"
        mousewheel-force-to-axis="true"
        pagination="true"
        space-between="20"
        loop="true"
        lazy="true"
        preload-images="false"
        watch-slides-visibility="true"
        watch-slides-progress="true"
        autoplay-delay="7000"
        autoplay-pause-on-mouse-enter="true"
      >
        <swiper-slide v-for="pic in pictures" :key="pic.id" class="my-slide">
          <img :src="pic.download_url" :alt="pic.author" loading="lazy" decoding="async" />
          <SliderSlideOverlay @view-product="handleViewProduct" />
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
  </div>
</template>

<script setup>
  import { useGetImages } from '@/composables/api/picsum/useGetImages'

  const { data: pictures, pending, error } = useGetImages({ limit: 10 })

  const handleViewProduct = () => {
    console.log('View Product clicked')
  }
</script>

<style scoped>
  swiper-container {
    display: block;
    height: 354px;
    overflow: hidden;
    border-radius: 8px;
  }

  @media (width >= 1216px) {
    swiper-container {
      height: 646px;
      border-radius: 16px;
    }
  }

  swiper-slide {
    height: 100%;
  }

  swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

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

  @media (width >= 1216px) {
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

  @media (width >= 1216px) {
    swiper-container::part(pagination) {
      bottom: 24px;
    }
  }

  .error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 354px;

    @media (width >= 1216px) {
      height: 646px;
    }

    padding: 20px;
    color: #ff4d4f;
    text-align: center;
    background-color: #fff2f0;
    border: 1px solid #ffccc7;
    border-radius: 8px;
  }

  .spinner-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 354px;

    @media (width >= 1216px) {
      height: 646px;
    }
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgb(0 0 0 / 10%);
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
