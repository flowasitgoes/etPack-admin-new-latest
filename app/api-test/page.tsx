"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, ExternalLink } from "lucide-react"

export default function ApiTestPage() {
  const [formData, setFormData] = useState({
    username: "W64",
    password: "test01",
    identity: "B",
    first_name: "雲門",
    last_name: "珂氏",
    department: "抽袋",
    title: "建檔員"
  })
  
  const [response, setResponse] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isWakingUp, setIsWakingUp] = useState(false)
  const [serviceStatus, setServiceStatus] = useState<{
    isOnline: boolean
    responseTime?: number
    lastChecked?: string
    message: string
    registerTest?: any
    rootStatus?: number
    status?: number
  } | null>(null)
  const [isCheckingStatus, setIsCheckingStatus] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleRegister = async () => {
    setIsLoading(true)
    setError("")
    setSuccess("")
    setResponse(null)

    try {
      const response = await fetch('/api/proxy/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      setResponse(data)

      if (data.success) {
        setSuccess("註冊成功！")
      } else {
        setError(`註冊失敗: ${data.data?.message || data.error || '未知錯誤'}`)
      }
    } catch (err) {
      setError(`網路錯誤: ${err instanceof Error ? err.message : '未知錯誤'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestCurl = async () => {
    setIsLoading(true)
    setError("")
    setSuccess("")
    setResponse(null)

    try {
      const response = await fetch('/api/proxy/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: "test01",
          username: "W64",
          identity: "B",
          first_name: "雲門",
          last_name: "珂氏",
          department: "抽袋",
          title: "建檔員"
        })
      })

      const data = await response.json()
      setResponse(data)

      if (data.success) {
        setSuccess("CURL 測試成功！")
      } else {
        setError(`CURL 測試失敗: ${data.data?.message || data.error || '未知錯誤'}`)
      }
    } catch (err) {
      setError(`CURL 測試網路錯誤: ${err instanceof Error ? err.message : '未知錯誤'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleWakeUp = async () => {
    setIsWakingUp(true)
    setError("")
    setSuccess("")
    setResponse(null)

    try {
      const response = await fetch('/api/proxy/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wakeUpOnly: true
        })
      })

      const data = await response.json()
      setResponse(data)

      if (data.wakeUpStatus === 200) {
        setSuccess("服務已喚醒！現在可以進行註冊測試。")
      } else {
        setError(`喚醒失敗: ${data.error || '未知錯誤'}`)
      }
    } catch (err) {
      setError(`喚醒網路錯誤: ${err instanceof Error ? err.message : '未知錯誤'}`)
    } finally {
      setIsWakingUp(false)
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
        registerTest: data.registerTest,
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">API 測試頁面</h1>
          <p className="text-gray-600">測試遠端後端 API: https://tuco.onrender.com/</p>
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
                    {serviceStatus.registerTest && (
                      <div className="text-xs text-blue-600">
                        註冊端點: {serviceStatus.registerTest.message}
                        {serviceStatus.registerTest.status && ` (${serviceStatus.registerTest.status})`}
                      </div>
                    )}
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
                <ExternalLink className="w-5 h-5" />
                POST /register 測試
              </CardTitle>
              <CardDescription>
                測試用戶註冊 API 端點
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 表單欄位 */}
              <div className="grid grid-cols-2 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="identity">身份 (identity)</Label>
                  <Input
                    id="identity"
                    value={formData.identity}
                    onChange={(e) => handleInputChange('identity', e.target.value)}
                    placeholder="B"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="first_name">名字 (first_name)</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                    placeholder="雲門"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">姓氏 (last_name)</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    placeholder="珂氏"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">部門 (department)</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    placeholder="抽袋"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="title">職稱 (title)</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="建檔員"
                  />
                </div>
              </div>

              {/* 按鈕區域 */}
              <div className="space-y-3 pt-4">
                <div className="flex gap-3">
                  <Button
                    onClick={handleRegister}
                    disabled={isLoading || isWakingUp}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        測試中...
                      </>
                    ) : (
                      "測試註冊 API"
                    )}
                  </Button>
                  <Button
                    onClick={handleTestCurl}
                    disabled={isLoading || isWakingUp}
                    variant="outline"
                    className="flex-1"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        測試中...
                      </>
                    ) : (
                      "CURL 範例測試"
                    )}
                  </Button>
                </div>
                <Button
                  onClick={handleWakeUp}
                  disabled={isLoading || isWakingUp}
                  variant="secondary"
                  className="w-full"
                >
                  {isWakingUp ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      正在喚醒服務...
                    </>
                  ) : (
                    "🔔 喚醒 Render 服務"
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
                  response.success || response.message?.includes('success') ? (
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
                查看 API 請求的結果
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

              {/* 回應內容 */}
              {response && (
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">狀態碼</Label>
                    <div className="mt-1 p-2 bg-gray-100 rounded text-sm font-mono">
                      {response.status || 'N/A'}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700">回應內容</Label>
                    <pre className="mt-1 p-3 bg-gray-100 rounded text-sm font-mono overflow-auto max-h-64">
                      {JSON.stringify(response, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {!response && !isLoading && (
                <div className="text-center text-gray-500 py-8">
                  點擊上方按鈕開始測試 API
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
{`curl --location 'https://tuco.onrender.com/register' \\
--header 'Content-Type: application/json' \\
--data-raw '{
  "password": "test01",
  "username": "W64",
  "identity": "B",
  "first_name": "雲門",
  "last_name": "珂氏",
  "department": "抽袋",
  "title": "建檔員"
}'`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
