import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ref } from 'vue'
import ProductPage from '@/pages/products/[id].vue'

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 49.99,
  description: 'A detailed test product description for testing purposes.',
  category: 'electronics',
  image: 'https://example.com/product.jpg',
  rating: { rate: 4, count: 120 },
}

const mockSimilarProducts = [
  {
    id: 2,
    title: 'Similar Product One',
    price: 29.99,
    description: 'Similar item 1',
    category: 'electronics',
    image: 'https://example.com/similar1.jpg',
    rating: { rate: 3, count: 50 },
  },
  {
    id: 3,
    title: 'Similar Product Two',
    price: 39.99,
    description: 'Similar item 2',
    category: 'electronics',
    image: 'https://example.com/similar2.jpg',
    rating: { rate: 5, count: 80 },
  },
]

vi.mock('@/composables/api/products/useGetProductById', () => ({
  useGetProductById: () => ({
    data: ref(mockProduct),
    pending: ref(false),
    error: ref(null),
  }),
}))

vi.mock('@/composables/api/products/useGetAllProducts', () => ({
  useGetAllProducts: () => ({
    data: ref(mockSimilarProducts),
    pending: ref(false),
  }),
}))

vi.mock('@/stores/cart', () => ({
  useCartStore: () => ({ addItem: vi.fn() }),
}))

vi.mock('@/composables/useToast', () => ({
  useToast: () => ({ show: vi.fn() }),
}))

vi.mock('@/components/Product/Details.vue', () => ({
  default: {
    name: 'ProductDetails',
    props: ['product'],
    template: '<div class="details-stub">{{ product.title }}</div>',
  },
}))

vi.mock('@/components/Product/DetailSwiper.vue', () => ({
  default: {
    name: 'ProductDetailSwiper',
    props: ['images'],
    template: '<div class="swiper-stub">{{ images.length }} images</div>',
  },
}))

vi.mock('@/components/Product/DetailDescription.vue', () => ({
  default: {
    name: 'ProductDetailDescription',
    props: ['product'],
    template: '<div class="description-stub">{{ product.title }}</div>',
  },
}))

vi.mock('@/components/Product/Reviews.vue', () => ({
  default: {
    name: 'ProductReviews',
    props: ['productId', 'productName'],
    emits: ['update-count'],
    template: '<div class="reviews-stub">Reviews for {{ productName }}</div>',
  },
}))

vi.mock('@/components/Product/List.vue', () => ({
  default: {
    name: 'ProductList',
    props: ['products', 'pending', 'carouselOnMobile'],
    template: `
      <div class="product-list-stub">
        <div v-for="p in products" :key="p.id" class="product-card-stub">
          <img :src="p.image" :alt="p.title" />
          <span class="card-title">{{ p.title }}</span>
          <span class="card-price">{{ p.price }}</span>
        </div>
      </div>
    `,
  },
}))

async function createPage() {
  return mountSuspended(ProductPage)
}

describe('Product Page [id].vue', () => {
  it('renders product details section', async () => {
    const wrapper = await createPage()

    expect(wrapper.find('.details-stub').exists()).toBe(true)
    expect(wrapper.find('.details-stub').text()).toContain(mockProduct.title)
  })

  it('renders all three tabs', async () => {
    const wrapper = await createPage()

    const tabs = wrapper.findAll('.base-tabs__tab')

    expect(tabs.length).toBe(3)
    expect(tabs[0].text()).toContain('Description')
    expect(tabs[1].text()).toContain('Additional Information')
    expect(tabs[2].text()).toContain('Reviews')
  })

  it('shows description by default and switches tab content on click', async () => {
    const wrapper = await createPage()

    const tabsContent = wrapper.findAll('.base-tabs__content > div')

    expect(tabsContent[0].attributes('style')).toBeUndefined()
    expect(tabsContent[0].text()).toContain(mockProduct.description)
    expect(tabsContent[1].attributes('style')).toContain('display: none')

    const tabButtons = wrapper.findAll('.base-tabs__tab')
    await tabButtons[1].trigger('click')

    expect(tabsContent[1].attributes('style')).toBeUndefined()
    expect(tabsContent[1].text()).toContain('Weight')
    expect(tabsContent[1].text()).toContain('Dimensions')
    expect(tabsContent[1].text()).toContain('Material')

    expect(tabsContent[0].attributes('style')).toContain('display: none')
  })

  it('renders Similar Items section with product cards', async () => {
    const wrapper = await createPage()

    expect(wrapper.find('.similar-items h2').text()).toBe('Similar Items')

    const cards = wrapper.findAll('.product-card-stub')
    expect(cards).toHaveLength(mockSimilarProducts.length)

    mockSimilarProducts.forEach((product, index) => {
      const card = cards[index]
      expect(card.find('img').attributes('src')).toBe(product.image)
      expect(card.find('.card-title').text()).toBe(product.title)
      expect(card.find('.card-price').text()).toBe(String(product.price))
    })
  })

  it('renders mobile layout components', async () => {
    const wrapper = await createPage()

    expect(wrapper.find('.swiper-stub').exists()).toBe(true)
    expect(wrapper.find('.description-stub').exists()).toBe(true)
  })
})
