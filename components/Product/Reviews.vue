<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const props = defineProps<{
    productId: string
  }>()

  const emit = defineEmits<{
    (e: 'update-count', count: number): void
  }>()

  interface Review {
    email: string
    text: string
  }

  const reviews = ref<Review[]>([])
  const email = ref('')
  const text = ref('')

  const errors = ref({
    email: '',
    text: '',
  })

  const successMessage = ref('')

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const loadReviews = () => {
    const saved = localStorage.getItem(`reviews_${props.productId}`)
    if (saved) {
      try {
        reviews.value = JSON.parse(saved)
      } catch {
        reviews.value = []
      }
    }
    emit('update-count', reviews.value.length)
  }

  const submitReview = () => {
    errors.value = { email: '', text: '' }
    successMessage.value = ''

    let isValid = true

    if (!email.value.trim()) {
      errors.value.email = 'Email is required'
      isValid = false
    } else if (!validateEmail(email.value)) {
      errors.value.email = 'Invalid email format'
      isValid = false
    }

    if (!text.value.trim()) {
      errors.value.text = 'Review text is required'
      isValid = false
    }

    if (!isValid) return

    const newReview: Review = {
      email: email.value.trim(),
      text: text.value.trim(),
    }

    reviews.value.push(newReview)
    localStorage.setItem(`reviews_${props.productId}`, JSON.stringify(reviews.value))
    emit('update-count', reviews.value.length)

    email.value = ''
    text.value = ''

    successMessage.value = 'Review submitted!'
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  }

  onMounted(() => {
    loadReviews()
  })
</script>

<template>
  <div class="reviews-section">
    <div v-if="reviews.length === 0" class="no-reviews">
      <p>No reviews yet.</p>
    </div>

    <div v-else class="reviews-list">
      <div v-for="(review, index) in reviews" :key="index" class="review-item">
        <div class="review-header">
          <span class="review-email">{{ review.email }}</span>
        </div>
        <p class="review-text">{{ review.text }}</p>
      </div>
    </div>

    <form class="review-form" novalidate @submit.prevent="submitReview">
      <h3>Add a Review</h3>

      <div class="form-group">
        <label>Email</label>
        <UIBaseInput
          v-model="email"
          :error="errors.email"
          type="email"
          placeholder="Enter your email"
        />
      </div>

      <div class="form-group">
        <label>Review</label>
        <textarea
          v-model="text"
          class="review-textarea"
          placeholder="Write your review here..."
        ></textarea>
        <span v-if="errors.text" class="error-text">{{ errors.text }}</span>
      </div>

      <UIBaseButton type="submit" class="submit-btn">Submit</UIBaseButton>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    </form>
  </div>
</template>

<style scoped lang="scss">
  .reviews-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .no-reviews {
    color: #707070;
  }

  .reviews-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .review-item {
    padding-bottom: 12px;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }

  .review-header {
    margin-bottom: 4px;
  }

  .review-email {
    font-weight: 500;
    color: #000;
  }

  .review-text {
    line-height: 1.5;
    color: #707070;
  }

  .review-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    background: #f9f9f9;
    border-radius: 8px;

    h3 {
      margin: 0;
      font-size: 1.1rem;
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;

    label {
      font-size: 0.875rem;
      color: #000;
    }
  }

  .review-textarea {
    width: 100%;
    min-height: 80px;
    padding: 10px;
    font-family: inherit;
    resize: vertical;
    border: 1px solid #d8d8d8;
    border-radius: 4px;

    &:focus {
      outline: none;
      border-color: #000;
    }
  }

  .error-text {
    font-size: 0.75rem;
    color: #e53935;
  }

  .success-message {
    font-size: 0.875rem;
    color: #43a047;
  }
</style>
