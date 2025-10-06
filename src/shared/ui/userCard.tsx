import React from 'react'

export interface UserCardProps {
  name?: string
  avatar?: string
  // isOnline?: boolean
}

const UserCard: React.FC<UserCardProps> = ({ 
  name = 'Пользователь', 
  avatar = '/images/stub.png', 
  // isOnline = false, 
}) => {
  
  return (
    <div className="rounded-2xl p-2 flex gap-1 items-center bg-white">
      <div className="flex items-center gap-2">
        <div className="p-1 h-9 aspect-square rounded-[10px] flex items-center justify-center border-4 overflow-hidden">
          <img className="w-full h-full object-cover" src={avatar} />
        </div>
        <span className="text-4 font-semibold text-[#373B47]">{ name }</span>
      </div>
      <div className="h-6 aspect-square">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5L16 12L9 19" stroke="#373B47" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  )
}

UserCard.displayName = 'UserCard'

export { UserCard }
