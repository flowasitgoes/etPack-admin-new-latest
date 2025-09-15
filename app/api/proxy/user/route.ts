import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    const accessToken = url.searchParams.get('accessToken')
    
    if (!accessToken || !userId) {
      return NextResponse.json({
        success: false,
        error: 'Missing accessToken or userId parameter',
        status: 400
      }, { status: 400 })
    }
    
    console.log('Proxying user request to tuco.onrender.com:', { userId })
    
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
    
    // 發送 user 請求
    const userResponse = await fetch(`https://tuco.onrender.com/api/user/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'ERP-System-Client'
      }
    })
    
    const data = await userResponse.json()
    
    console.log('User response:', {
      status: userResponse.status,
      data: data
    })
    
    return NextResponse.json({
      success: userResponse.ok,
      status: userResponse.status,
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { accessToken, userId } = body
    
    if (!accessToken || !userId) {
      return NextResponse.json({
        success: false,
        error: 'Missing accessToken or userId',
        status: 400
      }, { status: 400 })
    }
    
    console.log('Proxying user request to tuco.onrender.com:', { userId })
    
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
    
    // 發送 user 請求
    const userResponse = await fetch(`https://tuco.onrender.com/api/user/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'ERP-System-Client'
      }
    })
    
    const data = await userResponse.json()
    
    console.log('User response:', {
      status: userResponse.status,
      data: data
    })
    
    return NextResponse.json({
      success: userResponse.ok,
      status: userResponse.status,
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
