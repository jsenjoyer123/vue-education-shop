<template>
  <fragment>
    <Header />
    <main>
      <section>
        <HomeSlider />
      </section>
      <section class="catalog-section">
        <ProductCatalog />
      </section>
      <section class="about-section container">
        <HomeAdbout />
      </section>
    </main>
    <BaseFooter />
  </fragment>
</template>

<style scoped lang="scss">
  .about-section {
    margin-top: 21px;

    @media (min-width: $breakpoints-xl) {
      margin-top: 90px;
      margin-bottom: 48px;
    }
  }

  .catalog-section {
    margin-top: 96px;
  }
</style>
