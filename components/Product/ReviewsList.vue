<script setup lang="ts">
  import { computed, ref, onMounted, onUnmounted } from 'vue'

  interface Review {
    name: string
    email: string
    text: string
    rating: number
    date: string
  }

  const props = defineProps<{
    reviews: Review[]
    productName?: string
  }>()

  const maxLength = ref(30)

  onMounted(() => {
    const mediaQueryList = window.matchMedia('(min-width: 1680px)')
    const updateLength = (mediaQuery: MediaQueryList | MediaQueryListEvent) => {
      maxLength.value = mediaQuery.matches ? 50 : 30
    }
    mediaQueryList.addEventListener('change', updateLength)
    updateLength(mediaQueryList)
    onUnmounted(() => mediaQueryList.removeEventListener('change', updateLength))
  })

  const truncatedProductName = computed(() => {
    const nameStr = props.productName || ''
    return nameStr.length > maxLength.value ? nameStr.slice(0, maxLength.value) + '...' : nameStr
  })
</script>

<template>
  <div class="reviews-col reviews-col--list">
    <h2 class="reviews-title">
      {{ reviews.length }} {{ reviews.length === 1 ? 'Review' : 'Reviews' }} for
      {{ truncatedProductName }}
    </h2>

    <div v-if="reviews.length === 0" class="no-reviews">
      <p>No reviews yet.</p>
    </div>

    <div v-else class="reviews-list">
      <div v-for="(review, index) in reviews" :key="index" class="review-item">
        <div class="review-header">
          <span class="review-name">{{ review.name }}</span>
          <span class="review-date">{{ review.date }}</span>
        </div>
        <div class="review-rating">
          <span class="stars">
            <span v-for="n in 5" :key="n" :class="{ filled: n <= review.rating }">★</span>
          </span>
        </div>
        <p class="review-text">{{ review.text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .reviews-col {
    &--list {
      @media (width >=768px) {
        flex: 1;
      }
    }
  }

  .reviews-title {
    margin-bottom: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: $font-family-primary;
    font-size: 20px;
    font-weight: $font-weight-regular;
    line-height: 1.4;
    color: $color-black;
    white-space: nowrap;
  }

  .no-reviews {
    color: $color-text-gray;
  }

  .reviews-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 420px;
    padding-right: 8px;
    overflow-y: auto;
    scrollbar-color: $color-border-gray transparent;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $color-border-gray;
      border-radius: 4px;
    }
  }

  .review-item {
    padding-bottom: 12px;
    border-bottom: 1px solid $color-border-gray;

    &:last-child {
      border-bottom: none;
    }
  }

  .review-header {
    display: flex;
    gap: 16px;
    align-items: baseline;
    margin-bottom: 4px;
  }

  .review-name {
    font-size: 20px;
    font-weight: 500;
    color: $color-black;
  }

  .review-date {
    font-size: 14px;
    color: $color-text-gray;
  }

  .review-rating {
    margin-bottom: 8px;

    .stars {
      color: $color-border-gray;

      span {
        display: inline-block;
        width: 18px;
        height: 18px;
        font-size: 18px;
        line-height: 18px;
        text-align: center;
      }

      span.filled {
        color: $color-black;
      }
    }
  }

  .review-text {
    font-size: 16px;
    line-height: 1.5;
    color: $color-text-gray;
    overflow-wrap: anywhere;
    white-space: pre-line;
  }
</style>
