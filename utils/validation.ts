export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validateUsername = (username: string): string | null => {
  if (!username.trim()) return 'Enter username'
  if (username.trim().length < 3) return 'Username must be at least 3 characters'
  return null
}

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Enter password'
  if (password.length < 6) return 'Password must be at least 6 characters'
  return null
}
