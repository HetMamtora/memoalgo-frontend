import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { useAuth } from '@/hooks/useAuth'
import { extractErrorMessage } from '@/services/api'
import { validateEmail, validatePassword, validateUsername } from '@/utils/validation'

export function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string
    username?: string
    password?: string
  }>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setFormError(null)

    const errors = {
      email: validateEmail(email),
      username: validateUsername(username),
      password: validatePassword(password),
    }
    setFieldErrors(errors)
    if (errors.email || errors.username || errors.password) return

    setIsSubmitting(true)
    try {
      await register({ email, username, password })
      navigate('/app', { replace: true })
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setFormError('That email or username is already taken.')
      } else {
        setFormError(extractErrorMessage(err))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <h1 className="text-card-title text-text">Create account</h1>

        <Input
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
        />
        <Input
          label="Username"
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={fieldErrors.username}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
          hint="Min 8 characters"
        />

        {formError && (
          <p role="alert" className="text-caption text-danger-text">
            {formError}
          </p>
        )}

        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Create account
        </Button>

        <p className="text-center text-body-secondary text-text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="text-accent-link hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
