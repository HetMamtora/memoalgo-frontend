// Mirrors the @NotBlank/@Email/@Size constraints on RegisterRequest /
// LoginRequest in the backend (see handoff doc, Data Models section).
// Keep these in sync if those constraints ever change.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return 'Email is required'
  if (!EMAIL_PATTERN.test(value)) return 'Enter a valid email address'
  return undefined
}

export function validatePassword(value: string): string | undefined {
  if (!value) return 'Password is required'
  if (value.length < 8) return 'Password must be at least 8 characters'
  if (value.length > 100) return 'Password must be at most 100 characters'
  return undefined
}

export function validateUsername(value: string): string | undefined {
  if (!value.trim()) return 'Username is required'
  if (value.length < 3 || value.length > 50) {
    return 'Username must be between 3 and 50 characters'
  }
  return undefined
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): string | undefined {
  if (!confirmPassword) return 'Confirm your password'
  if (password !== confirmPassword) return 'Passwords do not match'
  return undefined
}
