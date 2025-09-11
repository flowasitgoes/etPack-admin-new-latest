import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const orderDataDir = path.join(process.cwd(), 'public', 'order-data')
    const files = fs.readdirSync(orderDataDir)
    const orderFiles = files.filter(file => file.startsWith('order-') && file.endsWith('.json'))
    
    const allDailyReports: any = {}
    
    // 讀取所有訂單文件的 dailyReport 數據
    for (const file of orderFiles) {
      const filePath = path.join(orderDataDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const orderData = JSON.parse(fileContent)
      
      if (orderData.dailyReport) {
        // 將 dailyReport 數據合併到總對象中
        Object.entries(orderData.dailyReport).forEach(([department, departmentData]) => {
          if (!allDailyReports[department]) {
            allDailyReports[department] = {}
          }
          Object.assign(allDailyReports[department], departmentData)
        })
      }
    }
    
    return NextResponse.json({
      success: true,
      dailyReports: allDailyReports
    })
  } catch (error) {
    console.error('Error reading daily reports:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
