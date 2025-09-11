"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, ExternalLink, Key, Clock, User } from "lucide-react"

export default function ApiTestTokenPage() {
  const [formData, setFormData] = useState({
    username: "W64",
    password: "test01"
  })
  
  const [refreshData, setRefreshData] = useState({
    refresh: ""
  })
  
  const [response, setResponse] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [serviceStatus, setServiceStatus] = useState<{
    isOnline: boolean
    responseTime?: number
    lastChecked?: string
    message: string
    rootStatus?: number
    status?: number
  } | null>(null)
  const [isCheckingStatus, setIsCheckingStatus] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleRefreshInputChange = (value: string) => {
    setRefreshData({ refresh: value })
  }

  const fillRefreshTokenFromResponse = () => {
    if (response?.data?.refresh) {
      setRefreshData({ refresh: response.data.refresh })
    }
  }

  const handleTokenRequest = async () => {
    setIsLoading(true)
    setError("")
    setSuccess("")
    setResponse(null)

    try {
      const response = await fetch('/api/proxy/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      setResponse(data)

      if (data.success) {
        setSuccess("Token 獲取成功！")
      } else {
        setError(`Token 獲取失敗: ${data.data?.message || data.error || '未知錯誤'}`)
      }
    } catch (err) {
      setError(`網路錯誤: ${err instanceof Error ? err.message : '未知錯誤'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefreshToken = async () => {
    if (!refreshData.refresh) {
      setError("請先輸入 refresh token")
      return
    }

    setIsRefreshing(true)
    setError("")
    setSuccess("")
    setResponse(null)

    try {
      const response = await fetch('/api/proxy/token/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(refreshData)
      })

      const data = await response.json()
      setResponse(data)

      if (data.success) {
        setSuccess("Token 刷新成功！")
      } else {
        setError(`Token 刷新失敗: ${data.data?.message || data.error || '未知錯誤'}`)
      }
    } catch (err) {
      setError(`網路錯誤: ${err instanceof Error ? err.message : '未知錯誤'}`)
    } finally {
      setIsRefreshing(false)
    }
  }

  const checkServiceStatus = async () => {
    setIsCheckingStatus(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch('/api/proxy/status')
      const data = await response.json()
      
      setServiceStatus({
        isOnline: data.isOnline,
        responseTime: data.responseTime,
        lastChecked: new Date().toLocaleString('zh-TW'),
        message: data.message,
        rootStatus: data.rootStatus,
        status: data.status
      })

      if (data.isOnline) {
        setSuccess(`✅ 服務正常運行 (回應時間: ${data.responseTime}ms)`)
      } else {
        setError(`❌ 服務離線: ${data.message}`)
      }
    } catch (err) {
      setError(`狀態檢查失敗: ${err instanceof Error ? err.message : '未知錯誤'}`)
      setServiceStatus({
        isOnline: false,
        lastChecked: new Date().toLocaleString('zh-TW'),
        message: '檢查失敗'
      })
    } finally {
      setIsCheckingStatus(false)
    }
  }

  // 頁面載入時自動檢查服務狀態
  useEffect(() => {
    checkServiceStatus()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Token API 測試頁面</h1>
          <p className="text-gray-600">測試遠端後端 API: https://tuco.onrender.com/api/token</p>
        </div>

        {/* 服務狀態區域 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${serviceStatus?.isOnline ? 'bg-green-500' : serviceStatus ? 'bg-red-500' : 'bg-gray-400'}`}></div>
              服務狀態監控
            </CardTitle>
            <CardDescription>
              檢查 Render 服務是否在線
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                {serviceStatus ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${serviceStatus.isOnline ? 'text-green-600' : 'text-red-600'}`}>
                        {serviceStatus.isOnline ? '🟢 在線' : '🔴 離線'}
                      </span>
                      {serviceStatus.responseTime && (
                        <span className="text-sm text-gray-500">
                          ({serviceStatus.responseTime}ms)
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {serviceStatus.message}
                    </div>
                    <div className="text-xs text-gray-500">
                      根路徑狀態: {serviceStatus.rootStatus || 'N/A'} | API 狀態: {serviceStatus.status || 'N/A'}
                    </div>
                    <div className="text-xs text-gray-500">
                      最後檢查: {serviceStatus.lastChecked}
                    </div>
                  </>
                ) : (
                  <div className="text-gray-500">尚未檢查服務狀態</div>
                )}
              </div>
              <Button
                onClick={checkServiceStatus}
                disabled={isCheckingStatus}
                variant="outline"
                size="sm"
              >
                {isCheckingStatus ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    檢查中...
                  </>
                ) : (
                  '檢查狀態'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 表單區域 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                POST /api/token 測試
              </CardTitle>
              <CardDescription>
                測試用戶登入並獲取 access token
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 表單欄位 */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">用戶名 (username)</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder="W64"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">密碼 (password)</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="test01"
                  />
                </div>
              </div>

              {/* 按鈕區域 */}
              <div className="pt-4">
                <Button
                  onClick={handleTokenRequest}
                  disabled={isLoading || isCheckingStatus}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      獲取 Token 中...
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4 mr-2" />
                      獲取 Access Token
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Refresh Token 表單區域 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                POST /api/token/refresh 測試
              </CardTitle>
              <CardDescription>
                使用 refresh token 獲取新的 access token
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Refresh Token 輸入 */}
              <div className="space-y-2">
                <Label htmlFor="refresh-token">Refresh Token</Label>
                <div className="flex gap-2">
                  <Input
                    id="refresh-token"
                    value={refreshData.refresh}
                    onChange={(e) => handleRefreshInputChange(e.target.value)}
                    placeholder="輸入 refresh token..."
                    className="flex-1"
                  />
                  {response?.data?.refresh && (
                    <Button
                      onClick={fillRefreshTokenFromResponse}
                      variant="outline"
                      size="sm"
                    >
                      自動填充
                    </Button>
                  )}
                </div>
              </div>

              {/* Refresh 按鈕 */}
              <div className="pt-2">
                <Button
                  onClick={handleRefreshToken}
                  disabled={isRefreshing || isCheckingStatus || !refreshData.refresh}
                  className="w-full"
                  variant="outline"
                >
                  {isRefreshing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      刷新 Token 中...
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 mr-2" />
                      刷新 Access Token
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 回應區域 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {response ? (
                  response.success || response.data?.access ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                )}
                API 回應
              </CardTitle>
              <CardDescription>
                查看 Token 請求的結果
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* 成功/錯誤訊息 */}
              {success && (
                <Alert className="mb-4 border-green-200 bg-green-50">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <XCircle className="w-4 h-4" />
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Token 信息顯示 */}
              {response?.data?.access && (
                <div className="space-y-3 mb-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Key className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">Access Token</span>
                    </div>
                    <div className="text-xs font-mono bg-white p-2 rounded border break-all">
                      {response.data.access}
                    </div>
                  </div>
                  
                  {response.data.refresh && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Refresh Token</span>
                      </div>
                      <div className="text-xs font-mono bg-white p-2 rounded border break-all">
                        {response.data.refresh}
                      </div>
                    </div>
                  )}

                  {response.data.user_id && (
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-purple-800">User ID</span>
                      </div>
                      <div className="text-sm font-mono bg-white p-2 rounded border">
                        {response.data.user_id}
                      </div>
                    </div>
                  )}

                  {response.data.lifetime && (
                    <div className="text-xs text-gray-600">
                      <Clock className="w-3 h-3 inline mr-1" />
                      Token 有效期: {response.data.lifetime} 秒
                    </div>
                  )}
                </div>
              )}

              {/* 完整回應內容 */}
              {response && (
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">狀態碼</Label>
                    <div className="mt-1 p-2 bg-gray-100 rounded text-sm font-mono">
                      {response.status || 'N/A'}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700">完整回應</Label>
                    <pre className="mt-1 p-3 bg-gray-100 rounded text-sm font-mono overflow-auto max-h-64">
                      {JSON.stringify(response, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {!response && !isLoading && (
                <div className="text-center text-gray-500 py-8">
                  點擊上方按鈕開始測試 Token API
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* CURL 範例 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>CURL 測試範例</CardTitle>
            <CardDescription>
              您提供的 CURL 命令範例
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">1. 獲取 Token</h4>
              <pre className="bg-gray-100 p-4 rounded text-sm font-mono overflow-x-auto">
{`curl --location 'https://tuco.onrender.com/api/token' \\
--header 'Content-Type: application/json' \\
--data-raw '{
  "username": "W64",
  "password": "test01"
}'`}
              </pre>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">2. 刷新 Token</h4>
              <pre className="bg-gray-100 p-4 rounded text-sm font-mono overflow-x-auto">
{`curl --location 'https://tuco.onrender.com/api/token/refresh' \\
--header 'Content-Type: application/json' \\
--data '{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}'`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Token 使用說明 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Token 使用說明</CardTitle>
            <CardDescription>
              關於 access token 的重要信息
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Access Token</h4>
                <p className="text-sm text-blue-700">
                  登入成功後獲得的認證令牌，後續所有 API 操作都需要使用此 token
                </p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">有效期</h4>
                <p className="text-sm text-green-700">
                  預設為 3600 秒（1小時），超過時間後 access token 將失效
                </p>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">Refresh Token</h4>
                <p className="text-sm text-purple-700">
                  可用來換取新的 access token，延長認證有效期
                </p>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-2">User ID</h4>
                <p className="text-sm text-orange-700">
                  提供用戶 ID 供後續檢索和操作使用
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
