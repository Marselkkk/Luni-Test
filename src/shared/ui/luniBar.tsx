import React from 'react'

export interface LuniBarProps {
    title?: number
}

const LuniBar: React.FC<LuniBarProps> = ({ 
    title = 'Привет! Давай поболтаем?'
}) => {
  
    return (
        <div className='fixed flex flex-col w-full left-0 bottom-0 gradient-background px-3 pb-[60px]'>
            <div className='flex gap-8 px-6'>
                <div className='w-5 h-[23px] animate-bounce-left'>
                    <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.18295 23H19.3258C19.3258 23 16.7968 15.7936 11.0435 8.5C5.29012 1.20637 1.18295 0 1.18295 0C1.18295 0 0 4 0 12.5C0 16.9053 1.18295 23 1.18295 23Z" fill="white"/>
                    </svg>
                </div>
                <div className='w-5 h-[23px] animate-bounce-right'>
                    <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.8171 23H0.674194C0.674194 23 3.20316 15.7936 8.95652 8.5C14.7099 1.20637 18.8171 0 18.8171 0C18.8171 0 20 4 20 12.5C20 16.9053 18.8171 23 18.8171 23Z" fill="white"/>
                    </svg>
                </div>
            </div>

            <div className='flex items-center justify-between px-6 pt-3 pb-12 bg-white rounded-2xl'>
                <div className='flex items-center gap-1.5'>
                    <span className='text-[18px] font-extrabold text-[#373B47] leading-[22px]'>Луни</span>
                    <div className='w-3 h-3 rounded-full bg-[#14C4D1]'></div>
                </div>
                <div className='text-[16px] font-semibold text-[#5D6479] leading-[22px]'>
                    {title}
                </div>
            </div>
        </div>
    )
}

LuniBar.displayName = 'LuniBar'

export { LuniBar }