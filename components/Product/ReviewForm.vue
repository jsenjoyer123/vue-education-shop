<script setup lang="ts">
  import { ref, computed } from 'vue'

  const TEXT_MAX_LENGTH = 500

  export interface ReviewPayload {
    name: string
    email: string
    text: string
    rating: number
  }

  const emit = defineEmits<{
    (e: 'submit', payload: ReviewPayload): void
  }>()

  const name = ref('')
  const email = ref('')
  const text = ref('')
  const rating = ref(5)
  const saveInfo = ref(false)

  const errors = ref({
    name: '',
    email: '',
    text: '',
  })

  const handleNameInput = () => {
    if (errors.value.name) errors.value.name = ''
  }

  const handleEmailInput = () => {
    if (errors.value.email) errors.value.email = ''
  }

  const handleTextInput = () => {
    if (text.value.length > TEXT_MAX_LENGTH) {
      text.value = text.value.slice(0, TEXT_MAX_LENGTH)
    }
    if (errors.value.text) errors.value.text = ''
  }

  const charsLeft = computed(() => TEXT_MAX_LENGTH - text.value.length)
  const isNearLimit = computed(() => charsLeft.value <= 50)

  const validateEmail = (emailStr: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(emailStr)
  }

  const handleSubmit = () => {
    errors.value = { name: '', email: '', text: '' }

    let isValid = true

    if (!name.value.trim()) {
      errors.value.name = 'Name is required'
      isValid = false
    }

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

    emit('submit', {
      name: name.value.trim(),
      email: email.value.trim(),
      text: text.value.trim(),
      rating: rating.value,
    })

    name.value = ''
    email.value = ''
    text.value = ''
    rating.value = 5
  }
</script>

<template>
  <div class="reviews-col reviews-col--form">
    <form class="review-form" novalidate @submit.prevent="handleSubmit">
      <h3>Add a Review</h3>
      <p class="review-form-subtitle">
        Your email address will not be published. Required fields are marked *
      </p>

      <div class="form-group">
        <div class="textarea-wrapper">
          <textarea
            v-model="text"
            class="review-textarea"
            :maxlength="TEXT_MAX_LENGTH"
            placeholder="Your Review*"
            @input="handleTextInput"
          ></textarea>
          <div class="input-line" :class="{ 'input-line--error': errors.text }"></div>
        </div>
        <div class="textarea-meta">
          <span v-if="errors.text" class="error-text">{{ errors.text }}</span>
          <span class="char-counter" :class="{ 'char-counter--warn': isNearLimit }">
            {{ charsLeft }} / {{ TEXT_MAX_LENGTH }}
          </span>
        </div>
      </div>

      <div class="form-group">
        <UIBaseInput
          v-model="name"
          :error="errors.name"
          type="text"
          placeholder="Enter your name*"
          @update:model-value="handleNameInput"
        />
      </div>

      <div class="form-group">
        <UIBaseInput
          v-model="email"
          :error="errors.email"
          type="email"
          placeholder="Enter your Email*"
          @update:model-value="handleEmailInput"
        />
      </div>

      <label class="save-info-label">
        <input v-model="saveInfo" type="checkbox" class="save-info-checkbox" />
        <span class="save-info-text"
          >Save my name, email, and website in this browser for the next time I comment</span
        >
      </label>

      <div class="form-group">
        <label>Your Rating*</label>
        <ProductStarRatingPicker v-model="rating" />
      </div>

      <div class="submit-wrapper">
        <UIBaseButton type="submit" variant="primary">Submit</UIBaseButton>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
  .reviews-col {
    &--form {
      @media (width >= 768px) {
        flex: 0 0 45%;
        max-width: 45%;
      }
    }
  }

  .review-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 16px 16px;
    background: $color-white;
    border-radius: 8px;

    h3 {
      margin: 0;
      font-size: 1.1rem;
      color: $color-black;
    }

    &-subtitle {
      margin: 0;
      font-size: 0.875rem;
      line-height: 1.5;
      color: $color-text-gray;
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .textarea-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .textarea-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 1rem;
  }

  .char-counter {
    margin-left: auto;
    font-size: 0.75rem;
    color: $color-text-gray;
    transition: color 0.2s ease;

    &--warn {
      color: $color-error;
    }
  }

  .review-textarea {
    width: 100%;
    min-height: 80px;
    padding: 0.5rem 0;
    font-family: $font-family-primary;
    font-size: 16px;
    font-weight: 400;
    line-height: 27px;
    color: $color-text-gray;
    resize: vertical;
    outline: none;
    background: transparent;
    border: none;

    &::placeholder {
      font-family: $font-family-primary;
      font-size: 16px;
      font-weight: 400;
      line-height: 27px;
      color: $color-text-gray;
    }
  }

  .input-line {
    height: 1px;
    background: $color-border-gray;

    &.input-line--error {
      background: $color-error;
    }
  }

  .error-text {
    font-size: 0.75rem;
    color: $color-error;
  }

  .submit-wrapper {
    display: flex;
    justify-content: flex-start;
  }

  .save-info-label {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    cursor: pointer;
  }

  .save-info-checkbox {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    margin: 0;
    cursor: pointer;
  }

  .save-info-text {
    font-family: $font-family-primary;
    font-size: 12px;
    font-weight: $font-weight-regular;
    line-height: 20px;
    color: $color-text-gray;
  }
</style>
