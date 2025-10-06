import React from 'react'
import { Button } from './Button'

export interface InviteDeclinedModalProps {
    isOpen: boolean
    onClose: () => void
    invitesCount: number
    onOk: () => void
    onInviteMore: () => void
}

const InviteDeclinedModal: React.FC<InviteDeclinedModalProps> = ({
    isOpen,
    onClose,
    invitesCount,
    onOk,
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
            <div className="w-full mx-8 bg-white rounded-2xl px-9 pt-12 pb-[38px] flex flex-col gap-8">
                <h2 className="text-[18px] leading-[22px] font-bold text-[#484E5E] text-center">
                    Приглашение отклонено
                </h2>

                <div className="flex flex-col items-center gap-4">
                    <Button
                        onClick={onOk}
                        variant="outline"
                        className="flex-1 max-w-[200px] w-full"
                    >
                        OK
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

InviteDeclinedModal.displayName = 'InviteDeclinedModal'

export { InviteDeclinedModal }
