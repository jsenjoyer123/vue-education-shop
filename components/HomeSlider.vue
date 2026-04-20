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
        slides-per-view="3"
        grid-rows="1"
        mousewheel-force-to-axis="true"
        navigation="true"
        pagination="true"
        space-between="20"
        loop="true"
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
  .error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 400px;
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
    height: 400px;
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
