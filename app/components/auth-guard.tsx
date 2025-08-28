"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/auth-context"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  // 顯示載入中狀態
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    )
  }

  // 如果未登入，不渲染內容（會重定向到登入頁）
  if (!isAuthenticated) {
    return null
  }

  // 已登入，渲染子組件
  return <>{children}</>
}
