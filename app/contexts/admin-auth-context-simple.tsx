"use client"

import React, { createContext, useState, useEffect, useCallback, useContext, ReactNode } from 'react'

interface AuthTokens {
  access: string
  refresh: string
  lifetime: number
  user_id: string
}

interface User {
  id: string
  username: string
  first_name: string
  last_name: string
  department: string
  title: string
  identity: string
  is_active: boolean
  date_joined: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  tokens: AuthTokens | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  getUserData: () => Promise<User | null>
  getCustomers: () => Promise<any[] | null>
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'admin_auth_access_token',
  REFRESH_TOKEN: 'admin_auth_refresh_token',
  USER_DATA: 'admin_auth_user_data',
  TOKEN_EXPIRY: 'admin_auth_token_expiry'
}

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [tokens, setTokens] = useState<AuthTokens | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isAuthenticated = !!user && !!tokens

  // 簡化的初始化
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // 檢查是否在瀏覽器環境中
        if (typeof window === 'undefined') {
          setIsLoading(false)
          return
        }

        const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
        const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA)
        const tokenExpiry = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY)

        if (accessToken && refreshToken && userData && tokenExpiry) {
          const expiryTime = parseInt(tokenExpiry)
          const now = Date.now()

          // 檢查 token 是否過期
          if (now < expiryTime) {
            // Token 仍然有效
            setTokens({
              access: accessToken,
              refresh: refreshToken,
              lifetime: Math.floor((expiryTime - now) / 1000),
              user_id: JSON.parse(userData).id
            })
            setUser(JSON.parse(userData))
          } else {
            // Token 過期，清除所有數據
            clearAuthData()
          }
        }
      } catch (error) {
        console.error('初始化認證狀態失敗:', error)
        clearAuthData()
      } finally {
        setIsLoading(false)
      }
    }

    // 延遲初始化以確保在瀏覽器環境中
    const timer = setTimeout(initializeAuth, 100)
    return () => clearTimeout(timer)
  }, [])

  const clearAuthData = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.USER_DATA)
      localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRY)
    }
    setUser(null)
    setTokens(null)
  }

  const saveAuthData = (tokens: AuthTokens, userData: User) => {
    const expiryTime = Date.now() + (tokens.lifetime * 1000)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access)
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh)
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData))
      localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, expiryTime.toString())
    }
    
    setTokens(tokens)
    setUser(userData)
  }

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setError(null)
      
      // 獲取 token
      const tokenResponse = await fetch('/api/proxy/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (!tokenResponse.ok) {
        return false
      }

      const tokenData = await tokenResponse.json()
      if (!tokenData.success || !tokenData.data) {
        return false
      }

      const authTokens: AuthTokens = tokenData.data

      // 獲取用戶數據
      const userResponse = await fetch(`/api/proxy/user?userId=${authTokens.user_id}&accessToken=${encodeURIComponent(authTokens.access)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!userResponse.ok) {
        return false
      }

      const userData = await userResponse.json()
      if (!userData.success || !userData.data) {
        return false
      }

      saveAuthData(authTokens, userData.data)
      return true
    } catch (error) {
      console.error('登入失敗:', error)
      setError(error instanceof Error ? error.message : '登入失敗')
      return false
    }
  }

  const logout = () => {
    clearAuthData()
  }

  const getUserData = async (): Promise<User | null> => {
    if (!tokens?.access) {
      return null
    }

    try {
      const response = await fetch(`/api/proxy/user?userId=${tokens.user_id}&accessToken=${encodeURIComponent(tokens.access)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          const userData = data.data
          setUser(userData)
          if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData))
          }
          return userData
        }
      }
      return null
    } catch (error) {
      console.error('獲取用戶數據失敗:', error)
      return null
    }
  }

  const getCustomers = async (): Promise<any[] | null> => {
    if (!tokens?.access) {
      return null
    }

    try {
      const response = await fetch(`/api/proxy/customer?accessToken=${encodeURIComponent(tokens.access)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          return data.data
        }
      }
      return null
    } catch (error) {
      console.error('獲取客戶數據失敗:', error)
      return null
    }
  }

  const value = {
    isAuthenticated,
    user,
    tokens,
    login,
    logout,
    getUserData,
    getCustomers,
    isLoading,
    error,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAdminAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}
