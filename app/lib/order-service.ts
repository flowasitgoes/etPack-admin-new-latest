import fs from 'fs'
import path from 'path'

export interface OrderData {
  orderNumber: string
  date: string
  orderInfo: {
    customerName: string
    customerCode: string
    productCode: string
    productName: string
    orderQuantity: string
    orderUnit1: string
    orderQuantity2: string
    orderUnit2: string
    deliveryDate: string
    formulaNumber: string
    sampleFile: string
  }
  bagging: any[]
  printing: any[]
  lamination: any[]
  slitting: any[]
  cutting: any[]
  submittedAt: string
  status: string
}

export interface ScheduleItem {
  orderNumber: string
  recorder: string
  deliveryDate: string
  customerName: string
  productInfo: string
}

export async function getAllOrders(): Promise<OrderData[]> {
  try {
    const orderDataPath = path.join(process.cwd(), 'order-data')
    const files = fs.readdirSync(orderDataPath)
    
    const orderFiles = files.filter(file => 
      file.startsWith('order-') && file.endsWith('.json')
    )
    
    const orders: OrderData[] = []
    
    for (const file of orderFiles) {
      try {
        const filePath = path.join(orderDataPath, file)
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const orderData = JSON.parse(fileContent) as OrderData
        orders.push(orderData)
      } catch (error) {
        console.error(`Error reading order file ${file}:`, error)
      }
    }
    
    // 按訂單編號排序，01-05順序
    return orders.sort((a, b) => {
      // 提取訂單編號中的數字部分進行排序
      const aNumber = parseInt(a.orderNumber.match(/\d+$/)?.[0] || '0')
      const bNumber = parseInt(b.orderNumber.match(/\d+$/)?.[0] || '0')
      return aNumber - bNumber
    })
  } catch (error) {
    console.error('Error reading order data:', error)
    return []
  }
}

export async function getScheduleData(): Promise<ScheduleItem[]> {
  const orders = await getAllOrders()
  
  return orders.map(order => ({
    orderNumber: order.orderNumber,
    recorder: order.orderInfo.customerCode || 'N/A',
    deliveryDate: order.orderInfo.deliveryDate || 'N/A',
    customerName: order.orderInfo.customerName || 'N/A',
    productInfo: `${order.orderInfo.productCode} - ${order.orderInfo.productName}` || 'N/A'
  }))
}
