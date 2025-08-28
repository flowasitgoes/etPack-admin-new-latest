"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  username: string
  name: string
  role: string
  department: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

// 模擬用戶資料庫
const mockUsers = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: '系統管理員',
    role: '管理員',
    department: '資訊部'
  },
  {
    id: '2',
    username: 'operator',
    password: 'operator123',
    name: '張小明',
    role: '操作員',
    department: '生產部'
  },
  {
    id: '3',
    username: 'supervisor',
    password: 'supervisor123',
    name: '李美玲',
    role: '主管',
    department: '品管部'
  }
]

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 檢查本地儲存的登入狀態
  useEffect(() => {
    const savedUser = localStorage.getItem('erp_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Failed to parse saved user:', error)
        localStorage.removeItem('erp_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // 模擬API延遲
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 驗證用戶
    const foundUser = mockUsers.find(u => u.username === username && u.password === password)
    
    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        username: foundUser.username,
        name: foundUser.name,
        role: foundUser.role,
        department: foundUser.department
      }
      
      setUser(userData)
      localStorage.setItem('erp_user', JSON.stringify(userData))
      setIsLoading(false)
      return true
    } else {
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('erp_user')
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
