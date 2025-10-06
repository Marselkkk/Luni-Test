import { UserCard, Tag, ContactCard } from '@shared/ui'
import { createFileRoute } from '@tanstack/react-router'

import { useState } from 'react'

export const Route = createFileRoute('/')({
    component: () => {
        const [activeFilter, setActiveFilter] = useState<string>('Все')
        
        const contacts = [
            { id: 1, name: 'Максим Федотов', isOnline: false, notifications: true },
            { id: 2, name: 'Morgen', isOnline: true, notifications: false },
        ]
        
        const filteredContacts = contacts.filter(contact => {
            switch (activeFilter) {
                case 'Онлайн':
                    return contact.isOnline
                case 'Все':
                default:
                    return true
            }
        })
        
        const handleTagClick = (filterType: string) => {
            setActiveFilter(filterType)
        }
        
        return (
            <div className="flex flex-col gap-[18px]">
                <div className="px-4 flex items-center justify-between">
                    <span className="text-[40px] leading-[52px] font-extrabold">Чаты</span>
                    <UserCard name="Андрей" />
                </div>

                <div className="bg-white">
                    <div className="flex justify-between items-center px-4 py-1">
                        <div className="flex items-center gap-2">
                            <div className='h-6 aspect-square'>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 15.5L21 21.5M10 17.5C6.13401 17.5 3 14.366 3 10.5C3 6.63401 6.13401 3.5 10 3.5C13.866 3.5 17 6.63401 17 10.5C17 14.366 13.866 17.5 10 17.5Z" stroke="#5D6479" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <Tag 
                                title="Все" 
                                active={activeFilter === 'Все'} 
                                onClick={() => handleTagClick('Все')} 
                            />
                            <Tag 
                                title='Онлайн' 
                                active={activeFilter === 'Онлайн'} 
                                onClick={() => handleTagClick('Онлайн')} 
                            />
                        </div>

                        <div className='flex items-center gap-1.5'>
                            <div className='h-9 aspect-square'>
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 3C26.28 3 33 9.72 33 18C33 26.28 26.28 33 18 33C9.72 33 3 26.28 3 18C3 9.72 9.72 3 18 3ZM16.5 27H19.5V24H16.5V27ZM18 9C14.685 9 12 11.685 12 15H15C15 13.35 16.35 12 18 12C19.65 12 21 13.35 21 15C21 18 16.5 17.625 16.5 22.5H19.5C19.5 19.125 24 18.75 24 15C24 11.685 21.315 9 18 9Z" fill="#ACB3C6"/>
                                </svg>
                            </div>
                            <div className='relative inline-block'>
                                <div className='flex items-center justify-center w-12 h-12 bg-[#282A33] rounded-full'>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 9.75282C21.4546 9.78491 20.8611 9.80095 20.2195 9.80095C13.6347 9.80095 12.1991 8.36529 12.1991 1.78053C12.1991 0.986515 12.2151 0.545388 12.2472 0H9.75282C9.7849 0.545388 9.80095 1.1389 9.80095 1.78053C9.80095 8.36529 8.36529 9.80095 1.78053 9.80095C0.425066 9.80095 0.545388 9.78491 0 9.75282V12.2472C0.545388 12.2151 1.1389 12.1991 1.78053 12.1991C8.36529 12.1991 9.80095 13.6347 9.80095 20.2195C9.80095 21.1177 9.7849 21.4546 9.75282 22H12.2472C12.2151 21.4546 12.1991 20.8611 12.1991 20.2195C12.1991 13.6347 13.6347 12.1991 20.2195 12.1991C21.1979 12.1991 21.4546 12.2151 22 12.2472V9.75282Z" fill="white"/>
                                    </svg>
                                </div>
                                
                                <div className='absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 bg-[#282A33] border-2 border-white rounded-full'>
                                    <span className='text-white text-sm font-medium leading-none'>3</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-4 gap-3 p-4'>
                        {filteredContacts.map(contact => (
                            <ContactCard 
                                key={contact.id}
                                name={contact.name} 
                                isOnline={contact.isOnline}
                                notifications={contact.notifications}
                            />
                        ))}

                        
                    </div>
                </div>
            </div>
        )
    },
})
