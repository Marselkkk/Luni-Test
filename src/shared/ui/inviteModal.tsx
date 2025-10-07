import React, { useState } from 'react'
import { Button } from './Button'

export interface InviteModalProps {
    isOpen: boolean
    onClose: () => void
    invitesCount: number
}

const InviteModal: React.FC<InviteModalProps> = ({ 
    isOpen, 
    onClose, 
    invitesCount
}) => {
    const [inviteWord, setInviteWord] = useState('')

    if (!isOpen) return null

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const handleSkip = () => {
        onClose()
    }

    const handleSelectContact = () => {
        if (inviteWord.trim()) {
            // Получаем имя текущего пользователя из Telegram
            let senderName = 'Пользователь'
            if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
                const user = window.Telegram.WebApp.initDataUnsafe?.user
                if (user) {
                    senderName = user.first_name && user.last_name 
                        ? `${user.first_name} ${user.last_name}`
                        : user.first_name || `@${user.username}` || 'Пользователь'
                }
            }
            
            const inviteUrl = `https://t.me/luni_test_bot?startapp=invite&word=${encodeURIComponent(inviteWord.trim())}&from=${encodeURIComponent(senderName)}`
            const message = `Заходи ко мне в Луни. Новая тема для поиска друзей с помощью ИИ. Ты для меня - 🫢🫣🤫... Зайди и посмотри кто именно: ${inviteUrl}`
            
            console.log('Generated invite URL:', inviteUrl)
            console.log('Generated message:', message)
            console.log('Sender name:', senderName)
            console.log('Invite word:', inviteWord.trim())
            
            if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
                window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(message)}`)
            } else {
                navigator.clipboard.writeText(message)
            }
        }
        onClose()
    }

    return (
        <div 
            className="fixed inset-0 z-50 flex items-end justify-center bg-[#373b4740] bg-opacity-50 animate-in fade-in duration-300"
            onClick={handleBackdropClick}
        >
            <div className="w-full bg-white rounded-t-2xl p-6 transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4">
                <h2 className="text-[18px] font-bold leading-[22px] text-[#373B47] mb-4 text-center">
                    У тебя {invitesCount} приглашений
                </h2>
                
                <div className="mb-6 space-y-2">
                    <p className="text-[18px] leading-[22px] font-semibold text-center">
                        Чтобы позвать пользователя к себе в Луни — назови его одним словом.
                    </p>
                    <p className="text-[18px] leading-[22px] font-semibold text-center">
                        Он увидит это слово при входе 👻
                    </p>
                </div>
                
                <div className="mb-6">
                    <input
                        type="text"
                        value={inviteWord}
                        onChange={(e) => setInviteWord(e.target.value)}
                        placeholder="то самое слово"
                        className={`w-full px-8 py-3 rounded-lg text-[#282A33] placeholder-[#9CA4BB] transition-all text-center ${
                            inviteWord ? 'bg-white' : 'bg-[#F3F4F7]'
                        } focus:border-2 focus:border-black focus:outline-none`}
                        autoFocus
                    />
                </div>
                
                <div className="flex gap-3">
                    <Button
                        onClick={handleSkip}
                        variant="outline"
                        className="flex-1"
                    >
                        Пропустить
                    </Button>
                    <Button
                        onClick={handleSelectContact}
                        variant="primary"
                        disabled={!inviteWord.trim()}
                        className="flex-1"
                    >
                        Выбрать контакт
                    </Button>
                </div>
            </div>
        </div>
    )
}

InviteModal.displayName = 'InviteModal'

export { InviteModal }
