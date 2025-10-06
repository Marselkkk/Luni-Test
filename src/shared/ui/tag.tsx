import React from 'react'

export interface TagProps {
    title?: string
    active?: boolean
    onClick?: () => void
}

const Tag: React.FC<TagProps> = ({ 
    title = 'Все',
    active = false,
    onClick
}) => {
  
  return (
    <button onClick={onClick}
      className={`p-2 text-[14px] leading-none text-white font-semibold rounded-lg transition-colors ${
        active ? 'bg-[#77809B]' : 'bg-[#D9DCE5] hover:bg-[#C4C8D6]'
      }`}>
      { title }
    </button>
  )
}

Tag.displayName = 'Tag'

export { Tag }