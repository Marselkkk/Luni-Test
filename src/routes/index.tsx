import { UserCard, Tag, ContactCard, InviteButton, TabBar, LuniBar, InviteReceivedModal, InviteSuccessModal, InviteDeclinedModal } from '../shared/ui'
import { createFileRoute } from '@tanstack/react-router'

import { useState, useEffect } from 'react'

export const Route = createFileRoute('/')({
    component: () => {
        const [activeFilter, setActiveFilter] = useState<string>('Все')
        const [userName, setUserName] = useState('Загрузка...')
        const [userAvatar, setUserAvatar] = useState('/images/stub.png')
        
        const contacts = [
            { 
                id: 1, 
                name: 'Максим Федотов', 
                isOnline: true, 
                notifications: true,
                avatar: '/images/stub.png',
            },
            { 
                id: 2, 
                name: 'Morgen', 
                isOnline: false, 
                notifications: false,
                avatar: '/images/stub.png',
            },
        ]

        useEffect(() => {
            console.log('=== MOBILE DEBUG START ===')
            console.log('Window location:', window.location.href)
            console.log('User agent:', navigator.userAgent)
            console.log('Telegram WebApp available:', !!window.Telegram?.WebApp)
            
            if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
                console.log('Full initDataUnsafe:', window.Telegram.WebApp.initDataUnsafe)
                
                const user = window.Telegram!.WebApp.initDataUnsafe?.user
                if (user) {
                    const name = user.first_name && user.last_name 
                        ? `${user.first_name} ${user.last_name}`
                        : user.first_name || `@${user.username}` || 'Пользователь'
                    setUserName(name)
                    
                    if (user.photo_url) {
                        setUserAvatar(user.photo_url)
                    }
                } else {
                    setUserName('Пользователь')
                }
                
                const startParam = window.Telegram.WebApp.initDataUnsafe?.start_param
                console.log('Telegram start_param:', startParam)
                
                if (startParam) {
                    try {
                        const startParams = new URLSearchParams(startParam)
                        const isInvite = startParams.get('startapp') === 'invite'
                        const telegramInviteWord = startParams.get('word')
                        const telegramFromUser = startParams.get('from')
                        
                        console.log('Parsed start_param:', { isInvite, telegramInviteWord, telegramFromUser })
                        
                        if (isInvite && telegramInviteWord && telegramFromUser) {
                            console.log('✅ Opening invite modal from Telegram start_param:', { telegramInviteWord, telegramFromUser })
                            setDebugInfo(`✅ Telegram start_param: ${telegramInviteWord} от ${telegramFromUser}`)
                            setInviteReceivedOpen(true)
                            sessionStorage.setItem('inviteWord', telegramInviteWord)
                            sessionStorage.setItem('fromUser', telegramFromUser)
                        } else {
                            console.log('❌ Invite conditions not met in start_param:', { isInvite, telegramInviteWord, telegramFromUser })
                            setDebugInfo(`❌ Нет приглашения в start_param. Параметры: ${startParam}`)
                        }
                    } catch (e) {
                        console.log('❌ Error parsing start_param:', e)
                        setDebugInfo(`❌ Ошибка парсинга start_param: ${e}`)
                    }
                } else {
                    console.log('❌ No start_param found')
                    setDebugInfo(`❌ Нет start_param. URL: ${window.location.search}`)
                }
            } else {
                console.log('❌ Telegram WebApp not available')
                setUserName('Тестовый Пользователь')
                setUserAvatar('/images/stub.png')
            }
            
            console.log('=== MOBILE DEBUG END ===')
        }, [])
        
        const [inviteReceivedOpen, setInviteReceivedOpen] = useState(false)
        const [inviteSuccessOpen, setInviteSuccessOpen] = useState(false)
        const [inviteDeclinedOpen, setInviteDeclinedOpen] = useState(false)
        const [debugInfo, setDebugInfo] = useState('')
        
        const getInviteData = () => {
            const inviteWord = sessionStorage.getItem('inviteWord') || 'КРАСАВЕЛЛО'
            const fromUser = sessionStorage.getItem('fromUser') || 'Леша Алексеев'
            return { inviteWord, fromUser }
        }
        
        const { inviteWord: currentInviteWord, fromUser: currentFromUser } = getInviteData()
        
        
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
            <>
                <div className="flex flex-col gap-[18px]">
                    <div className="px-4 flex items-center justify-between">
                        <span className="text-[40px] leading-[52px] font-extrabold">Чаты</span>
                        <UserCard name={userName} avatar={userAvatar} />
                    </div>
                    
                    {/* Отладочная информация для мобильного тестирования */}
                    {debugInfo && (
                        <div className="mx-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
                            <p className="text-sm text-yellow-800 font-mono">{debugInfo}</p>
                        </div>
                    )}

                    <div className="bg-white" style={{ height: 'calc(100dvh - 70px)' }}>
                        <div className="flex justify-between items-center px-4 py-1">
                            <div className="flex items-center gap-2">
                                <div className='h-6 aspect-square'>
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 15.5L21 21.5M10 17.5C6.13401 17.5 3 14.366 3 10.5C3 6.63401 6.13401 3.5 10 3.5C13.866 3.5 17 6.63401 17 10.5C17 14.366 13.866 17.5 10 17.5Z" stroke="#5D6479" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                                    avatar={contact.avatar}
                                    isOnline={contact.isOnline}
                                    notifications={contact.notifications}
                                />
                            ))}

                            <div className='flex flex-col gap-1 items-center'>
                                <div className='h-20 aspect-square flex items-center justify-center px-[19.5px] py-[18.13px] bg-[#77809B] rounded-[22px]'>
                                    <svg width="42" height="44" viewBox="0 0 42 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M36.3264 20.6204H22.8232V17.1429H36.3264C37.4475 17.1429 38.3597 16.2308 38.3597 15.1096V4.17559C38.3597 3.86015 38.105 3.60551 37.7896 3.60551C37.4741 3.60551 37.2195 3.86015 37.2195 4.17559V9.04023C37.2195 11.0659 35.5701 12.7153 33.5444 12.7153H27.8437C25.0693 12.7153 22.808 10.4578 22.808 7.67966V0.181253H26.2855V7.67966C26.2855 8.53857 26.9847 9.23406 27.8399 9.23406H33.5406C33.647 9.23406 33.7344 9.14665 33.7344 9.04023V4.17559C33.7344 1.94469 35.5511 0.128052 37.782 0.128052C40.0129 0.128052 41.8295 1.94469 41.8295 4.17559V15.1096C41.8295 18.1501 39.3554 20.6204 36.3188 20.6204H36.3264Z" fill="white"/>
                                        <path d="M4.8847 43.8719C2.6538 43.8719 0.837158 42.0553 0.837158 39.8244V23.2351H4.31462V39.8244C4.31462 40.136 4.56925 40.3944 4.8847 40.3944C5.20014 40.3944 5.45477 40.1398 5.45477 39.8244V33.9678C5.45477 32.6414 6.53412 31.5583 7.8643 31.5583H11.7712V27.047C11.7712 24.8162 13.5879 22.9995 15.8188 22.9995C18.0497 22.9995 19.8663 24.8162 19.8663 27.047V43.4842H16.3888V27.047C16.3888 26.7354 16.1342 26.477 15.8188 26.477C15.5033 26.477 15.2487 26.7316 15.2487 27.047V32.63C15.2487 33.9564 14.1693 35.0395 12.8392 35.0395H8.93224V39.8244C8.93224 42.0553 7.11559 43.8719 4.8847 43.8719Z" fill="white"/>
                                        <path d="M26.9467 43.8719C24.6664 43.8719 22.808 42.1047 22.808 39.9308V23.2352H26.2855V39.9308C26.2855 40.1512 26.5553 40.3945 26.9429 40.3945C27.228 40.3945 27.4864 40.2539 27.5738 40.0524L33.8713 25.4471C34.5097 23.9649 36.0109 23.0034 37.6984 23.0034C39.9787 23.0034 41.8333 24.7706 41.8333 26.9445V43.4843H38.3559V26.9445C38.3559 26.7241 38.086 26.4808 37.6984 26.4808C37.4133 26.4808 37.1549 26.6214 37.0675 26.8229L30.7701 41.4282C30.1316 42.9104 28.6304 43.8719 26.9429 43.8719H26.9467Z" fill="white"/>
                                        <path d="M4.97207 21.0005C2.69176 21.0005 0.833313 19.2333 0.833313 17.0594V11.2446H4.31078V17.0594C4.31078 17.2799 4.58061 17.5231 4.96826 17.5231C5.2533 17.5231 5.51174 17.3825 5.59915 17.181L11.8966 2.57569C12.5351 1.0935 14.0363 0.131958 15.7237 0.131958C18.004 0.131958 19.8625 1.89919 19.8625 4.07308V20.6129H16.385V4.07308C16.385 3.85265 16.1152 3.60943 15.7275 3.60943C15.4425 3.60943 15.184 3.75005 15.0966 3.95147L8.79918 18.5568C8.16069 20.039 6.65949 21.0005 4.97207 21.0005Z" fill="white"/>
                                    </svg>
                                </div>
                                <span className='text-[14px] leading-[16px] font-semibold text-center text-[#373B47]'>
                                    Команда Луни
                                </span>
                            </div>

                            <InviteButton invites={5} />
                        </div>
                    </div>
                </div>

                <LuniBar />
                
                <TabBar />

                <InviteReceivedModal
                    isOpen={inviteReceivedOpen}
                    onClose={() => setInviteReceivedOpen(false)}
                    inviterName={currentFromUser}
                    inviteWord={currentInviteWord}
                    onDecline={() => setInviteReceivedOpen(false)}
                    onAccept={() => setInviteReceivedOpen(false)}
                />

                <InviteSuccessModal
                    isOpen={inviteSuccessOpen}
                    onClose={() => setInviteSuccessOpen(false)}
                    invitedUserName="Леша Алексеев"
                    invitesCount={5}
                    onSkip={() => setInviteSuccessOpen(false)}
                    onInviteMore={() => setInviteSuccessOpen(false)}
                />

                <InviteDeclinedModal
                    isOpen={inviteDeclinedOpen}
                    onClose={() => setInviteDeclinedOpen(false)}
                    invitesCount={5}
                    onOk={() => setInviteDeclinedOpen(false)}
                    onInviteMore={() => setInviteDeclinedOpen(false)}
                />
            </>
        )
    },
})