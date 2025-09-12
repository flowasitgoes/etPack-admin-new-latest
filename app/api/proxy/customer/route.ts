import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { accessToken, customerData } = body
    
    if (!accessToken) {
      return NextResponse.json({
        success: false,
        error: 'Missing accessToken',
        status: 400
      }, { status: 400 })
    }
    
    console.log('Proxying create customer request to tuco.onrender.com:', customerData)
    
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
    
    // 發送創建客戶請求
    const customerResponse = await fetch('https://tuco.onrender.com/api/user/customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'ERP-System-Client'
      },
      body: JSON.stringify(customerData)
    })
    
    // 檢查回應內容類型
    const contentType = customerResponse.headers.get('content-type')
    let data
    
    if (contentType && contentType.includes('application/json')) {
      try {
        data = await customerResponse.json()
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError)
        data = { error: 'Invalid JSON response', raw: await customerResponse.text() }
      }
    } else {
      // 如果不是 JSON，讀取為文字
      const textResponse = await customerResponse.text()
      console.log('Non-JSON response:', textResponse.substring(0, 200))
      data = { 
        error: 'Non-JSON response', 
        contentType: contentType,
        raw: textResponse.substring(0, 500) // 只取前500字符避免過長
      }
    }
    
    console.log('Create customer response:', {
      status: customerResponse.status,
      contentType: contentType,
      data: data
    })
    
    return NextResponse.json({
      success: customerResponse.ok,
      status: customerResponse.status,
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
    
    console.log('Proxying get customers request to tuco.onrender.com')
    
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
    
    // 發送獲取客戶列表請求
    const customersResponse = await fetch('https://tuco.onrender.com/api/user/customer', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'ERP-System-Client'
      }
    })
    
    // 檢查回應內容類型
    const contentType = customersResponse.headers.get('content-type')
    let data
    
    if (contentType && contentType.includes('application/json')) {
      try {
        data = await customersResponse.json()
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError)
        data = { error: 'Invalid JSON response', raw: await customersResponse.text() }
      }
    } else {
      // 如果不是 JSON，讀取為文字
      const textResponse = await customersResponse.text()
      console.log('Non-JSON response:', textResponse.substring(0, 200))
      data = { 
        error: 'Non-JSON response', 
        contentType: contentType,
        raw: textResponse.substring(0, 500) // 只取前500字符避免過長
      }
    }
    
    console.log('Get customers response:', {
      status: customersResponse.status,
      contentType: contentType,
      data: data
    })
    
    return NextResponse.json({
      success: customersResponse.ok,
      status: customersResponse.status,
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
