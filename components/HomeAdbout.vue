<template>
  <div class="about-container">
    <h1>Adbout</h1>
    <h2>Who we are and why we do what we do!</h2>
    <p>
      Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam, sollicitudin ante a, gravida
      arcu. Nam fringilla molestie velit, eget pellentesque risus scelerisque a. Nam ac urna
      maximus, tempor magna et, placerat urna. Curabitur eu magna enim. Proin placerat tortor lacus,
      ac sodales lectus placerat quis.
    </p>
    <h2>Top trends</h2>
    @/components/HomeAdbout.vue:8
    <img src="/images/pearls-hands.jpg" alt="Жемчужное ожерелье" class="about-image" />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat
      hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget
      arcu facilisis consequat sed eu felis.
    </p>
  </div>
</template>

<style scoped lang="scss">
  .about-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    max-width: 1200px;
    padding: 20px;
    margin: 0 auto;
  }

  .about-image {
    width: 100%;
    max-width: 600px;
    height: auto;
    border-radius: 8px;
  }
</style>
