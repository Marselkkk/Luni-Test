import { useState, createContext, useContext } from 'react'

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
    throw new Error('useTelegramStore must be used within TelegramProvider')
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

  return (
    <TelegramContext.Provider value={{ state, setState: updateState }}>
      {children}
    </TelegramContext.Provider>
  )
}
