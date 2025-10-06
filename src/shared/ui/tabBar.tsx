import React from 'react'

export interface TabBarProps {
    invites?: number
    activeTab?: 'chats' | 'diary'
}

const TabBar: React.FC<TabBarProps> = ({ 
    invites = 5,
    activeTab = 'chats'
}) => {
  
    return (
        <div className='fixed left-0 bottom-9 w-full px-9'>
            <div className='flex items-center justify-between bg-black rounded-2xl px-5 pt-2 pb-3'>
                <div className={`flex flex-col items-center ${activeTab === 'chats' ? 'text-white' : 'text-[#5D6479]'}`}>
                    <div className="w-9 h-9">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 12H30C30.8284 12 31.5 12.6716 31.5 13.5V30L26.5005 25.8464C26.2312 25.6227 25.8911 25.5 25.541 25.5H13.5C12.6716 25.5 12 24.8284 12 24V19.5M24 12V7.5C24 6.67157 23.3284 6 22.5 6H6C5.17157 6 4.5 6.67157 4.5 7.5V24.0004L9.49951 19.8462C9.76882 19.6225 10.1089 19.5 10.459 19.5H12M24 12V18C24 18.8284 23.3284 19.5 22.5 19.5H12" 
                            stroke={ activeTab === 'chats' ? 'white' : '#5D6479' } strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <span className="text-[12px] font-semibold leading-none">Чаты</span>
                </div>
                
                <div className="flex items-center gap-2 bg-white rounded-xl p-2">
                    <div className="w-[26px] h-[26px]">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.05974 11.4635H5.40418C10.3717 11.4635 11.4573 10.3842 11.4573 5.41037C11.4573 4.92435 11.4826 4.4762 11.4573 4.06592H13.2752C13.2499 4.48251 13.2752 4.92435 13.2752 5.41037C13.2752 10.3779 14.3545 11.4635 19.3283 11.4635C19.8143 11.4635 20.6727 11.4635 20.6727 11.4635V13.2814C20.6727 13.2814 19.8143 13.2814 19.3283 13.2814C14.3608 13.2814 13.2752 14.3607 13.2752 19.3346C13.2752 19.8206 13.2752 20.679 13.2752 20.679H11.4573C11.4573 20.679 11.4573 19.8206 11.4573 19.3346C11.4573 14.367 10.378 13.2814 5.40418 13.2814C4.91816 13.2814 4.05974 13.2814 4.05974 13.2814V11.4635ZM24.7124 26L21.3986 23.1912C20.7295 22.5221 19.6881 22.3896 18.8801 22.8882C17.0118 24.0496 14.8153 24.725 12.4609 24.7439C5.63141 24.7944 0.0895336 19.3724 0.00116658 12.5429C-0.0935123 5.58711 5.58722 -0.0873492 12.543 0.0010183C19.3725 0.0956978 24.7944 5.63129 24.7439 12.4608C24.725 14.8152 24.0496 17.0118 22.8882 18.8801C22.3896 19.6817 22.5221 20.7295 23.1912 21.3986L26 24.7124L24.7187 25.9937L24.7124 26ZM12.1453 22.2128C17.7503 22.3391 22.3328 17.7503 22.2065 12.1516C22.0929 6.90631 17.8261 2.64573 12.5872 2.53212C6.98216 2.40588 2.3997 6.99468 2.52594 12.5934C2.63955 17.8386 6.90642 22.0992 12.1453 22.2128Z" fill="black"/>
                        </svg>
                    </div>
                    <span className='text-white text-[16px] px-2 bg-[#ACB3C6] rounded-lg'>
                        { invites }
                    </span>
                </div>

                <div className={`flex flex-col items-center ${activeTab === 'diary' ? 'text-white' : 'text-[#5D6479]'}`}>
                    <div className="w-9 h-9">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.9997 6H26.1997C27.8799 6 28.7206 6 29.3623 6.32698C29.9268 6.6146 30.3854 7.07321 30.673 7.6377C31 8.27943 31 9.12014 31 10.8003V25.2003C31 26.8805 31 27.7201 30.673 28.3618C30.3854 28.9263 29.9268 29.3857 29.3623 29.6733C28.7212 30 27.8815 30 26.2046 30H11.7954C10.1185 30 9.28002 30 8.63891 29.6733C8.07442 29.3857 7.61428 28.9259 7.32666 28.3614C7 27.7203 7 26.8815 7 25.2046V21M13 7.5L22 16.5V21H17.5L8.5 12M13 7.5L8.5 3L4 7.5L8.5 12M13 7.5L8.5 12" 
                            stroke={ activeTab === 'diary' ? 'white' : '#5D6479' } stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <span className="text-[12px] font-semibold leading-none">Дневник</span>
                </div>
            </div>
        </div>
    )
}

TabBar.displayName = 'TabBar'

export { TabBar }