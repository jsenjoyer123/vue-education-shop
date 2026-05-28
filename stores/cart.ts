import { defineStore } from 'pinia'
import type { Product } from '@/types/api'

export type CartItem = Product & { quantity: number }

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  if (import.meta.client) {
    const saved = localStorage.getItem('cart-storage')
    if (saved) {
      try {
        items.value = JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse cart data from localStorage', e)
      }
    }

    watch(
      items,
      (newItems) => {
        localStorage.setItem('cart-storage', JSON.stringify(newItems))
      },
      { deep: true },
    )

    //необходимо для синхронизации товаров в корзинне между вкладками
    window.addEventListener('storage', (event) => {
      if (event.key === 'cart-storage' && event.newValue) {
        try {
          items.value = JSON.parse(event.newValue)
        } catch (e) {
          console.error('Failed to parse cart data from localStorage sync', e)
        }
      }
    })
  }
  const isOpen = ref(false)

  const toggleCart = () => {
    isOpen.value = !isOpen.value
  }

  const openCart = () => {
    isOpen.value = true
  }

  const closeCart = () => {
    isOpen.value = false
  }

  const totalCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  const isInCart = (productId: number) => items.value.some((item) => item.id === productId)

  const addItem = (product: Product) => {
    const existing = items.value.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  const removeItem = (productId: number) => {
    items.value = items.value.filter((item) => item.id !== productId)
  }

  const decrementItem = (productId: number) => {
    const existing = items.value.find((item) => item.id === productId)
    if (!existing) return
    if (existing.quantity <= 1) {
      removeItem(productId)
    } else {
      existing.quantity--
    }
  }

  const clearCart = () => {
    items.value = []
  }

  return {
    items,
    isOpen,
    totalCount,
    totalPrice,
    isInCart,
    addItem,
    removeItem,
    decrementItem,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
  }
})
