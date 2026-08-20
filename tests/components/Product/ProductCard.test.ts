import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from '@/components/Product/Card.vue'

const mockProduct = {
  id: 1,
  title: 'Classic T-Shirt',
  price: 49.99,
  description: 'A nice shirt',
  category: 'clothing',
  image: 'https://example.com/shirt.jpg',
}

function createWrapper(props = {}) {
  return mount(ProductCard, {
    props: { ...mockProduct, ...props },
  })
}

describe('ProductCard', () => {
  it('renders product image, title and price', () => {
    const wrapper = createWrapper()

    const img = wrapper.find('.product-img')
    expect(img.attributes('src')).toBe(mockProduct.image)
    expect(img.attributes('alt')).toBe(mockProduct.title)

    expect(wrapper.find('h2').text()).toBe(mockProduct.title)
    expect(wrapper.find('p').text()).toBe(String(mockProduct.price))
  })

  it('truncates long titles to 20 characters', () => {
    const wrapper = createWrapper({ title: 'A Very Long Product Title Here' })

    expect(wrapper.find('h2').text()).toBe('A Very Long Product ...')
  })

  it('shows badge when product has one', () => {
    const wrapper = createWrapper({ badge: 'on-sale' })

    const badge = wrapper.find('.product-badge')
    expect(badge.exists()).toBe(true)
    expect(badge.text()).toBe('On sale')
  })

  it('does not show badge when product has none', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('.product-badge').exists()).toBe(false)
  })
})
