import React from 'react'
import { Button } from './Button'

export interface InviteReceivedModalProps {
    isOpen: boolean
    onClose: () => void
    inviterName: string
    inviteWord: string
    onDecline: () => void
    onAccept: () => void
}

const InviteReceivedModal: React.FC<InviteReceivedModalProps> = ({
    isOpen,
    onClose,
    inviterName,
    inviteWord,
    onDecline,
    onAccept
}) => {
    if (!isOpen) return null

    const reverseTransliterate = (str: string) => {
        const map: { [key: string]: string } = {
            'a': 'а', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д', 'e': 'е', 'yo': 'ё', 'zh': 'ж',
            'z': 'з', 'i': 'и', 'y': 'й', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н', 'o': 'о',
            'p': 'п', 'r': 'р', 's': 'с', 't': 'т', 'u': 'у', 'f': 'ф', 'h': 'х', 'ts': 'ц',
            'ch': 'ч', 'sh': 'ш', 'sch': 'щ', 'yu': 'ю', 'ya': 'я'
        }
        
        let result = str.toLowerCase()
        
        for (const [lat, cyr] of Object.entries(map)) {
            if (lat.length > 1) {
                result = result.replace(new RegExp(lat, 'g'), cyr)
            }
        }
        
        for (const [lat, cyr] of Object.entries(map)) {
            if (lat.length === 1) {
                result = result.replace(new RegExp(lat, 'g'), cyr)
            }
        }
        
        return result
    }

    const originalWord = reverseTransliterate(inviteWord)

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
            <div className="w-full mx-8 bg-white rounded-2xl px-5 pt-12 pb-[38px] flex flex-col gap-6">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-[120px] h-[120px] aspect-square border-4 p-1 rounded-[28px] flex items-center justify-center">
                        <img src="/images/stub.png"
                        className='object-cover w-full h-full rounded-[28px]' />
                    </div>
                    <p className="text-[18px] font-semibold leading-[22px] text-[#484E5E] max-w-[153px] text-center">
                        {inviterName} приглашает в чат и назвал(а) тебя:
                    </p>
                </div>
                
                <div className="text-center mb-4">
                    <div className="bg-[#E8F9FAB2] border border-[#B6EDF1] px-9 py-8 rounded-[20px] relative overflow-hidden">
                        <div 
                            className="absolute inset-0 bg-[#E8F9FAB2] opacity-10"
                            style={{
                                backgroundImage: `url('/images/pattern.png')`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'repeat',
                                backgroundPosition: 'center'
                            }}
                        ></div>
                        <div className="relative text-[28px] leading-[22px] font-extrabold text-[#12B2BE] tracking-[0.1em] uppercase">
                            {originalWord}
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col items-center gap-4">
                    <Button
                        onClick={onDecline}
                        variant="outline"
                        className="flex-1 max-w-[200px] w-full"
                    >
                        Отклонить
                    </Button>
                    <Button
                        onClick={onAccept}
                        variant="primary"
                        className="flex-1 max-w-[200px] w-full"
                    >
                        Перейти в чат
                    </Button>
                </div>
            </div>
        </div>
    )
}

InviteReceivedModal.displayName = 'InviteReceivedModal'

export { InviteReceivedModal }
