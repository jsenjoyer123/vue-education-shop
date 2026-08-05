import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Reviews from '@/components/Product/Reviews.vue'

describe('Product Reviews', () => {
  it('renders correctly', () => {
    const wrapper = mount(Reviews, {
      props: {
        productId: '123',
      },
    })

    expect(wrapper.exists()).toBe(true)
  })
})
