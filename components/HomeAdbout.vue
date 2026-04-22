<script setup>
  import { ref } from 'vue'

  const isExpanded = ref(false)
  const isSecondExpanded = ref(false)

  const toggleExpand = () => (isExpanded.value = !isExpanded.value)
  const toggleSecondExpand = () => (isSecondExpanded.value = !isSecondExpanded.value)
</script>

<template>
  <div class="about-container">
    <h1>About</h1>
    <h2>Who we are and why we do what we do!</h2>
    <p :class="{ 'is-clamped': !isExpanded }" @click="toggleExpand">
      Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam, sollicitudin ante a, gravida
      arcu. Nam fringilla molestie velit, eget pellentesque risus scelerisque a. Nam ac urna
      maximus, tempor magna et, placerat urna. Curabitur eu magna enim. Proin placerat tortor lacus,
      ac sodales lectus placerat quis.
    </p>
    <h2>Top trends</h2>
    <img src="/images/pearls-hands.jpg" alt="Жемчужное ожерелье" class="about-image" />
    <p :class="{ 'is-clamped': !isSecondExpanded }" @click="toggleSecondExpand">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat
      hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget
      arcu facilisis consequat sed eu felis.
    </p>
  </div>
</template>

<style scoped lang="scss">
  @use '@/assets/scss/variables' as *;

  .about-container {
    display: flex;
    flex-direction: column;
    gap: 0;
    align-items: flex-start;
    max-width: 100%;
    padding: 20px;
    margin: 0 auto;

    @media (min-width: $breakpoints-l) {
      align-items: center;
      max-width: 672px;
    }
  }

  .about-image {
    width: 100%;
    height: auto;
    margin-bottom: 16px;
    border-radius: 8px;

    @media (min-width: $breakpoints-l) {
      margin-bottom: 48px;
    }
  }

  h1 {
    margin-bottom: 2px;
    font-family: $font-family-primary;
    font-size: 33px;
    font-weight: $font-weight-medium;
    line-height: 43px;

    @media (min-width: $breakpoints-l) {
      margin-bottom: 24px;
    }
  }

  h2:first-of-type {
    margin-bottom: 15px;
    font-family: $font-family-primary;
    font-size: 20px;
    font-weight: $font-weight-regular;
    line-height: 26px;
    text-align: left;

    @media (min-width: $breakpoints-l) {
      margin-bottom: 46px;
    }

    @media (min-width: $breakpoints-l) {
      text-align: center;
    }
  }

  p {
    font-family: $font-family-primary;
    font-size: 16px;
    font-weight: $font-weight-regular;
    line-height: 27px;
    cursor: pointer;

    @media (min-width: $breakpoints-l) {
      -webkit-line-clamp: unset;
    }
  }

  p.is-clamped {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  p:first-of-type {
    margin-bottom: 46px;
  }

  h2:last-of-type {
    align-self: flex-start;
    margin-bottom: 13px;
    font-family: $font-family-primary;
    font-size: 26px;
    font-weight: $font-weight-regular;
    line-height: 35px;

    @media (min-width: $breakpoints-l) {
      margin-bottom: 23px;
    }
  }
</style>
