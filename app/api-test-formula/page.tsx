"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, FlaskConical, Plus, List, Copy, Eye, EyeOff } from "lucide-react"

export default function ApiTestFormulaPage() {
  const [formData, setFormData] = useState({
    accessToken: "",
    id: "EP100-2",
    name: "LLDPE貼合膜 德易封/醬包",
    produce_date: "2023-03-21"
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
  const [activeTab, setActiveTab] = useState<'create' | 'list'>('create')

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCreateFormula = async () => {
    if (!formData.accessToken) {
      setError("請先輸入 access token")
      return
    }

    if (!formData.id || !formData.name) {
      setError("請填寫配方 ID 和名稱")
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess("")
    setResponse(null)

    try {
      const response = await fetch('/api/proxy/formula', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: formData.accessToken,
          formulaData: {
            id: formData.id,
            name: formData.name,
            produce_date: formData.produce_date
          }
        })
      })

      const data = await response.json()
      setResponse(data)

      if (data.success) {
        setSuccess("配方資料創建成功！")
      } else {
        setError(`配方資料創建失敗: ${data.data?.message || data.error || '未知錯誤'}`)
      }
    } catch (err) {
      setError(`網路錯誤: ${err instanceof Error ? err.message : '未知錯誤'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetFormulas = async () => {
    if (!formData.accessToken) {
      setError("請先輸入 access token")
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess("")
    setResponse(null)

    try {
      const response = await fetch(`/api/proxy/formula?accessToken=${encodeURIComponent(formData.accessToken)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json()
      setResponse(data)

      if (data.success) {
        setSuccess(`成功獲取配方列表！共 ${data.data?.length || 0} 筆資料`)
      } else {
        setError(`配方列表獲取失敗: ${data.data?.message || data.error || '未知錯誤'}`)
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Formula API 測試頁面</h1>
          <p className="text-gray-600">測試遠端後端 API: https://tuco.onrender.com/api/order/formula</p>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 font-medium">⚠️ 注意：此 API 端點可能尚未在遠端服務器中實現</p>
            <p className="text-yellow-700 text-sm mt-1">根據服務器回應，/api/order/formula 端點目前返回 404 錯誤</p>
          </div>
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

        {/* Token 輸入區域 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Copy className="w-5 h-5" />
              Access Token
            </CardTitle>
            <CardDescription>
              輸入 Bearer token 用於 API 認證
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Input
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
          </CardContent>
        </Card>

        {/* 標籤頁 */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'create' ? 'default' : 'outline'}
            onClick={() => setActiveTab('create')}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            創建配方
          </Button>
          <Button
            variant={activeTab === 'list' ? 'default' : 'outline'}
            onClick={() => setActiveTab('list')}
            className="flex items-center gap-2"
          >
            <List className="w-4 h-4" />
            配方列表
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 表單區域 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5" />
                {activeTab === 'create' ? 'POST /api/order/formula' : 'GET /api/order/formula'}
              </CardTitle>
              <CardDescription>
                {activeTab === 'create' ? '創建新的配方資料' : '獲取所有配方資料列表'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeTab === 'create' ? (
                <>
                  {/* 創建配方表單 */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="formula-id">配方 ID *</Label>
                        <Input
                          id="formula-id"
                          value={formData.id}
                          onChange={(e) => handleInputChange('id', e.target.value)}
                          placeholder="EP100-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="formula-name">配方名稱 *</Label>
                        <Input
                          id="formula-name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="LLDPE貼合膜 德易封/醬包"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="formula-date">生產日期</Label>
                      <Input
                        id="formula-date"
                        type="date"
                        value={formData.produce_date}
                        onChange={(e) => handleInputChange('produce_date', e.target.value)}
                        placeholder="2023-03-21"
                      />
                    </div>
                  </div>

                  {/* 創建按鈕 */}
                  <div className="pt-4">
                    <Button
                      onClick={handleCreateFormula}
                      disabled={isLoading || isCheckingStatus || !formData.accessToken || !formData.id || !formData.name}
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          創建配方中...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          創建配方
                        </>
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* 獲取配方列表 */}
                  <div className="text-center py-8">
                    <FlaskConical className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">點擊下方按鈕獲取所有配方資料</p>
                    <Button
                      onClick={handleGetFormulas}
                      disabled={isLoading || isCheckingStatus || !formData.accessToken}
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          獲取配方列表中...
                        </>
                      ) : (
                        <>
                          <List className="w-4 h-4 mr-2" />
                          獲取配方列表
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* 回應區域 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {response ? (
                  response.success ? (
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
                查看 {activeTab === 'create' ? '創建配方' : '配方列表'} 請求的結果
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

              {/* 配方資料顯示 */}
              {response?.data && activeTab === 'list' && Array.isArray(response.data) && (
                <div className="space-y-3 mb-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <FlaskConical className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">配方列表 ({response.data.length} 筆)</span>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {response.data.map((formula: any, index: number) => (
                        <div key={index} className="p-2 bg-white rounded border text-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{formula.name}</div>
                              <div className="text-gray-600 text-xs">ID: {formula.id}</div>
                            </div>
                            <div className="text-right text-xs text-gray-500">
                              {formula.produce_date && <div>生產日期: {formula.produce_date}</div>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 創建成功顯示 */}
              {response?.data && activeTab === 'create' && response.success && (
                <div className="space-y-3 mb-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FlaskConical className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">配方創建成功</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ID:</span>
                        <span className="font-mono">{response.data.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">名稱:</span>
                        <span className="font-medium">{response.data.name}</span>
                      </div>
                      {response.data.produce_date && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">生產日期:</span>
                          <span>{response.data.produce_date}</span>
                        </div>
                      )}
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
                  點擊上方按鈕開始測試 Formula API
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
              <h4 className="font-medium text-gray-700 mb-2">1. 創建配方 (POST)</h4>
              <pre className="bg-gray-100 p-4 rounded text-sm font-mono overflow-x-auto">
{`curl --location 'https://tuco.onrender.com/api/order/formula' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \\
--data '{
  "id": "EP100-2",
  "name": "LLDPE貼合膜 德易封/醬包",
  "produce_date": "2023-03-21"
}'`}
              </pre>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">2. 獲取配方列表 (GET)</h4>
              <pre className="bg-gray-100 p-4 rounded text-sm font-mono overflow-x-auto">
{`curl --location 'https://tuco.onrender.com/api/order/formula' \\
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* API 使用說明 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Formula API 使用說明</CardTitle>
            <CardDescription>
              關於 Formula API 的重要信息
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
              <h4 className="font-medium text-red-800 mb-2">⚠️ API 端點狀態</h4>
              <p className="text-sm text-red-700">
                根據遠端服務器的 URL 配置，/api/order/formula 端點目前尚未實現。
                可用的端點包括：/api/user/user、/api/user/customer、/api/token 等。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Bearer Token 認證</h4>
                <p className="text-sm text-blue-700">
                  所有 Formula API 都需要在 Authorization header 中提供有效的 access token
                </p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">創建配方</h4>
                <p className="text-sm text-green-700">
                  使用 POST 方法創建新的配方資料，配方 ID 和名稱為必填欄位
                </p>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">獲取列表</h4>
                <p className="text-sm text-purple-700">
                  使用 GET 方法獲取所有配方資料的列表
                </p>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-2">資料格式</h4>
                <p className="text-sm text-orange-700">
                  支援配方 ID、名稱、生產日期等欄位
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
