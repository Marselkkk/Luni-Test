import { useTelegramStore } from './telegram-store'

export const useTelegramUser = () => {
  const { state } = useTelegramStore()
  
  const getUserDisplayName = () => {
    if (!state.user) return 'Пользователь'
    
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
    if (!state.user) return 'П'
    
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
    user: state.user,
    isReady: state.isReady,
    webApp: state.webApp,
    getUserDisplayName,
    getUserInitials,
  }
}
