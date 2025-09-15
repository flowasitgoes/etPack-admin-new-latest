"use client"

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react'

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

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [tokens, setTokens] = useState<AuthTokens | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isAuthenticated = !!user && !!tokens

  // 簡化的初始化 - 直接設置為不載入
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const clearAuthData = () => {
    setUser(null)
    setTokens(null)
  }

  const saveAuthData = (tokens: AuthTokens, userData: User) => {
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
