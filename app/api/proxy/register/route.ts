import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Proxying request to tuco.onrender.com:', body)
    
    // 先嘗試喚醒 Render 服務
    const wakeUpResponse = await fetch('https://tuco.onrender.com/', {
      method: 'GET',
      headers: {
        'User-Agent': 'ERP-System-WakeUp'
      }
    })
    
    console.log('Wake up response status:', wakeUpResponse.status)
    
    // 如果只是喚醒請求，直接返回
    if (body.wakeUpOnly) {
      return NextResponse.json({
        success: wakeUpResponse.ok,
        wakeUpStatus: wakeUpResponse.status,
        message: 'Wake up completed'
      })
    }
    
    // 等待一下讓服務完全啟動
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 發送註冊請求
    const registerResponse = await fetch('https://tuco.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'ERP-System-Client'
      },
      body: JSON.stringify(body)
    })
    
    const data = await registerResponse.json()
    
    console.log('Register response:', {
      status: registerResponse.status,
      data: data
    })
    
    return NextResponse.json({
      success: registerResponse.ok,
      status: registerResponse.status,
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
