import { validateEmail } from '~/utils/validation'

export const useEmailValidation = () => {
  const email = ref('')
  const error = ref('')

  const validate = () => {
    error.value = ''

    if (!email.value) {
      error.value = 'Enter email'
      return
    }

    if (!validateEmail(email.value)) {
      error.value = 'Invalid email format'
      return
    }

    return true
  }

  const clearError = () => {
    error.value = ''
  }

  const handleInput = (value: string) => {
    email.value = value
    clearError()
  }

  return {
    email,
    error,
    validate,
    handleInput,
    clearError,
  }
}
