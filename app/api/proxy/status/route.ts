import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Checking Render service status...')
    
    const startTime = Date.now()
    
    // 嘗試訪問 Render 服務的根路徑
    const rootResponse = await fetch('https://tuco.onrender.com/', {
      method: 'GET',
      headers: {
        'User-Agent': 'ERP-System-StatusCheck'
      },
      // 設置較短的超時時間來快速檢測
      signal: AbortSignal.timeout(5000)
    })
    
    // 同時測試 API 端點是否可用
    const apiResponse = await fetch('https://tuco.onrender.com/register', {
      method: 'OPTIONS', // 使用 OPTIONS 來檢查端點是否存在
      headers: {
        'User-Agent': 'ERP-System-StatusCheck'
      },
      signal: AbortSignal.timeout(5000)
    })
    
    // 使用 API 端點的回應作為主要狀態指標
    const response = apiResponse
    
    const endTime = Date.now()
    const responseTime = endTime - startTime
    
    console.log('Render service status check:', {
      rootStatus: rootResponse.status,
      apiStatus: response.status,
      responseTime: responseTime,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries())
    })
    
    // 如果基本檢查通過，再測試註冊端點
    let registerTestResult = null
    if (response.ok) {
      try {
        const registerTestResponse = await fetch('https://tuco.onrender.com/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'ERP-System-StatusCheck'
          },
          body: JSON.stringify({
            username: 'test_status_check',
            password: 'test123',
            identity: 'T',
            first_name: 'Test',
            last_name: 'User',
            department: 'Test',
            title: 'Tester'
          }),
          signal: AbortSignal.timeout(10000)
        })
        
        registerTestResult = {
          status: registerTestResponse.status,
          ok: registerTestResponse.ok,
          message: registerTestResponse.ok ? '註冊端點正常' : '註冊端點異常'
        }
      } catch (error) {
        registerTestResult = {
          error: error instanceof Error ? error.message : 'Unknown error',
          message: '註冊端點測試失敗'
        }
      }
    }

    return NextResponse.json({
      success: true,
      isOnline: response.ok,
      status: response.status,
      rootStatus: rootResponse.status,
      responseTime: responseTime,
      timestamp: new Date().toISOString(),
      message: response.ok ? 'API 端點正常運行' : 'API 端點回應異常',
      registerTest: registerTestResult
    })
    
  } catch (error) {
    console.error('Render service status check failed:', error)
    
    const isTimeout = error instanceof Error && error.name === 'AbortError'
    const isNetworkError = error instanceof Error && error.message.includes('fetch')
    
    return NextResponse.json({
      success: false,
      isOnline: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      errorType: isTimeout ? 'timeout' : isNetworkError ? 'network' : 'unknown',
      timestamp: new Date().toISOString(),
      message: isTimeout ? '服務回應超時（可能正在休眠）' : '無法連接到服務'
    })
  }
}
