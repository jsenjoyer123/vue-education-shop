<template>
  <div class="product-card-skeleton">
    <div class="image-wrapper">
      <div class="skeleton-image"></div>
    </div>
    <div class="skeleton-title"></div>
    <div class="skeleton-price"></div>
  </div>
</template>

<style scoped lang="scss">
  .product-card-skeleton {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
    width: 136px;
    height: 188px;

    @media (min-width: $breakpoints-xxl) {
      gap: 24px;
      width: 300px;
      height: 392px;
    }
  }

  .image-wrapper {
    position: relative;
    width: 100%;
  }

  .skeleton-image {
    width: 136px;
    height: 136px;
    background: linear-gradient(
      90deg,
      $color-bg-light 25%,
      $color-border-gray 50%,
      $color-bg-light 75%
    );
    background-size: 200% 100%;
    border-radius: 4px;
    animation: shimmer 1.5s infinite;

    @media (min-width: $breakpoints-xxl) {
      width: 300px;
      height: 300px;
      border-radius: 8px;
    }
  }

  .skeleton-title {
    width: 80%;
    height: 14px;
    background: linear-gradient(
      90deg,
      $color-bg-light 25%,
      $color-border-gray 50%,
      $color-bg-light 75%
    );
    background-size: 200% 100%;
    border-radius: 4px;
    animation: shimmer 1.5s infinite;

    @media (min-width: $breakpoints-xxl) {
      height: 20px;
    }
  }

  .skeleton-price {
    width: 40%;
    height: 14px;
    background: linear-gradient(
      90deg,
      $color-bg-light 25%,
      $color-border-gray 50%,
      $color-bg-light 75%
    );
    background-size: 200% 100%;
    border-radius: 4px;
    animation: shimmer 1.5s infinite;

    @media (min-width: $breakpoints-xxl) {
      height: 20px;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }

    100% {
      background-position: -200% 0;
    }
  }
</style>
