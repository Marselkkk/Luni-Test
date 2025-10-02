import { useState, createContext, useContext } from 'react'

interface AuthState {
  isAuthenticated: boolean
  user: {
    id: number
    email: string
    name: string
  } | null
  isLoading: boolean
}

const AuthContext = createContext<{
  state: AuthState
  setState: (newState: Partial<AuthState>) => void
} | null>(null)

export const useAuthStore = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthStore must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: false,
  })

  const updateState = (newState: Partial<AuthState>) => {
    setState(prev => ({ ...prev, ...newState }))
  }

  return (
    <AuthContext.Provider value={{ state, setState: updateState }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthProcess = () => {
  const { state, setState } = useAuthStore()

  const login = async (email: string, password: string) => {
    setState({ isLoading: true })
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setState({
        isAuthenticated: true,
        user: {
          id: 1,
          email,
          name: 'Test User',
        },
        isLoading: false,
      })
    } catch (error) {
      setState({ isLoading: false })
      throw error
    }
  }
  
  const logout = () => {
    setState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    })
  }

  return { login, logout, state }
}
