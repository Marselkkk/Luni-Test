import React from 'react'
import { Button } from './Button'

export interface InviteSuccessModalProps {
    isOpen: boolean
    onClose: () => void
    invitedUserName: string
    invitesCount: number
    onSkip: () => void
    onInviteMore: () => void
}

const InviteSuccessModal: React.FC<InviteSuccessModalProps> = ({
    isOpen,
    onClose,
    invitedUserName,
    invitesCount,
    onSkip,
    onInviteMore
}) => {
    if (!isOpen) return null

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#373b4740] bg-opacity-50 animate-in fade-in duration-300"
            onClick={handleBackdropClick}
        >
            <div className="w-full mx-8 bg-white rounded-2xl px-16 pt-16 pb-[38px] flex flex-col gap-8">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="relative">
                        <div className="w-[120px] h-[120px] aspect-square border-4 p-1 rounded-[28px] flex items-center justify-center">
                            <img src="/images/stub.png"
                            className='object-cover w-full h-full rounded-[28px]' />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-black rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-[18px] font-semibold leading-[22px] text-[#484E5E] max-w-[186px] text-center">
                        {invitedUserName} добавлен(а) в чаты, позвать еще друзей?
                    </p>
                </div>
                
                <div className="flex flex-col items-center gap-4">
                    <Button
                        onClick={onSkip}
                        variant="outline"
                        className="flex-1 max-w-[200px] w-full"
                    >
                        Пропустить
                    </Button>
                    <Button
                        onClick={onInviteMore}
                        variant="primary"
                        className="flex-1 max-w-[200px] w-full"
                    >
                        Позвать еще друзей <span className='text-[14px]'>(у тебя {invitesCount} приглашений)</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

InviteSuccessModal.displayName = 'InviteSuccessModal'

export { InviteSuccessModal }
