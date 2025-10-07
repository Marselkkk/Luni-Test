import React, { useState, createContext, useContext, useEffect } from 'react'

interface TelegramState {
  webApp: any | null
  isReady: boolean
  user: {
    id: number
    first_name: string
    last_name?: string
    username?: string
    language_code?: string
  } | null
}

const TelegramContext = createContext<{
  state: TelegramState
  setState: (newState: Partial<TelegramState>) => void
} | null>(null)

export const useTelegramStore = () => {
  const context = useContext(TelegramContext)
  if (!context) {
    // Возвращаем дефолтные значения вместо ошибки
    return {
      state: {
        webApp: null,
        isReady: false,
        user: null,
      },
      setState: () => {},
    }
  }
  return context
}

export const TelegramProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<TelegramState>({
    webApp: null,
    isReady: false,
    user: null,
  })

  const updateState = (newState: Partial<TelegramState>) => {
    setState(prev => ({ ...prev, ...newState }))
  }

  useEffect(() => {
    // Проверяем, запущено ли приложение в Telegram
    const isInTelegram = typeof window !== 'undefined' && window.Telegram?.WebApp
    
    if (isInTelegram) {
      const webApp = window.Telegram.WebApp
      
      // Инициализируем Web App
      webApp.ready()
      webApp.expand()
      
      // Получаем информацию о пользователе
      const user = webApp.initDataUnsafe?.user
      
      updateState({
        webApp,
        isReady: true,
        user: user || null,
      })
    } else {
      // Для разработки и работы вне Telegram - создаем тестового пользователя
      updateState({
        webApp: null,
        isReady: true,
        user: {
          id: 123456789,
          first_name: 'Тестовый',
          last_name: 'Пользователь',
          username: 'test_user',
          language_code: 'ru',
        },
      })
    }
  }, [])

  return (
    <TelegramContext.Provider value={{ state, setState: updateState }}>
      {children}
    </TelegramContext.Provider>
  )
}
