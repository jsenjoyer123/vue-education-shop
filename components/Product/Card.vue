<script setup lang="ts">
  import type { Product } from '@/types/api'
  import { useToast } from '@/composables/useToast'
  import { computed } from 'vue'
  import BaseButton from '@/components/UI/BaseButton.vue'
  import { useCartStore } from '@/stores/cart'

  const cartStore = useCartStore()
  const router = useRouter()

  const props = defineProps<Product & { activeCardId?: number | null }>()

  const emit = defineEmits<{
    'set-active': [id: number]
  }>()

  const isMobileActive = computed(() => props.activeCardId === props.id)

  const { show } = useToast()

  const truncatedTitle = computed(() => {
    return props.title.length > 20 ? props.title.slice(0, 20) + '...' : props.title
  })

  const MOBILE_BREAKPOINT = 1216

  const handleCardClick = () => {
    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      router.push(`/products/${props.id}`)
      return
    }
    emit('set-active', props.id)
  }

  const handleAddToCart = () => {
    cartStore.addItem(props)
    show(`"${props.title}" was added to your Shopping bag.`, 'success')
  }

  const handleAddToCartClick = () => {
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      navigateTo(`/products/${props.id}`)
      return
    }

    handleAddToCart()
  }
</script>

<template>
  <div class="product-card" @click="handleCardClick">
    <div class="image-wrapper">
      <span v-if="badge" class="product-badge" :class="`badge-${badge}`">{{
        badge === 'sold-out' ? 'Sold out' : 'On sale'
      }}</span>
      <img class="product-img" :src="image" :alt="title" />
      <BaseButton
        id="add-to-cart"
        variant="transparent"
        :class="{ 'is-visible': isMobileActive }"
        @click.stop="handleAddToCartClick"
      >
        ADD TO CART
      </BaseButton>
    </div>
    <h2>{{ truncatedTitle }}</h2>
    <p>{{ price }}</p>
  </div>
</template>

<style scoped lang="scss">
  .product-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
    width: 136px;
    height: auto;

    @media (min-width: $breakpoints-m) {
      width: 100%;
      height: auto;
      min-height: 0;
    }

    button {
      position: absolute;
      bottom: 0;
      left: 0;
      visibility: hidden;
      width: 100%;
      height: 64px;
      padding: 0;
      font-family: $font-family-mono;
      font-size: 14px;
      font-weight: $font-weight-medium;
      color: $color-black;
      background: $color-white;
      border-radius: 0 0 4px 4px;
      opacity: 0;
      transition:
        opacity 0.3s ease,
        visibility 0.3s ease;
    }

    @media (width >= $breakpoints-xl) {
      &:hover #add-to-cart {
        visibility: visible;
        opacity: 1;
      }
    }

    @media (min-width: $breakpoints-xxl) {
      gap: 24px;
      width: 300px;
      height: 392px;
    }

    h2 {
      font-family: $font-family-primary;
      font-size: 14px;
      font-weight: $font-weight-medium;
      text-align: left;

      @media (min-width: $breakpoints-m) {
        font-size: 14px;
      }

      @media (min-width: $breakpoints-xxl) {
        font-size: 20px;
      }
    }

    p {
      font-family: $font-family-primary;
      font-size: 14px;
      font-weight: $font-weight-bold;
      color: $color-accent;
      text-align: left;

      @media (min-width: $breakpoints-m) {
        font-size: 14px;
      }

      @media (min-width: $breakpoints-xxl) {
        font-size: 20px;
      }
    }

    #add-to-cart {
      z-index: 2;
      visibility: hidden;
      height: 32px;
      font-size: 10px;
      opacity: 0;
      transition:
        opacity 0.3s ease,
        visibility 0.3s ease;

      &.is-visible {
        visibility: visible;
        opacity: 1;
      }

      @media (min-width: $breakpoints-xxl) {
        height: 64px;
        font-size: 14px;
      }
    }

    .image-wrapper {
      position: relative;

      .product-badge {
        position: absolute;
        top: 8px;
        left: 8px;
        z-index: 1;
        padding: 4px 8px;
        font-family: $font-family-mono;
        font-size: 12px;
        font-weight: $font-weight-bold;
        text-transform: uppercase;
        border-radius: 4px;

        @media (min-width: $breakpoints-xxl) {
          top: 12px;
          left: 12px;
          padding: 6px 12px;
          font-size: 14px;
        }
      }

      .badge-sold-out {
        color: $color-white;
        background-color: $color-text-gray;
      }

      .badge-on-sale {
        color: $color-white;
        background-color: #e74c3c;
      }

      .product-img {
        width: 136px;
        height: 136px;
        object-fit: contain;
        border-radius: 4px;

        @media (min-width: $breakpoints-m) {
          width: 100%;
          height: auto;
          aspect-ratio: 1;
        }

        @media (min-width: $breakpoints-xxl) {
          width: 300px;
          height: 300px;
          border-radius: 8px;
        }
      }
    }
  }
</style>
