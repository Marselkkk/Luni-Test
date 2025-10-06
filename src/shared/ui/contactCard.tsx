import React from 'react'

export interface ContactCardProps {
  name?: string
  avatar?: string
  isOnline?: boolean
  notifications?: boolean
}

const ContactCard: React.FC<ContactCardProps> = ({ 
  name = 'Пользователь', 
  avatar = '/images/stub.png', 
  isOnline = false, 
  notifications = false
}) => {
  
  return (
    <div className="flex flex-col gap-1 items-center">
      <div className='relative h-20 aspect-square rounded-[22px] border-4 p-1'>
        <img className='w-full h-full object-cover rounded-2xl' src={avatar} />
        {notifications && (
          <div className='absolute -top-1 -right-1 w-6 h-6 bg-black rounded-full flex items-center justify-center'>
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.87512 10.3333V11C7.87512 12.1046 7.03564 13 6.00009 13C4.96454 13 4.12505 12.1046 4.12505 11V10.3333M7.87512 10.3333H4.12505M7.87512 10.3333H10.1192C10.3583 10.3333 10.4784 10.3333 10.5752 10.2985C10.7601 10.232 10.9048 10.0771 10.9672 9.87986C11 9.77618 11 9.64766 11 9.39063C11 9.27815 10.9999 9.22192 10.9916 9.16829C10.976 9.06696 10.9392 8.97089 10.883 8.88748C10.8534 8.84341 10.8156 8.80318 10.7413 8.72389L10.4978 8.46419C10.4193 8.38041 10.3752 8.26676 10.3752 8.14827V5.66667C10.3752 3.08933 8.41638 0.999994 6.00009 1C3.5838 1.00001 1.62501 3.08934 1.62501 5.66667V8.14829C1.62501 8.26678 1.58079 8.38041 1.50224 8.46419L1.25879 8.72386C1.18423 8.8034 1.1469 8.84336 1.11719 8.8875C1.06104 8.97092 1.02384 9.06696 1.00825 9.16829C1 9.22192 1 9.27816 1 9.39064C1 9.64767 1 9.77616 1.03278 9.87983C1.09516 10.0771 1.2405 10.232 1.42542 10.2985C1.52223 10.3333 1.6419 10.3333 1.88099 10.3333H4.12505" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
      <span className={`text-[14px] leading-[16px] font-semibold text-center 
        ${isOnline ? 'text-[#373B47]' : 'text-[#ACB3C6]'}`}>{name}</span>
    </div>
  )
}

ContactCard.displayName = 'ContactCard'

export { ContactCard }
