import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Reviews from '@/components/Product/Reviews.vue'

const mockShow = vi.fn()

vi.mock('@/composables/useToast', () => ({
  useToast: () => ({
    show: mockShow,
  }),
}))
vi.mock('@/utils/formatDate', () => ({
  formatDate: () => '10 August, 2026',
}))

vi.mock('@/components/Product/ReviewsList.vue', () => ({
  default: {
    name: 'ProductReviewsList',
    props: ['reviews', 'productName'],
    template: '<div class="reviews-list-stub">{{ reviews.length }} reviews</div>',
  },
}))

vi.mock('@/components/Product/ReviewForm.vue', () => ({
  default: {
    name: 'ProductReviewForm',
    emits: ['submit'],
    template:
      "<div class=\"review-form-stub\"><button @click=\"$emit('submit', { name: 'Test', email: 'test@test.com', text: 'Great!', rating: 5 })\">Submit</button></div>",
  },
}))

const mockReviews = [
  { name: 'George', email: 'george@test.com', text: 'Nice!', rating: 4, date: '22 January, 2022' },
  {
    name: 'Alice',
    email: 'alice@test.com',
    text: 'Great product!',
    rating: 5,
    date: '15 March, 2023',
  },
]

describe('Product Reviews', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('renders both child components', () => {
    const wrapper = mount(Reviews, {
      props: {
        productId: '123',
        productName: 'Test Product',
      },
    })

    expect(wrapper.find('.reviews-list-stub').exists()).toBe(true)
    expect(wrapper.find('.review-form-stub').exists()).toBe(true)
  })

  it('loads reviews from localStorage on mount', async () => {
    localStorage.setItem('reviews_123', JSON.stringify(mockReviews))

    const wrapper = mount(Reviews, {
      props: {
        productId: '123',
        productName: 'Test Product',
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.reviews-list-stub').text()).toContain('2 reviews')
  })

  it('email update-count on mount', () => {
    localStorage.setItem('reviews_42', JSON.stringify(mockReviews))

    const wrapper = mount(Reviews, {
      props: {
        productId: '42',
        productName: 'Test Product',
      },
    })

    expect(wrapper.emitted('update-count')).toBeTruthy()
    expect(wrapper.emitted('update-count')![0]).toEqual([2])
  })

  it('handles form sumbit coreectly', async () => {
    const wrapper = mount(Reviews, {
      props: {
        productId: '99',
      },
    })

    await wrapper.find('.review-form-stub button').trigger('click')

    const saved = JSON.parse(localStorage.getItem('reviews_99') || '[]')
    expect(saved).toHaveLength(1)
    expect(saved[0].name).toBe('Test')
    expect(saved[0].text).toBe('Great!')
    expect(saved[0].date).toBe('10 August, 2026')

    expect(mockShow).toHaveBeenCalledWith('Review submitted successfully!')
  })

  it('handles corrupted localStorage data', () => {
    localStorage.setItem('reviews_123', 'not valid hson{{{')

    const wrapper = mount(Reviews, {
      props: {
        productId: '123',
      },
    })

    expect(wrapper.find('.reviews-list-stub').text()).toContain('0 reviews')
    expect(wrapper.emitted('update-count')![0]).toEqual([0])
  })
})
