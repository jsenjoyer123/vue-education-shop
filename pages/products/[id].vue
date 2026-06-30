<script setup lang="ts">
  import { ref, watchEffect, computed } from 'vue'
  import ProductDetails from '@/components/Product/Details.vue'
  import ProductDetailSwiper from '@/components/Product/DetailSwiper.vue'
  import ProductDetailDescription from '@/components/Product/DetailDescription.vue'

  import BaseAccordeon from '@/components/UI/BaseAccordeon.vue'
  import BaseAsyncWrapper from '@/components/UI/BaseAsyncWrapper.vue'
  import ProductList from '@/components/Product/List.vue'
  import ProductReviews from '@/components/Product/Reviews.vue'

  import { useGetProductById } from '@/composables/api/products/useGetProductById'
  import { useGetAllProducts } from '@/composables/api/products/useGetAllProducts'

  const route = useRoute()
  const productId = route.params.id as string
  const { data: product, pending, error } = await useGetProductById(productId)

  const productCategory = computed(() => product.value?.category || '')

  const { data: similarProducts, pending: similarPending } = useGetAllProducts({
    category: productCategory,
  })

  const filteredSimilarProducts = computed(() => {
    return similarProducts.value?.filter((p) => String(p.id) !== productId) || []
  })

  const images = ref<string[]>([])

  const productTabs = ref([
    { id: 'description', title: 'Description' },
    { id: 'additional', title: 'Additional Information' },
    { id: 'reviews', title: 'Reviews', count: 0 },
  ])

  const additionalInfo = ref([
    { label: 'Weight', value: '1.2kg' },
    { label: 'Dimensions', value: '10 x 20 x 5 cm' },
    { label: 'Material', value: 'Cotton, Polyester' },
  ])

  const onReviewsCountUpdate = (count: number) => {
    const reviewsTab = productTabs.value.find((t) => t.id === 'reviews')
    if (reviewsTab) {
      reviewsTab.count = count
    }
  }

  watchEffect(() => {
    if (product.value) {
      const img = product.value.image
      images.value = [img, img, img, img]
    }
  })
</script>

<template>
  <div class="product-page container">
    <BaseAsyncWrapper :pending="pending" :error="error" :is-empty="!product">
      <div class="mobile-layout">
        <ProductDetailSwiper :images="images" />
        <ProductDetailDescription :product="product!" />
        <BaseAccordeon :tabs="productTabs">
          <template #description>
            <p>{{ product!.description }}</p>
          </template>
          <template #additional>
            <p v-for="info in additionalInfo" :key="info.label">
              {{ info.label }}: {{ info.value }}
            </p>
          </template>
          <template #reviews>
            <ProductReviews :product-id="productId" @update-count="onReviewsCountUpdate" />
          </template>
        </BaseAccordeon>

        <div v-if="filteredSimilarProducts.length || similarPending" class="similar-items">
          <h2>Similar Items</h2>
          <ProductList
            :products="filteredSimilarProducts"
            :pending="similarPending"
            carousel-on-mobile
          />
        </div>
      </div>

      <div class="desktop-layout">
        <ProductDetails :product="product!" />
        <BaseAccordeon :tabs="productTabs">
          <template #description>
            <p>{{ product!.description }}</p>
          </template>
          <template #additional>
            <p v-for="info in additionalInfo" :key="info.label">
              {{ info.label }}: {{ info.value }}
            </p>
          </template>
          <template #reviews>
            <ProductReviews :product-id="productId" @update-count="onReviewsCountUpdate" />
          </template>
        </BaseAccordeon>
      </div>
    </BaseAsyncWrapper>
  </div>
</template>

<style scoped lang="scss">
  .product-page {
    min-height: 50vh;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .mobile-layout {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #fff;
  }

  .similar-items {
    margin-top: 20px;

    h2 {
      margin-bottom: 24px;
      font-size: 24px;
      font-weight: 700;
      color: #333;
    }
  }

  .desktop-layout {
    display: none;
  }

  @media (width >=1216px) {
    .mobile-layout {
      display: none;
    }

    .desktop-layout {
      display: block;
    }
  }
</style>
