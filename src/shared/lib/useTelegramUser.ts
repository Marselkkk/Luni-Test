import { useTelegramStore } from './telegram-store'

export const useTelegramUser = () => {
  try {
    const context = useTelegramStore()
    const state = context?.state
    
    const getUserDisplayName = () => {
      if (!state?.user) return 'Пользователь'
      
      const { first_name, last_name, username } = state.user
      
      if (first_name && last_name) {
        return `${first_name} ${last_name}`
      }
      
      if (first_name) {
        return first_name
      }
      
      if (username) {
        return `@${username}`
      }
      
      return 'Пользователь'
    }
    
    const getUserInitials = () => {
      if (!state?.user) return 'П'
      
      const { first_name, last_name } = state.user
      
      if (first_name && last_name) {
        return `${first_name[0]}${last_name[0]}`.toUpperCase()
      }
      
      if (first_name) {
        return first_name[0].toUpperCase()
      }
      
      return 'П'
    }
    
    return {
      user: state?.user || null,
      isReady: state?.isReady || false,
      webApp: state?.webApp || null,
      getUserDisplayName,
      getUserInitials,
    }
  } catch (error) {
    // Fallback значения в случае ошибки
    return {
      user: null,
      isReady: false,
      webApp: null,
      getUserDisplayName: () => 'Пользователь',
      getUserInitials: () => 'П',
    }
  }
}
