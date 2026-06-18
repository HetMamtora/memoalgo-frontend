import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { useAuth } from '@/hooks/useAuth'
import { extractErrorMessage } from '@/services/api'
import { validateEmail, validatePassword } from '@/utils/validation'

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setFormError(null)

    const errors = {
      email: validateEmail(email),
      password: validatePassword(password),
    }
    setFieldErrors(errors)
    if (errors.email || errors.password) return

    setIsSubmitting(true)
    try {
      await login({ email, password })
      navigate('/app', { replace: true })
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setFormError('Incorrect email or password.')
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
        <h1 className="text-card-title text-text">Sign in</h1>

        <Input
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
        />

        {formError && (
          <p role="alert" className="text-caption text-danger-text">
            {formError}
          </p>
        )}

        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Sign in
        </Button>

        <p className="text-center text-body-secondary text-text-secondary">
          New here?{' '}
          <Link to="/register" className="text-accent-link hover:underline">
            Create account
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
