"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Eye, EyeOff, Building2, Shield } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(username, password)
      if (success) {
        router.push("/")
      } else {
        setError("用戶名或密碼錯誤，請重新輸入")
      }
    } catch (err) {
      setError("登入時發生錯誤，請稍後再試")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAECB6] via-white to-[#93D3AE] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2BBAA5] rounded-full mb-4 shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">工廠ERP系統</h1>
          <p className="text-gray-600">請登入以繼續使用系統</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-semibold text-center text-[#2BBAA5]">登入</CardTitle>
            <CardDescription className="text-center text-gray-600">
              輸入您的帳號資訊以存取系統
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 font-medium">用戶名</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="請輸入用戶名"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 border-gray-300 focus:border-[#2BBAA5] focus:ring-[#2BBAA5]/20"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">密碼</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="請輸入密碼"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-11 pr-10 border-gray-300 focus:border-[#2BBAA5] focus:ring-[#2BBAA5]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#2BBAA5] transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  disabled={isLoading}
                  className="data-[state=checked]:bg-[#2BBAA5] data-[state=checked]:border-[#2BBAA5]"
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  記住我
                </Label>
              </div>

              {/* Error Message */}
              {error && (
                <Alert variant="destructive" className="border-[#F96635] bg-[#F96635]/10">
                  <AlertDescription className="text-[#F96635]">{error}</AlertDescription>
                </Alert>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-[#2BBAA5] hover:bg-[#2BBAA5]/90 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    登入中...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    登入
                  </>
                )}
              </Button>
            </form>

            {/* Demo Accounts Info */}
            <div className="mt-6 p-4 bg-[#93D3AE]/20 rounded-lg border border-[#93D3AE]/30">
              <h4 className="text-sm font-medium text-[#2BBAA5] mb-2">測試帳號：</h4>
              <div className="space-y-1 text-xs text-gray-600">
                <div>管理員：admin / admin123</div>
                <div>操作員：operator / operator123</div>
                <div>主管：supervisor / supervisor123</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            © 2024 工廠ERP系統. 保留所有權利.
          </p>
        </div>
      </div>
    </div>
  )
}
