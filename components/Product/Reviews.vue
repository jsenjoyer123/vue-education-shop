<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useToast } from '@/composables/useToast'
  import { formatDate } from '@/utils/formatDate'
  import type { ReviewPayload } from './ReviewForm.vue'

  const props = defineProps<{
    productId: string
    productName?: string
  }>()

  const emit = defineEmits<{
    (e: 'update-count', count: number): void
  }>()

  interface Review {
    name: string
    email: string
    text: string
    rating: number
    date: string
  }

  const reviews = ref<Review[]>([])
  const { show: showToast } = useToast()

  const loadReviews = () => {
    const saved = localStorage.getItem(`reviews_${props.productId}`)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        reviews.value = parsed.map(
          (r: {
            name?: string
            email?: string
            text?: string
            rating?: unknown
            date?: string
          }) => ({
            name: r.name || r.email?.split('@')[0] || 'Anonymous',
            email: r.email || '',
            text: r.text || '',
            rating: typeof r.rating === 'number' ? r.rating : 5,
            date: r.date || formatDate(new Date()),
          }),
        )
      } catch {
        reviews.value = []
      }
    }
    emit('update-count', reviews.value.length)
  }

  const handleFormSubmit = (payload: ReviewPayload) => {
    const newReview: Review = {
      ...payload,
      date: formatDate(new Date()),
    }
    reviews.value.push(newReview)
    localStorage.setItem(`reviews_${props.productId}`, JSON.stringify(reviews.value))
    emit('update-count', reviews.value.length)
    showToast('Review submitted successfully!')
  }

  onMounted(() => {
    loadReviews()
  })
</script>

<template>
  <div class="reviews-section">
    <ProductReviewsList :reviews="reviews" :product-name="productName" />
    <ProductReviewForm @submit="handleFormSubmit" />
  </div>
</template>

<style scoped lang="scss">
  .reviews-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 42px;

    @media (width >= 768px) {
      flex-direction: row;
      gap: 32px;
    }
  }
</style>
