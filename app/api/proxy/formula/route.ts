import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { accessToken, formulaData } = body
    
    if (!accessToken) {
      return NextResponse.json({
        success: false,
        error: 'Missing accessToken',
        status: 400
      }, { status: 400 })
    }
    
    console.log('Proxying create formula request to tuco.onrender.com:', formulaData)
    
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
    
    // 發送創建配方請求
    const formulaResponse = await fetch('https://tuco.onrender.com/api/order/formula', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'ERP-System-Client'
      },
      body: JSON.stringify(formulaData)
    })
    
    // 檢查回應內容類型
    const contentType = formulaResponse.headers.get('content-type')
    let data
    
    if (contentType && contentType.includes('application/json')) {
      try {
        data = await formulaResponse.json()
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError)
        data = { error: 'Invalid JSON response', raw: await formulaResponse.text() }
      }
    } else {
      // 如果不是 JSON，讀取為文字
      const textResponse = await formulaResponse.text()
      console.log('Non-JSON response:', textResponse.substring(0, 200))
      data = { 
        error: 'Non-JSON response', 
        contentType: contentType,
        raw: textResponse.substring(0, 500) // 只取前500字符避免過長
      }
    }
    
    console.log('Create formula response:', {
      status: formulaResponse.status,
      contentType: contentType,
      data: data
    })
    
    return NextResponse.json({
      success: formulaResponse.ok,
      status: formulaResponse.status,
      data: data,
      wakeUpStatus: wakeUpResponse.status,
      contentType: contentType
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

export async function GET(request: NextRequest) {
  try {
    // 從 URL 參數中獲取 accessToken
    const url = new URL(request.url)
    const accessToken = url.searchParams.get('accessToken')
    
    if (!accessToken) {
      return NextResponse.json({
        success: false,
        error: 'Missing accessToken parameter',
        status: 400
      }, { status: 400 })
    }
    
    console.log('Proxying get formulas request to tuco.onrender.com')
    
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
    
    // 發送獲取配方列表請求
    const formulasResponse = await fetch('https://tuco.onrender.com/api/order/formula', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'ERP-System-Client'
      }
    })
    
    // 檢查回應內容類型
    const contentType = formulasResponse.headers.get('content-type')
    let data
    
    if (contentType && contentType.includes('application/json')) {
      try {
        data = await formulasResponse.json()
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError)
        data = { error: 'Invalid JSON response', raw: await formulasResponse.text() }
      }
    } else {
      // 如果不是 JSON，讀取為文字
      const textResponse = await formulasResponse.text()
      console.log('Non-JSON response:', textResponse.substring(0, 200))
      data = { 
        error: 'Non-JSON response', 
        contentType: contentType,
        raw: textResponse.substring(0, 500) // 只取前500字符避免過長
      }
    }
    
    console.log('Get formulas response:', {
      status: formulasResponse.status,
      contentType: contentType,
      data: data
    })
    
    return NextResponse.json({
      success: formulasResponse.ok,
      status: formulasResponse.status,
      data: data,
      wakeUpStatus: wakeUpResponse.status,
      contentType: contentType
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
