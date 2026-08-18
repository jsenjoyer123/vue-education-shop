import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductGallery from '@/components/Product/Gallery.vue'

const mockImages = [
  'https://example.com/photo1.jpg',
  'https://example.com/photo2.jpg',
  'https://example.com/photo3.jpg',
]

describe('ProductGallery', () => {
  it('renders all thumbnail images', () => {
    const wrapper = mount(ProductGallery, {
      props: { images: mockImages },
    })

    const thumbnails = wrapper.findAll('.mini-image img')

    expect(thumbnails).toHaveLength(mockImages.length)

    thumbnails.forEach((thumb, index) => {
      expect(thumb.attributes('src')).toBe(mockImages[index])
    })
  })

  it('display fitsr images as activity bu default', () => {
    const wrapper = mount(ProductGallery, {
      props: { images: mockImages },
    })

    const activeImage = wrapper.find('.image img')

    expect(activeImage.attributes('src')).toBe(mockImages[0])
  })

  it('change active images by click', async () => {
    const wrapper = mount(ProductGallery, {
      props: { images: mockImages },
    })

    const allImage = wrapper.findAll('.mini-image img')

    await allImage[2].trigger('click')

    const activeImage = wrapper.find('.image img')

    expect(activeImage.attributes('src')).toBe(mockImages[2])
  })
})
