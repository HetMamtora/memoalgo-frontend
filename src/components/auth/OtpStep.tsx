import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Button } from '@/components/common/Button'

interface OtpStepProps {
    email: string
    expiresInMinutes: number
    onVerify: (otp: string) => Promise<void>
    onResend: () => Promise<void>
    error: string | null
}

export function OtpStep({ email, expiresInMinutes, onVerify, onResend, error }: OtpStepProps) {
    const [otp, setOtp] = useState('')
    const [isVerifying, setIsVerifying] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [resendCooldown, setResendCooldown] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    useEffect(() => {
        if (resendCooldown <= 0) return
        const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000)
        return () => clearTimeout(timer)
    }, [resendCooldown])

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        if (otp.length !== 6) return
        setIsVerifying(true)
        try {
            await onVerify(otp)
        } finally {
            setIsVerifying(false)
        }
    }

    async function handleResend() {
        setIsResending(true)
        try {
            await onResend()
            setResendCooldown(45)
            setOtp('')
        } finally {
            setIsResending(false)
        }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1">
            <p className="text-body text-text-secondary">
                We sent a 6-digit code to <span className="font-medium text-text">{email}</span>.
                It expires in {expiresInMinutes} minutes.
            </p>
        </div>

        <div className="flex flex-col gap-1">
            <label htmlFor="otp-input" className="text-label text-text-secondary">
                Verification code
            </label>
            <input
                ref={inputRef}
                id="otp-input"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 6)
                    setOtp(val)
                }}
                placeholder="000000"
                className="rounded-md border border-border bg-surface px-3 py-2 text-center text-section tracking-[0.3em] text-text
                            placeholder:text-text-tertiary placeholder:tracking-[0.3em]
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-link"
            />
        </div>

        {error && (
            <p role="alert" className="text-caption text-danger-text">
                {error}
            </p>
        )}

        <Button type="submit" isLoading={isVerifying} disabled={otp.length !== 6}>
            Verify
        </Button>

        <p className="text-center text-body-secondary text-text-tertiary">
            Didn't get the code?{' '}
            <button
                type="button"
                disabled={isResending || resendCooldown > 0}
                onClick={handleResend}
                className="text-accent-link hover:underline disabled:opacity-60 disabled:no-underline"
            >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend'}
            </button>
        </p>
    </form>
  )
}