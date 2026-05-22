import { ref, watch, onUnmounted, type Ref } from 'vue'

export function useDebounce<T>(source: Ref<T>, delay = 500): Ref<T> {
  const debouncedValue = ref(source.value) as Ref<T>
  let timeout: ReturnType<typeof setTimeout>

  watch(source, (newValue) => {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)
  })

  onUnmounted(() => {
    clearTimeout(timeout)
  })

  return debouncedValue
}
