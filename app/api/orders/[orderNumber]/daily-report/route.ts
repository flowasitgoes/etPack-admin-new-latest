import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const { orderNumber } = await params
    const url = new URL(request.url)
    const department = url.searchParams.get('department') || 'bagging'
    
    // 找到對應的 JSON 檔案
    const orderDataDir = path.join(process.cwd(), 'public', 'order-data')
    const files = fs.readdirSync(orderDataDir)
    const orderFiles = files.filter(file => file.startsWith('order-') && file.endsWith('.json'))
    
    let orderData = null
    let orderFile = null
    
    // 遍歷所有檔案找到對應的訂單
    for (const file of orderFiles) {
      const filePath = path.join(orderDataDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const data = JSON.parse(fileContent)
      
      if (data.orderNumber === orderNumber) {
        orderData = data
        orderFile = file
        break
      }
    }
    
    if (!orderData || !orderFile) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    
    // 返回指定部門的 dailyReport 數據
    const departmentDailyReport = orderData.dailyReport?.[department] || {}
    return NextResponse.json({
      orderNumber,
      department,
      dailyReport: departmentDailyReport
    })
  } catch (error) {
    console.error('Error reading daily report:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const { orderNumber } = await params
    const url = new URL(request.url)
    const department = url.searchParams.get('department') || 'bagging'
    const body = await request.json()
    const { machine, productionCount, lossCount, dispatchStatus, completedTime, isCompleted } = body
    
    // 找到對應的 JSON 檔案
    const orderDataDir = path.join(process.cwd(), 'public', 'order-data')
    const files = fs.readdirSync(orderDataDir)
    const orderFiles = files.filter(file => file.startsWith('order-') && file.endsWith('.json'))
    
    let orderData = null
    let orderFile = null
    
    // 遍歷所有檔案找到對應的訂單
    for (const file of orderFiles) {
      const filePath = path.join(orderDataDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const data = JSON.parse(fileContent)
      
      if (data.orderNumber === orderNumber) {
        orderData = data
        orderFile = file
        break
      }
    }
    
    if (!orderData || !orderFile) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    
    // 初始化 dailyReport 結構
    if (!orderData.dailyReport) {
      orderData.dailyReport = {}
    }
    
    // 初始化指定部門的 dailyReport 如果不存在
    if (!orderData.dailyReport[department]) {
      orderData.dailyReport[department] = {}
    }
    
    // 創建機器鍵值
    const machineKey = `${orderNumber}-${machine}`
    
    // 更新或創建機器記錄
    orderData.dailyReport[department][machineKey] = {
      machine,
      productionCount: productionCount || '1188 x 4', // 預設值
      lossCount: lossCount || '52', // 預設值
      dispatchStatus: dispatchStatus || '尚未派單',
      completedTime: completedTime || null,
      isCompleted: isCompleted || false
    }
    
    // 寫回檔案
    const filePath = path.join(orderDataDir, orderFile)
    fs.writeFileSync(filePath, JSON.stringify(orderData, null, 2))
    
    return NextResponse.json({
      success: true,
      department,
      machineKey,
      data: orderData.dailyReport[department][machineKey]
    })
  } catch (error) {
    console.error('Error updating daily report:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
