import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Proxying refresh token request to tuco.onrender.com:', body)
    
    // 先嘗試喚醒 Render 服務
    const wakeUpResponse = await fetch('https://tuco.onrender.com/', {
      method: 'GET',
      headers: {
        'User-Agent': 'ERP-System-WakeUp'
      }
    })
    
    console.log('Wake up response status:', wakeUpResponse.status)
    
    // 等待一下讓服務完全啟動
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 發送 refresh token 請求
    const refreshResponse = await fetch('https://tuco.onrender.com/api/token/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'ERP-System-Client'
      },
      body: JSON.stringify(body)
    })
    
    const data = await refreshResponse.json()
    
    console.log('Refresh token response:', {
      status: refreshResponse.status,
      data: data
    })
    
    return NextResponse.json({
      success: refreshResponse.ok,
      status: refreshResponse.status,
      data: data,
      wakeUpStatus: wakeUpResponse.status
    })
    
  } catch (error) {
    console.error('Proxy error:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 500
    }, { status: 500 })
  }
}
