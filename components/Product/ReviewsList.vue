<script setup lang="ts">
  import { computed } from 'vue'

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

  const truncatedProductName = computed(() => {
    const nameStr = props.productName || ''
    return nameStr.length > 15 ? nameStr.slice(0, 15) + '...' : nameStr
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
      @media (width >= 768px) {
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
    font-weight: 500;
    color: $color-black;
  }

  .review-date {
    font-size: 0.875rem;
    color: $color-text-gray;
  }

  .review-rating {
    margin-bottom: 8px;

    .stars {
      color: $color-border-gray;

      span {
        font-size: 16px;
      }

      span.filled {
        color: $color-black;
      }
    }
  }

  .review-text {
    line-height: 1.5;
    color: $color-text-gray;
  }
</style>
