import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTabs from '@/components/UI/BaseTabs.vue'

const mockTabs = [
  { id: 'description', title: 'Description' },
  { id: 'reviews', title: 'Reviews', count: 12 },
  { id: 'shipping', title: 'Shipping' },
]

function createWrapper() {
  return mount(BaseTabs, {
    props: { tabs: mockTabs },
    slots: {
      description: '<p>Product description text</p>',
      reviews: '<p>Customer reviews here</p>',
      shipping: '<p>Shipping information</p>',
    },
  })
}

describe('BaseTabs', () => {
  it('renders all tabs with correct titles', () => {
    const wrapper = createWrapper()

    const tabs = wrapper.findAll('.base-tabs__tab')

    expect(tabs).toHaveLength(mockTabs.length)

    mockTabs.forEach((tab, index) => {
      expect(tabs[index].text()).toContain(tab.title)
    })
  })
  it('first tab is active by defualt', () => {
    const wrapper = createWrapper()

    const tabs = wrapper.findAll('.base-tabs__tab')

    expect(tabs[0].classes()).toContain('is-active')
    expect(tabs[1].classes()).not.toContain('is-active')
    expect(tabs[2].classes()).not.toContain('is-active')
  })
  it('switches active tab and content on click', async () => {
    const wrapper = createWrapper()

    const tabs = wrapper.findAll('.base-tabs__tab')
    const contentBlocks = wrapper.findAll('.base-tabs__content > div')

    await tabs[1].trigger('click')

    expect(tabs[1].classes()).toContain('is-active')
    expect(tabs[0].classes()).not.toContain('is-active')

    expect(contentBlocks[0].attributes('style')).toContain('display: none')
    expect(contentBlocks[1].attributes('style')).toBeUndefined()
    expect(contentBlocks[1].text()).toContain('Customer reviews here')
  })
  it('displays count badge when tab has count', () => {
    const wrapper = createWrapper()

    const counts = wrapper.findAll('.base-tabs__count')

    expect(counts).toHaveLength(1)
    expect(counts[0].text()).toBe('12')
  })
})
