import { vi } from 'vitest'

export const mockAddItem = vi.fn()
export const mockShowToast = vi.fn()

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
