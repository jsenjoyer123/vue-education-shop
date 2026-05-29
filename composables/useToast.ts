export interface Toast {
  id: number
  message: string
  type: string
}

let id = 0

export const useToast = () => {
  const toasts = useState<Toast[]>('toasts', () => [])

  const show = (message: string, type = 'success', duration = 3000) => {
    const toast = { id: ++id, message, type }
    toasts.value.push(toast)
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== toast.id)
    }, duration)
  }

  const removeToast = (toastId: number) => {
    toasts.value = toasts.value.filter((t) => t.id !== toastId)
  }

  return { toasts, show, removeToast }
}
