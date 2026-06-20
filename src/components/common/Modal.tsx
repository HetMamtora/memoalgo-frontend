import { useEffect, type ReactNode } from "react"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    useEffect(() => {
        if(!isOpen) return
        function handleKeyDown(e: KeyboardEvent) {
            if(e.key == 'Escape') onClose()
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose])

    if(!isOpen) return

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true">
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    className="relative z-10 flex h-full w-full flex-col overflow-y-auto bg-surface p-6 md:h-auto md:max-h-[90vh] md:max-w-md md:rounded-lg md:border md:border-border md:shadow-lg"
                >
                    <div className="mb-4 flex items-center justify-between">
                        <h2 id="modal-title" className="text-card-title text-text">
                            {title}
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="text-text-tertiary hover:text-text"
                        >
                            &times;
                        </button>
                    </div>
                    {children}
                </div>

            </div>
        </div>
    )
}