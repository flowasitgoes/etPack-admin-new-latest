import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { orderNumber: string } }
) {
  try {
    const { orderNumber } = params
    
    if (!orderNumber) {
      return NextResponse.json(
        { success: false, message: '訂單編號不能為空' },
        { status: 400 }
      )
    }

    const orderDataDir = path.join(process.cwd(), 'order-data')
    if (!fs.existsSync(orderDataDir)) {
      return NextResponse.json(
        { success: false, message: '訂單資料夾不存在' },
        { status: 404 }
      )
    }

    const files = fs.readdirSync(orderDataDir)
    const jsonFiles = files.filter(file => file.endsWith('.json'))
    
    // 搜尋包含指定訂單編號的檔案
    let targetFile = null
    let orderData = null
    
    for (const file of jsonFiles) {
      try {
        const filePath = path.join(orderDataDir, file)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const data = JSON.parse(fileContent)
        
        // 檢查是否為目標訂單
        if (data.orderNumber === orderNumber) {
          // 驗證機制：只有當 bagging 陣列有內容時才返回資料
          if (data.bagging && Array.isArray(data.bagging) && data.bagging.length > 0) {
            targetFile = file
            orderData = data
            break
          } else {
            console.log(`跳過檔案 ${file}：bagging 陣列為空或不存在`)
          }
        }
      } catch (error) {
        console.error(`讀取檔案 ${file} 時發生錯誤:`, error)
      }
    }
    
    if (!targetFile || !orderData) {
      return NextResponse.json(
        { success: false, message: `找不到訂單編號: ${orderNumber}` },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: '成功讀取訂單資料',
      fileName: targetFile,
      orderData: orderData
    })
    
  } catch (error) {
    console.error('讀取訂單資料時發生錯誤:', error)
    return NextResponse.json(
      { success: false, message: '讀取訂單資料時發生錯誤' },
      { status: 500 }
    )
  }
}
