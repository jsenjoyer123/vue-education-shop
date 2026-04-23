<template>
  <Header />
  <main>
    <section>
      <HomeSlider />
    </section>
    <section class="about-section container">
      <HomeAdbout />
    </section>
    <slot />
  </main>
</template>

<style scoped lang="scss">
  .about-section {
    margin-top: 21px;

    @media (min-width: $breakpoints-xl) {
      margin-top: 90px;
      margin-bottom: 48px;
    }
  }
</style>
