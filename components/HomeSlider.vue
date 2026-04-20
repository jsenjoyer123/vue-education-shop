<template>
  <div class="container">
    <ClientOnly>
      <swiper-container
        slides-per-view="3"
        grid-rows="1"
        mousewheel-force-to-axis="true"
        navigation="true"
        pagination="true"
        scrollbar="true"
        space-between="20"
        loop="true"
      >
        <swiper-slide v-for="pic in pictures" :key="pic.id" class="my-slide">
          <img :src="pic.download_url" :alt="pic.author" />
          <SlideOverlay @view-product="handleViewProduct" />
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
  </div>
</template>

<script setup>
  import { useGetImages } from '@/composables/api/picsum/useGetImages'

  const {
    data: pictures,
    // pending,
    // error
  } = useGetImages({ limit: 10 })

  const handleViewProduct = () => {
    console.log('View Product clicked')
  }
</script>

<style scoped>
  .my-slide {
    position: relative;
    height: 400px;
    overflow: hidden;
    border-radius: 8px;
  }

  .my-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  swiper-container {
    --swiper-navigation-color: #000;
    --swiper-pagination-color: #42b883;
  }
</style>
