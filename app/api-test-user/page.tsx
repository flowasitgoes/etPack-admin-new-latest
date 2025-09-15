"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, User, Key, Copy, Eye, EyeOff } from "lucide-react"

export default function ApiTestUserPage() {
  const [formData, setFormData] = useState({
    accessToken: "",
    userId: "d579eb64-2ca5-44df-a04a-855e37c70083"
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
  const [showToken, setShowToken] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleGetUser = async () => {
    if (!formData.accessToken) {
      setError("請先輸入 access token")
      return
    }

    if (!formData.userId) {
      setError("請先輸入 user ID")
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess("")
    setResponse(null)

    try {
      const response = await fetch('/api/proxy/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: formData.accessToken,
          userId: formData.userId
        })
      })

      const data = await response.json()
      setResponse(data)

      if (data.success) {
        setSuccess("用戶資料獲取成功！")
      } else {
        setError(`用戶資料獲取失敗: ${data.data?.message || data.error || '未知錯誤'}`)
      }
    } catch (err) {
      setError(`網路錯誤: ${err instanceof Error ? err.message : '未知錯誤'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setSuccess("已複製到剪貼板！")
    setTimeout(() => setSuccess(""), 2000)
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
    <div className="min-h-screen bg-gray-50 py-8 px-4" suppressHydrationWarning>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">User API 測試頁面</h1>
          <p className="text-gray-600">測試遠端後端 API: https://tuco.onrender.com/api/user/user/</p>
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
                <User className="w-5 h-5" />
                GET /api/user/user/{`{user_id}`} 測試
              </CardTitle>
              <CardDescription>
                使用 Bearer token 獲取用戶詳細資料
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 表單欄位 */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="access-token">Access Token</Label>
                  <div className="relative">
                    <Input
                      id="access-token"
                      type={showToken ? "text" : "password"}
                      value={formData.accessToken}
                      onChange={(e) => handleInputChange('accessToken', e.target.value)}
                      placeholder="輸入 access token..."
                      className="pr-20"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                      <button
                        type="button"
                        onClick={() => setShowToken(!showToken)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      {formData.accessToken && (
                        <button
                          type="button"
                          onClick={() => copyToClipboard(formData.accessToken)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-id">User ID</Label>
                  <Input
                    id="user-id"
                    value={formData.userId}
                    onChange={(e) => handleInputChange('userId', e.target.value)}
                    placeholder="d579eb64-2ca5-44df-a04a-855e37c70083"
                  />
                </div>
              </div>

              {/* 按鈕區域 */}
              <div className="pt-4">
                <Button
                  onClick={handleGetUser}
                  disabled={isLoading || isCheckingStatus || !formData.accessToken || !formData.userId}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      獲取用戶資料中...
                    </>
                  ) : (
                    <>
                      <User className="w-4 h-4 mr-2" />
                      獲取用戶資料
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
                  response.success || response.data?.id ? (
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
                查看用戶資料請求的結果
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

              {/* 用戶資料顯示 */}
              {response?.data?.id && (
                <div className="space-y-3 mb-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">用戶資料</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ID:</span>
                        <span className="font-mono">{response.data.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">用戶名:</span>
                        <span className="font-medium">{response.data.username}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">姓名:</span>
                        <span>{response.data.first_name} {response.data.last_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">部門:</span>
                        <span>{response.data.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">職稱:</span>
                        <span>{response.data.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">身份:</span>
                        <span>{response.data.identity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">狀態:</span>
                        <span className={`px-2 py-1 rounded text-xs ${response.data.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {response.data.is_active ? '啟用' : '停用'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">註冊時間:</span>
                        <span className="text-xs">{new Date(response.data.date_joined).toLocaleString('zh-TW')}</span>
                      </div>
                    </div>
                  </div>
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
                  點擊上方按鈕開始測試 User API
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
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded text-sm font-mono overflow-x-auto">
{`curl --location 'https://tuco.onrender.com/api/user/user/d579eb64-2ca5-44df-a04a-855e37c70083' \\
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`}
            </pre>
          </CardContent>
        </Card>

        {/* API 使用說明 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>User API 使用說明</CardTitle>
            <CardDescription>
              關於 GET user API 的重要信息
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Bearer Token 認證</h4>
                <p className="text-sm text-blue-700">
                  需要在 Authorization header 中提供有效的 access token
                </p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">User ID 參數</h4>
                <p className="text-sm text-green-700">
                  URL 路徑中需要包含要查詢的用戶 ID
                </p>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">返回資料</h4>
                <p className="text-sm text-purple-700">
                  包含用戶的詳細資料：姓名、部門、職稱、狀態等
                </p>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-2">權限控制</h4>
                <p className="text-sm text-orange-700">
                  只能查詢有權限訪問的用戶資料
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
