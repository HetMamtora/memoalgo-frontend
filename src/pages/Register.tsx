import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { Input } from '@/components/common/Input'
import { OtpStep } from '@/components/auth/OtpStep'
import { Button } from '@/components/common/Button'
import { useAuth } from '@/hooks/useAuth'
import { extractErrorMessage } from '@/services/api'
import * as authService from '@/services/auth'
import { validateEmail, validatePassword, validateUsername, validateConfirmPassword } from '@/utils/validation'

type Phase = 'form' | 'otp'

export function Register() {
  const { authenticateWithResponse } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [phase, setPhase] = useState<Phase>('form')
  const [otpError, setOtpError] = useState<string | null>(null)
  const [expiresInMinutes, setExpiresInMinutes] = useState(10)

  const confirmValid =
      password.length >= 8 &&
      confirmPassword.length > 0 &&
      password === confirmPassword
      
  async function handleSentOtp(e: FormEvent) {
      e.preventDefault()
      setFormError(null)

      const errors: Record<string, string | undefined> = {
          email: validateEmail(email),
          username: validateUsername(username),
          password: validatePassword(password),
          confirmPassword: validateConfirmPassword(password, confirmPassword),
      }

      setFieldErrors(errors)
      if(Object.values(errors).some(Boolean)) return

      setIsSubmitting(true)

      try{
          const res = await authService.initiateRegistration({
            email,
            username,
            password,
          })
          setExpiresInMinutes(res.expiresInMinutes)
          setPhase('otp')
      } catch (err) {
        setFormError(extractErrorMessage(err))
      } finally {
        setIsSubmitting(false)
      }
  }

  async function handleVerify(otp: string) {
      setOtpError(null)
      try {
          const auth = await authService.verifyRegistration({ email, otp })
          await authenticateWithResponse(auth)
          navigate('/app', { replace: true })
      } catch (err) {
          setOtpError(extractErrorMessage(err))
      }
  }

  async function handleResend() {
      setOtpError(null)
      try {
          const res = await authService.initiateRegistration({
              email,
              username,
              password,
          })
          setExpiresInMinutes(res.expiresInMinutes)
      } catch (err) {
          setOtpError(extractErrorMessage(err))
      }
  }

  return (
    <AuthLayout>
        {phase === 'form' && (
            <form onSubmit={handleSentOtp} className="flex flex-col gap-4" noValidate>
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
                <Input
                    label="Confirm password"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={fieldErrors.confirmPassword}
                />
 
                {formError && (
                    <p role="alert" className="text-caption text-danger-text">
                        {formError}
                    </p>
                )}
 
                {confirmValid && (
                    <Button type="submit" isLoading={isSubmitting} className="w-full">
                        Send verification code
                    </Button>
                )}
 
                <p className="text-center text-body-secondary text-text-secondary">
                    Already have an account?{' '}
                    <Link to="/login" className="text-accent-link hover:underline">
                        Sign in
                    </Link>
                </p>
            </form>
        )}
 
        {phase === 'otp' && (
            <>
              <h1 className="mb-2 text-card-title text-text">Verify your email</h1>
                  <OtpStep
                      email={email}
                      expiresInMinutes={expiresInMinutes}
                      onVerify={handleVerify}
                      onResend={handleResend}
                      error={otpError}
                  />
              </>
        )}
    </AuthLayout>
  )
}
