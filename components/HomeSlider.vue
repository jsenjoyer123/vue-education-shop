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
        @swiperslidechange="onSlideChange"
      >
        <swiper-slide v-for="pic in pictures" :key="pic.id" class="my-slide">
          <img :src="pic.download_url" :alt="pic.author" />
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

  // const onSlideChange = (event) => {
  //   const [swiper] = event.detail
  //   console.log('Слайд изменился на:', swiper.activeIndex)
  // }
</script>

<style scoped>
  .my-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    color: white;
    background: #42b883;
    border-radius: 8px;
  }

  swiper-container {
    --swiper-navigation-color: #000;
    --swiper-pagination-color: #42b883;
  }
</style>
