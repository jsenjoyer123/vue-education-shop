export interface ToastAction {
  label: string
  handler: () => void
}

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: number
  message: string
  type: ToastType
  action?: ToastAction
}

export interface ToastOptions {
  type?: ToastType
  duration?: number
  action?: ToastAction
}

let id = 0

export const useToast = () => {
  const toasts = useState<Toast[]>('toasts', () => [])

  const show = (message: string, options: ToastOptions | ToastType = 'success') => {
    const opts: ToastOptions = typeof options === 'string' ? { type: options } : options
    const { type = 'success', duration = 3000, action } = opts

    const toast: Toast = { id: ++id, message, type, action }
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
