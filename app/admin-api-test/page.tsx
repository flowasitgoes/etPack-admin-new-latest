"use client"

import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { Loader2, CheckCircle, XCircle, User, Users, Key, Clock } from "lucide-react"

export default function AdminApiTestPage() {
  // 登入表單數據狀態：存儲用戶名和密碼
  const [loginData, setLoginData] = useState({
    username: "W64888",
    password: "test01"
  })
  
  // 認證相關狀態：存儲 access token（僅在記憶體中，安全考量）
  const [accessToken, setAccessToken] = useState("")
  // 用戶 ID 狀態：存儲當前登入用戶的 ID
  const [userId, setUserId] = useState("")
  // 登入狀態：追蹤用戶是否已登入
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // 刷新 token 狀態：用於自動刷新 access token
  const [refreshToken, setRefreshToken] = useState("")
  
  // API 回應數據狀態：存儲用戶資料 API 的回應
  const [userResponse, setUserResponse] = useState<any>(null)
  // API 回應數據狀態：存儲客戶資料 API 的回應
  const [customersResponse, setCustomersResponse] = useState<any>(null)
  // 載入狀態：追蹤登入請求是否正在進行
  const [isLoading, setIsLoading] = useState(false)
  // 載入狀態：追蹤用戶資料請求是否正在進行
  const [isLoadingUser, setIsLoadingUser] = useState(false)
  // 載入狀態：追蹤客戶資料請求是否正在進行
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false)
  // 錯誤訊息狀態：存儲和顯示錯誤訊息
  const [error, setError] = useState("")
  // 成功訊息狀態：存儲和顯示成功訊息
  const [success, setSuccess] = useState("")
  // 服務狀態：存儲 Render 服務的線上狀態和相關資訊
  const [serviceStatus, setServiceStatus] = useState<{
    isOnline: boolean
    responseTime?: number
    lastChecked?: string
    message: string
    rootStatus?: number
    status?: number
  } | null>(null)
  // 狀態檢查載入：追蹤服務狀態檢查是否正在進行
  const [isCheckingStatus, setIsCheckingStatus] = useState(false)

  // 處理登入表單輸入變化：更新用戶名或密碼
  const handleLoginInputChange = (field: string, value: string) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // 處理登入請求：發送登入資料並獲取 access token
  const handleLogin = async () => {
    setIsLoading(true)
    setError("")
    setSuccess("")
    setUserResponse(null)
    setCustomersResponse(null)
    setAccessToken("")
    setUserId("")

    try {
      const response = await fetch('/api/proxy/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      })

      const data = await response.json()

      if (data.success && data.data) {
        setAccessToken(data.data.access)
        setRefreshToken(data.data.refresh)
        setUserId(data.data.user_id)
        setIsLoggedIn(true)
        setSuccess("登入成功！已獲取 access token")
        
        // 安全地保存登入狀態到 localStorage（只存儲 refresh token），同步到其他視窗
        saveAuthState(data.data.access, data.data.refresh, data.data.user_id, true)
        
        // 自動獲取用戶資料
        await fetchUserData(data.data.access, data.data.user_id)
      } else {
        setError(`登入失敗: ${data.data?.message || data.error || '未知錯誤'}`)
      }
    } catch (err) {
      setError(`網路錯誤: ${err instanceof Error ? err.message : '未知錯誤'}`)
    } finally {
      setIsLoading(false)
    }
  }

  // 獲取用戶資料：使用 access token 調用用戶 API
  const fetchUserData = async (token?: string, user_id?: string) => {
    const currentToken = token || accessToken
    const currentUserId = user_id || userId
    
    if (!currentToken || !currentUserId) {
      setError("請先登入獲取 access token")
      return
    }

    setIsLoadingUser(true)
    setError("")

    try {
      const response = await fetch(`/api/proxy/user?userId=${currentUserId}&accessToken=${encodeURIComponent(currentToken)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json()
      setUserResponse(data)

      if (data.success && data.data) {
        setSuccess("用戶資料獲取成功！")
      } else {
        setError(`獲取用戶資料失敗: ${data.data?.message || data.error || '未知錯誤'}`)
      }
    } catch (err) {
      setError(`網路錯誤: ${err instanceof Error ? err.message : '未知錯誤'}`)
    } finally {
      setIsLoadingUser(false)
    }
  }

  // 獲取客戶資料：使用 access token 調用客戶 API
  const fetchCustomers = async () => {
    if (!accessToken) {
      setError("請先登入獲取 access token")
      return
    }

    setIsLoadingCustomers(true)
    setError("")

    try {
      const response = await fetch(`/api/proxy/customer?accessToken=${encodeURIComponent(accessToken)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json()
      setCustomersResponse(data)

      if (data.success && data.data) {
        setSuccess("客戶資料獲取成功！")
      } else {
        setError(`獲取客戶資料失敗: ${data.data?.message || data.error || '未知錯誤'}`)
      }
    } catch (err) {
      setError(`網路錯誤: ${err instanceof Error ? err.message : '未知錯誤'}`)
    } finally {
      setIsLoadingCustomers(false)
    }
  }

  // 處理登出：清除所有認證狀態和數據
  const handleLogout = () => {
    setAccessToken("")
    setRefreshToken("")
    setUserId("")
    setIsLoggedIn(false)
    setUserResponse(null)
    setCustomersResponse(null)
    setSuccess("已登出")
    setError("")
    
    // 清除登入狀態，同步到其他視窗
    clearAuthState()
  }

  // 檢查服務狀態：檢查 Render 服務是否在線
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

  // 安全的跨視窗狀態同步功能
  useEffect(() => {
    // 只從 localStorage 恢復 refresh token 和用戶 ID（不存儲 access token）
    const savedAuthData = localStorage.getItem('admin_auth_data')
    if (savedAuthData) {
      try {
        const { refreshToken: savedRefreshToken, userId: savedUserId, isLoggedIn: savedLoginState } = JSON.parse(savedAuthData)
        if (savedRefreshToken && savedUserId && savedLoginState) {
          setRefreshToken(savedRefreshToken)
          setUserId(savedUserId)
          setIsLoggedIn(true)
          
          // 使用 refresh token 獲取新的 access token
          refreshAccessToken(savedRefreshToken)
        }
      } catch (error) {
        console.error('Failed to parse saved auth data:', error)
      }
    }

    // 監聽其他視窗的狀態變化
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin_auth_data') {
        if (e.newValue) {
          try {
            const { refreshToken: newRefreshToken, userId: newUserId, isLoggedIn: newLoginState } = JSON.parse(e.newValue)
            setRefreshToken(newRefreshToken || "")
            setUserId(newUserId || "")
            setIsLoggedIn(newLoginState || false)
            
            // 如果其他視窗登出了，清除本地狀態
            if (!newLoginState) {
              setAccessToken("")
              setUserResponse(null)
              setCustomersResponse(null)
            } else if (newRefreshToken) {
              // 使用新的 refresh token 獲取 access token
              refreshAccessToken(newRefreshToken)
            }
          } catch (error) {
            console.error('Failed to parse storage change:', error)
          }
        } else {
          // 其他視窗清除了登入狀態
          setAccessToken("")
          setRefreshToken("")
          setUserId("")
          setIsLoggedIn(false)
          setUserResponse(null)
          setCustomersResponse(null)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // 使用 refresh token 獲取新的 access token：實現無縫 token 刷新
  const refreshAccessToken = async (refreshTokenValue: string) => {
    try {
      const response = await fetch('/api/proxy/token/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshTokenValue })
      })

      const data = await response.json()
      if (data.success && data.data) {
        setAccessToken(data.data.access)
        return true
      } else {
        console.error('Token refresh failed:', data.error)
        return false
      }
    } catch (error) {
      console.error('Token refresh error:', error)
      return false
    }
  }

  // 安全地保存登入狀態到 localStorage：只存儲 refresh token，同步到其他視窗
  const saveAuthState = (accessTokenValue: string, refreshTokenValue: string, user_id: string, loggedIn: boolean) => {
    const authData = {
      refreshToken: refreshTokenValue, // 只存儲 refresh token
      userId: user_id,
      isLoggedIn: loggedIn,
      timestamp: Date.now()
    }
    localStorage.setItem('admin_auth_data', JSON.stringify(authData))
    
    // 手動觸發 storage 事件（因為同一個視窗的 localStorage 變化不會觸發 storage 事件）
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'admin_auth_data',
      newValue: JSON.stringify(authData),
      oldValue: null,
      url: window.location.href,
      storageArea: localStorage,
    }))
  }

  // 清除登入狀態：從 localStorage 移除認證數據並同步到其他視窗
  const clearAuthState = () => {
    localStorage.removeItem('admin_auth_data')
    
    // 手動觸發 storage 事件
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'admin_auth_data',
      newValue: null,
      oldValue: null,
      url: window.location.href,
      storageArea: localStorage,
    }))
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">管理後台 API 測試頁面</h1>
          <p className="text-gray-600">整合認證、用戶和客戶 API</p>
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

        {/* 成功/錯誤訊息 */}
        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <XCircle className="w-4 h-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 登入區域 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                登入
              </CardTitle>
              <CardDescription>
                登入並獲取 access token
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">用戶名</Label>
                  <Input
                    id="username"
                    value={loginData.username}
                    onChange={(e) => handleLoginInputChange('username', e.target.value)}
                    placeholder="W64888"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">密碼</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => handleLoginInputChange('password', e.target.value)}
                    placeholder="test01"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleLogin}
                  disabled={isLoading || isCheckingStatus}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      登入中...
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4 mr-2" />
                      登入
                    </>
                  )}
                </Button>
              </div>

              {/* 登入狀態顯示 */}
              {isLoggedIn && (
                <div className="mt-4 space-y-3">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">已登入</span>
                    </div>
                    <div className="text-sm text-green-700">
                      用戶 ID: {userId}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Key className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Access Token</span>
                    </div>
                    <div className="text-xs font-mono bg-white p-2 rounded border break-all">
                      {accessToken}
                    </div>
                  </div>

                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    className="w-full"
                    size="sm"
                  >
                    登出
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 用戶資料區域 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                用戶資料
              </CardTitle>
              <CardDescription>
                獲取當前用戶的詳細資料
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => fetchUserData()}
                disabled={isLoadingUser || !isLoggedIn}
                className="w-full"
                variant="outline"
              >
                {isLoadingUser ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    獲取中...
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 mr-2" />
                    顯示用戶資料
                  </>
                )}
              </Button>

              {/* 用戶資料顯示 */}
              {userResponse?.success && userResponse?.data && (
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><strong>ID:</strong> {userResponse.data.id}</div>
                      <div><strong>用戶名:</strong> {userResponse.data.username}</div>
                      <div><strong>姓名:</strong> {userResponse.data.last_name} {userResponse.data.first_name}</div>
                      <div><strong>部門:</strong> {userResponse.data.department}</div>
                      <div><strong>職稱:</strong> {userResponse.data.title}</div>
                      <div><strong>身份:</strong> {userResponse.data.identity}</div>
                      <div><strong>狀態:</strong> {userResponse.data.is_active ? '啟用' : '禁用'}</div>
                      <div><strong>加入日期:</strong> {new Date(userResponse.data.date_joined).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 客戶資料區域 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                客戶資料
              </CardTitle>
              <CardDescription>
                獲取所有客戶列表
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={fetchCustomers}
                disabled={isLoadingCustomers || !isLoggedIn}
                className="w-full"
                variant="outline"
              >
                {isLoadingCustomers ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    獲取中...
                  </>
                ) : (
                  <>
                    <Users className="w-4 h-4 mr-2" />
                    顯示客戶資料
                  </>
                )}
              </Button>

              {/* 客戶資料顯示 */}
              {customersResponse?.success && customersResponse?.data && (
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="text-sm font-medium text-purple-800 mb-2">
                      客戶列表 ({customersResponse.data.length} 筆)
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {customersResponse.data.map((customer: any, index: number) => (
                        <div key={customer.id || index} className="p-2 bg-white rounded border mb-2 text-xs">
                          <div className="grid grid-cols-2 gap-1">
                            <div><strong>ID:</strong> {customer.id}</div>
                            <div><strong>名稱:</strong> {customer.name}</div>
                            <div><strong>地址:</strong> {customer.address}</div>
                            <div><strong>聯絡人:</strong> {customer.liaison}</div>
                            <div><strong>電話:</strong> {customer.phone}</div>
                            <div><strong>職稱:</strong> {customer.title}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* API 回應區域 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                API 回應
              </CardTitle>
              <CardDescription>
                查看 API 請求的完整回應
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* 用戶 API 回應 */}
              {userResponse && (
                <div className="mb-4">
                  <Label className="text-sm font-medium text-gray-700">用戶 API 回應</Label>
                  <pre className="mt-1 p-3 bg-gray-100 rounded text-sm font-mono overflow-auto max-h-32">
                    {JSON.stringify(userResponse, null, 2)}
                  </pre>
                </div>
              )}

              {/* 客戶 API 回應 */}
              {customersResponse && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">客戶 API 回應</Label>
                  <pre className="mt-1 p-3 bg-gray-100 rounded text-sm font-mono overflow-auto max-h-32">
                    {JSON.stringify(customersResponse, null, 2)}
                  </pre>
                </div>
              )}

              {!userResponse && !customersResponse && (
                <div className="text-center text-gray-500 py-8">
                  登入後開始測試 API
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 使用說明 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>使用說明</CardTitle>
            <CardDescription>
              管理後台 API 測試功能說明
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">1. 登入</h4>
                <p className="text-sm text-blue-700">
                  使用有效的用戶名和密碼登入，系統會自動獲取 access token
                </p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">2. 用戶資料</h4>
                <p className="text-sm text-green-700">
                  登入成功後自動獲取當前用戶的詳細資料
                </p>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">3. 客戶資料</h4>
                <p className="text-sm text-purple-700">
                  使用 access token 獲取所有客戶列表資料
                </p>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-2">4. 跨視窗同步</h4>
                <p className="text-sm text-orange-700">
                  在一個標籤頁登入後，其他標籤頁會自動同步登入狀態
                </p>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">🔄 跨視窗狀態同步功能</h4>
              <p className="text-sm text-yellow-700 mb-2">
                此功能使用 <code className="bg-yellow-100 px-1 rounded">localStorage + storage 事件</code> 實現：
              </p>
              <ul className="text-sm text-yellow-700 space-y-1 ml-4">
                <li>• 在一個標籤頁登入後，其他標籤頁會立即同步登入狀態</li>
                <li>• 在一個標籤頁登出後，其他標籤頁也會自動登出</li>
                <li>• 重新打開瀏覽器後，登入狀態會自動恢復</li>
                <li>• 支援多個標籤頁同時使用，狀態完全同步</li>
              </ul>
            </div>
            
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-medium text-red-800 mb-2">🔒 安全性最佳實踐</h4>
              <p className="text-sm text-red-700 mb-2">
                此實現遵循前端安全最佳實踐：
              </p>
              <ul className="text-sm text-red-700 space-y-1 ml-4">
                <li>• <strong>Access Token 僅存儲在記憶體中</strong>：避免 XSS 攻擊持久化</li>
                <li>• <strong>Refresh Token 存儲在 localStorage</strong>：用於自動刷新 access token</li>
                <li>• <strong>頁面刷新時自動刷新 token</strong>：確保無縫用戶體驗</li>
                <li>• <strong>避免 CSRF 風險</strong>：不使用 Cookie 存儲敏感 token</li>
                <li>• <strong>短期生命週期</strong>：access token 在標籤頁關閉時自動清除</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}