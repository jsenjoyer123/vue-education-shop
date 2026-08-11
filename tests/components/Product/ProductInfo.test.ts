import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductInfo from '@/components/Product/Info.vue'

const mockAddItem = vi.fn()
const mockShowToast = vi.fn()

vi.mock('@/stores/cart', () => ({
  useCartStore: () => ({
    addItem: mockAddItem,
  }),
}))

vi.mock('@/composables/useToast', () => ({
  useToast: () => ({
    show: mockShowToast,
  }),
}))

const mockProduct = {
  id: 1,
  title: 'Awesome Product',
  price: 99.99,
  description: 'This is a test product description.',
  category: 'Test Category',
  image: 'test-image.jpg',
  rating: {
    rate: 4,
    count: 120,
  },
}

describe('ProductInfo', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('render product infrmation correctly', () => {
    const wrapper = mount(ProductInfo, {
      props: {
        product: mockProduct,
      },
    })

    expect(wrapper.find('h1').text()).toBe(mockProduct.title)
    expect(wrapper.find('.description').text()).toBe(mockProduct.description)
    expect(wrapper.find('.sku').text()).toContain(mockProduct.id.toString())
    expect(wrapper.find('.category').text()).toContain(mockProduct.category)
  })

  it('increments and decrements quantity', async () => {
    const wrapper = mount(ProductInfo, {
      props: {
        product: mockProduct,
      },
    })

    expect(wrapper.find('.qty').text()).toBe('1')

    const buttons = wrapper.findAll('.counter button')
    const decrementBtn = buttons[0]
    const incrementBtn = buttons[1]

    await incrementBtn.trigger('click')
    await incrementBtn.trigger('click')
    expect(wrapper.find('.qty').text()).toBe('3')

    await decrementBtn.trigger('click')
    expect(wrapper.find('.qty').text()).toBe('2')
  })

  it('does not decrement below 1', async () => {
    const wrapper = mount(ProductInfo, {
      props: {
        product: mockProduct,
      },
    })

    const decrementBtn = wrapper.findAll('.counter button')[0]

    await decrementBtn.trigger('click')
    await decrementBtn.trigger('click')

    expect(wrapper.find('.qty').text()).toBe('1')
  })

  it('adds product to cart and show toast', async () => {
    const wrapper = mount(ProductInfo, {
      props: {
        product: mockProduct,
      },
    })

    const incrementBtn = wrapper.findAll('.counter button')[1]
    await incrementBtn.trigger('click')
    await incrementBtn.trigger('click')

    await wrapper.find('.add-to-cart').trigger('click')

    expect(mockAddItem).toHaveBeenCalledWith(mockProduct, 3)

    expect(mockShowToast).toHaveBeenCalledWith(
      'Added 3 x "Awesome Product" to your Shopping bag.',
      'success',
    )
  })

  it('renders filled starts based on raiting', () => {
    const wrapper = mount(ProductInfo, {
      props: {
        product: mockProduct,
      },
    })

    const filledStarts = wrapper.findAll('.stars span.filled')
    expect(filledStarts).toHaveLength(4)

    expect(wrapper.find('.rate-value').text()).toBe('4 (120 reviews)')
  })

  it('renders empty stars when on rating', () => {
    const productWithoutRating = { ...mockProduct, rating: undefined }

    const wrapper = mount(ProductInfo, {
      props: {
        product: productWithoutRating,
      },
    })

    const filledStarts = wrapper.findAll('.stars span.filled')
    expect(filledStarts).toHaveLength(0)

    expect(wrapper.find('.rate-value').text()).toBe('No reviews')
  })
})
