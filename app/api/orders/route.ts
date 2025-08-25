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

export async function GET() {
  try {
    const orderDataDir = path.join(process.cwd(), 'order-data')
    if (!fs.existsSync(orderDataDir)) {
      return NextResponse.json({ orders: [] })
    }

    const files = fs.readdirSync(orderDataDir)
    const jsonFiles = files.filter(file => file.endsWith('.json'))
    
    const orders = []
    
    for (const file of jsonFiles) {
      try {
        const filePath = path.join(orderDataDir, file)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const orderData = JSON.parse(fileContent)
        
        // 驗證機制：只有當 bagging 陣列有內容時才讀取該檔案的資料
        // 這表示該訂單已經經過抽袋課類別的處理
        if (!orderData.bagging || !Array.isArray(orderData.bagging) || orderData.bagging.length === 0) {
          console.log(`跳過檔案 ${file}：bagging 陣列為空或不存在，表示該訂單尚未經過抽袋課類別處理`)
          continue
        }
        
        // 提取需要的資料
        const orderQuantity1 = orderData.orderInfo?.orderQuantity || ''
        const orderUnit1 = orderData.orderInfo?.orderUnit1 || ''
        const orderQuantity2 = orderData.orderInfo?.orderQuantity2 || ''
        const orderUnit2 = orderData.orderInfo?.orderUnit2 || ''
        
        // 組合訂製數量
        let orderQuantity = ''
        if (orderQuantity1 && orderUnit1) {
          orderQuantity = orderQuantity1 + orderUnit1
          if (orderQuantity2 && orderUnit2) {
            orderQuantity += '/' + orderQuantity2 + orderUnit2
          }
        }
        
        const orderInfo = {
          orderNumber: orderData.orderNumber || '',
          productName: orderData.orderInfo?.productName || '',
          orderQuantity: orderQuantity,
          deliveryDate: orderData.orderInfo?.deliveryDate || ''
        }
        
        orders.push(orderInfo)
      } catch (error) {
        console.error(`讀取檔案 ${file} 時發生錯誤:`, error)
      }
    }
    
    return NextResponse.json({ orders })
  } catch (error) {
    console.error('讀取訂單數據時發生錯誤:', error)
    return NextResponse.json(
      { success: false, message: '讀取訂單數據時發生錯誤' },
      { status: 500 }
    )
  }
}
