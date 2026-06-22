import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { OtpStep } from '@/components/auth/OtpStep'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { useAuth } from '@/hooks/useAuth'
import * as authService from '@/services/auth'
import { extractErrorMessage } from '@/services/api'
import {
    validateEmail,
    validatePassword,
    validateConfirmPassword,
} from '@/utils/validation'

type Phase = 'form' | 'otp'

export function ForgotPassword() {
    const { authenticateWithResponse } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({})
    const [formError, setFormError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [phase, setPhase] = useState<Phase>('form')
    const [otpError, setOtpError] = useState<string | null>(null)
    const [expiresInMinutes, setExpiresInMinutes] = useState(10)

    const confirmValid =
        newPassword.length >= 8 &&
        confirmPassword.length > 0 &&
        newPassword === confirmPassword

    async function handleSendOtp(e: FormEvent) {
        e.preventDefault()
        setFormError(null)

        const errors: Record<string, string | undefined> = {
            email: validateEmail(email),
            newPassword: validatePassword(newPassword),
            confirmPassword: validateConfirmPassword(newPassword, confirmPassword),
        }
        setFieldErrors(errors)
        if (Object.values(errors).some(Boolean)) return

        setIsSubmitting(true)
        try {
            const res = await authService.initiatePasswordReset({
                email,
                newPassword,
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
            const auth = await authService.verifyPasswordReset({ email, otp })
            await authenticateWithResponse(auth)
            navigate('/app', { replace: true })
        } catch (err) {
            setOtpError(extractErrorMessage(err))
        }
    }

    async function handleResend() {
        setOtpError(null)
        try {
            const res = await authService.initiatePasswordReset({
                email,
                newPassword,
            })
            setExpiresInMinutes(res.expiresInMinutes)
        } catch (err) {
            setOtpError(extractErrorMessage(err))
        }
    }

  return (
    <AuthLayout>
        {phase === 'form' && (
            <form onSubmit={handleSendOtp} className="flex flex-col gap-4" noValidate>
                <h1 className="text-card-title text-text">Reset password</h1>

                <Input
                    label="Email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={fieldErrors.email}
                />
                <Input
                    label="New password"
                    type="password"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    error={fieldErrors.newPassword}
                    hint="Min 8 characters"
                />
                <Input
                    label="Confirm new password"
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
                    Remember your password?{' '}
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