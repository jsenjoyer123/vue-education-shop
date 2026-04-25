<template>
  <Header />
  <main>
    <section>
      <HomeSlider />
    </section>
    <section class="about-section">
      <HomeAdbout />
    </section>
  </main>
  <BaseFooter />
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
