<script setup lang="ts">
  import { ref } from 'vue'
  import type { Product } from '@/types/api'

  const props = defineProps<{
    product: Product
  }>()

  const quantity = ref(1)

  const increment = () => {
    quantity.value++
  }

  const decrement = () => {
    if (quantity.value > 1) {
      quantity.value--
    }
  }

  const addToCart = () => {
    console.log(`Adding ${quantity.value} of ${props.product.title} to cart`)
  }
</script>

<template>
  <section class="product-info">
    <h1>{{ product.title }}</h1>

    <div class="meta">
      <p class="sku">SKU: {{ product.id }}</p>
      <p class="category">Categories: {{ product.category }}</p>
    </div>

    <div v-if="product.rating" class="rating">
      <span class="stars">
        <span v-for="n in 5" :key="n" :class="{ filled: n <= Math.round(product.rating.rate) }"
          >★</span
        >
      </span>
      <span class="rate-value">{{ product.rating.rate }} ({{ product.rating.count }} reviews)</span>
    </div>
    <div v-else class="rating">
      <span class="stars">
        <span v-for="n in 5" :key="n">☆</span>
      </span>
      <span class="rate-value">Нет оценок</span>
    </div>

    <p class="price">${{ product.price }}</p>
    <p class="description">{{ product.description }}</p>

    <div class="actions">
      <div class="counter">
        <button :disabled="quantity <= 1" @click="decrement">-</button>
        <span class="qty">{{ quantity }}</span>
        <button @click="increment">+</button>
      </div>
      <button class="add-to-cart" @click="addToCart">ADD TO CART</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .product-info {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    background-color: yellow;
  }

  h1 {
    margin: 0;
    font-size: 24px;
  }

  .meta {
    display: flex;
    gap: 15px;
    font-size: 14px;
    color: #666;

    p {
      margin: 0;
    }
  }

  .price {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }

  .description {
    margin: 0;
    line-height: 1.5;
    color: #444;
  }

  .rating {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .stars {
    color: #ccc;

    span {
      font-size: 20px;
    }

    span.filled {
      color: #ffc107;
    }
  }

  .actions {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-top: 20px;
  }

  .counter {
    display: flex;
    align-items: center;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;

    button {
      padding: 10px 15px;
      font-size: 18px;
      cursor: pointer;
      background: none;
      border: none;

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }

    .qty {
      min-width: 20px;
      padding: 0 15px;
      font-weight: bold;
      text-align: center;
    }
  }

  .add-to-cart {
    padding: 12px 30px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    background-color: #000;
    border: none;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #333;
    }
  }
</style>
