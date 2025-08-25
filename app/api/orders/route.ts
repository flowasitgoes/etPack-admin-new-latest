import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()
    
    // 確保 order-data 資料夾存在
    const orderDataDir = path.join(process.cwd(), 'order-data')
    if (!fs.existsSync(orderDataDir)) {
      fs.mkdirSync(orderDataDir, { recursive: true })
    }
    
    // 生成檔案名稱
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const fileName = `order-${timestamp}.json`
    const filePath = path.join(orderDataDir, fileName)
    
    // 寫入 JSON 檔案
    fs.writeFileSync(filePath, JSON.stringify(orderData, null, 2), 'utf8')
    
    return NextResponse.json({ 
      success: true, 
      message: '訂單數據已成功儲存',
      fileName: fileName,
      filePath: filePath
    })
    
  } catch (error) {
    console.error('儲存訂單數據時發生錯誤:', error)
    return NextResponse.json(
      { success: false, message: '儲存訂單數據時發生錯誤' },
      { status: 500 }
    )
  }
}
