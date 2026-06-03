<script setup lang="ts">
  import { ref, watchEffect } from 'vue'

  const props = defineProps<{
    images: string[]
  }>()

  const activeImage = ref<string>('')

  watchEffect(() => {
    if (props.images && props.images.length > 0) {
      activeImage.value = props.images[0]
    }
  })
</script>

<template>
  <section class="mini-image">
    <img
      v-for="(image, index) in images"
      :key="index"
      :src="image"
      alt="thumbnail"
      @click="activeImage = image"
    />
  </section>

  <section class="image">
    <img :src="activeImage" alt="product image" />
  </section>
</template>

<style scoped lang="scss">
  .mini-image {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 500px;
    overflow-y: auto;
    background-color: green;
  }

  .mini-image img {
    width: 80px;
    height: 80px;
    cursor: pointer;
    object-fit: cover;
  }

  .image {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 500px;
    background-color: blue;
  }

  .image img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
</style>
