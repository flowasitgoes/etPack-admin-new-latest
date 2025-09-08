"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Package, Factory } from "lucide-react"
import PrintingStandaloneSidebar from "../../components/printing-standalone-sidebar"
import "../../../styles/admin-colors.css"
import "../../../styles/admin.css"

interface OrderData {
  orderNumber: string
  orderInfo: {
    productName: string
    orderQuantity: string
    orderUnit1: string
    orderQuantity2: string
    orderUnit2: string
    deliveryDate: string
  }
}

export default function DailyReportPage() {
  const [orders, setOrders] = useState<OrderData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadOrders = async () => {
      try {
        // 讀取所有訂單文件
        const orderFiles = [
          'order-2025-08-25T03-21-15-107Z.json',
          'order-2025-08-25T03-46-26-510Z.json',
          'order-2025-08-25T03-50-34-996Z.json',
          'order-2025-08-25T06-30-31-139Z.json',
          'order-2025-08-25T10-31-36-066Z.json',
          'order-2025-08-25T10-44-43-803Z.json'
        ]

        const orderPromises = orderFiles.map(async (filename) => {
          const response = await fetch(`/order-data/${filename}`)
          if (!response.ok) {
            throw new Error(`Failed to load ${filename}`)
          }
          return response.json()
        })

        const orderData = await Promise.all(orderPromises)
        setOrders(orderData)
      } catch (error) {
        console.error('Error loading orders:', error)
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  const formatQuantity = (order: OrderData) => {
    const { orderQuantity, orderUnit1, orderQuantity2, orderUnit2 } = order.orderInfo
    if (orderQuantity2 && orderUnit2) {
      return `${orderQuantity}${orderUnit1}/${orderQuantity2}${orderUnit2}`
    }
    return `${orderQuantity}${orderUnit1}`
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-container min-h-screen bg-gradient-to-br p-4">
      <div className="max-w-[1600px] mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex h-screen">
          {/* Left Sidebar */}
          <PrintingStandaloneSidebar />

          {/* Main Content */}
          <div className="middle-col-section flex-1 flex transition-all duration-300 ease-in-out overflow-hidden">
            <div className="flex-1 transition-opacity duration-150 ease-in-out overflow-y-auto">
              <div className="bagging-container space-y-6 p-6">
                {/* 頁面標題 */}
                <div className="flex justify-between items-center text-white p-4" style={{ background: 'rgb(136, 183, 204)' }}>
                  <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-bold">印刷課</h1>
                    <span className="text-lg">生產/檢驗日報表</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm">
                      {new Date().toLocaleString('zh-TW', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>

                {/* 說明文字 */}
                <div className="bg-white rounded-lg shadow-md">
                  <div className="text-white p-3 rounded-tr-lg rounded-br-lg w-[200px]" style={{ background: '#7c7d99' }}>
                    <h2 className="text-base font-semibold leading-tight">待生產訂製單列表</h2>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-4">
                      點選 <span className="text-red-500 font-semibold">訂單編號</span> 進入生產/檢驗日報表填寫作業
                    </p>
                    
                    <div className="relative w-full overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-100 border-b">
                            <TableHead className="font-semibold text-gray-700 py-3 px-4">訂單編號</TableHead>
                            <TableHead className="font-semibold text-gray-700 py-3 px-4">產品名稱</TableHead>
                            <TableHead className="font-semibold text-gray-700 py-3 px-4">訂製數量</TableHead>
                            <TableHead className="font-semibold text-gray-700 py-3 px-4">交貨日期</TableHead>
                            <TableHead className="font-semibold text-gray-700 py-3 px-4">生產機台</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((order, index) => (
                            <TableRow key={order.orderNumber} className="border-b hover:bg-gray-50">
                              <TableCell className="py-3 px-4">
                                <a 
                                  href={`#${order.orderNumber}`}
                                  className="text-purple-600 hover:text-purple-800 font-medium hover:underline transition-colors cursor-pointer"
                                >
                                  {order.orderNumber}
                                </a>
                              </TableCell>
                              <TableCell className="font-medium text-gray-800 py-3 px-4">
                                {order.orderInfo.productName}
                              </TableCell>
                              <TableCell className="py-3 px-4">
                                <span className="text-blue-600 font-medium">
                                  {formatQuantity(order)}
                                </span>
                              </TableCell>
                              <TableCell className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-gray-500" />
                                  <span className="text-gray-700">{order.orderInfo.deliveryDate}</span>
                                </div>
                              </TableCell>
                              <TableCell className="py-3 px-4">
                                <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 0.5fr))' }}>
                                  {[1, 2, 3, 4, 5, 6, 7, 8].map((machine) => {
                                    // 根據訂單編號決定哪些機台要亮起來
                                    let isActive = false;
                                    if (order.orderNumber === 'K01140414001') {
                                      isActive = machine === 1 || machine === 2;
                                    } else if (order.orderNumber === 'K01140414002') {
                                      isActive = machine === 1 || machine === 2 || machine === 3;
                                    } else if (order.orderNumber === 'K01140414003') {
                                      isActive = machine === 1;
                                    } else if (order.orderNumber === 'K01140414004') {
                                      isActive = machine === 1 || machine === 3 || machine === 6;
                                    } else if (order.orderNumber === 'K01140414005') {
                                      isActive = machine === 1 || machine === 4;
                                    } else if (order.orderNumber === 'K01140414006') {
                                      isActive = machine === 1;
                                    }
                                    
                                    return (
                                      <button
                                        key={machine}
                                        className={`w-8 h-8 border-2 border-green-500 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-300 cursor-default ${
                                          isActive 
                                            ? 'bg-green-500 text-white' 
                                            : 'text-green-600'
                                        }`}
                                      >
                                        {machine}
                                      </button>
                                    );
                                  })}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}