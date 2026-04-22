<template>
  <Header />
  <main>
    <section>
      <HomeSlider />
    </section>
    <section class="about-section">
      <HomeAdbout />
    </section>
    <slot />
  </main>
</template>

<style scoped lang="scss">
  @use '@/assets/scss/variables' as *;

  .about-section {
    margin-top: 21px;

    @media (min-width: $breakpoints-xl) {
      margin-top: 90px;
      margin-bottom: 48px;
    }
  }
</style>
