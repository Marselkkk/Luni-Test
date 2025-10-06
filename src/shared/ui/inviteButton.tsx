import React, { useState } from 'react'
import { InviteModal } from './inviteModal'

export interface InviteButtonProps {
    invites?: number
}

const InviteButton: React.FC<InviteButtonProps> = ({ 
    invites = 0
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleClick = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }
  
    return (
        <>
            <div 
                className='flex flex-col gap-1 items-center cursor-pointer'
                onClick={handleClick}
            >
                <div className='h-20 aspect-square flex items-center justify-center bg-[#77809B] rounded-[22px] hover:bg-[#6A7388] transition-colors'>
                    <div className='flex items-center justify-center py-0.5 px-[11px] bg-[#EDEEF2] text-[#77809B] text-[14px] font-bold leading-4 rounded-sm'>
                        +{invites}
                    </div>
                </div>
                <span className='text-[14px] leading-[16px] font-semibold text-center text-[#373B47]'>
                    Добавить друзей
                </span>
            </div>
            
            <InviteModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                invitesCount={invites}
            />
        </>
    )
}

InviteButton.displayName = 'InviteButton'

export { InviteButton }