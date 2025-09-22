"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Package, Factory } from "lucide-react"
import BaggingOrderList from "../../components/bagging-order-list"
import BaggingStandaloneSidebar from "../../components/bagging-standalone-sidebar"
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

interface CompletedOrderInfo {
  orderNumber: string
  machineNumber: string
  productName: string
  productionCount: string
  lossCount: string
  completedTime: string
  department: string
}

export default function OrderRecordPage() {
  const [currentDateTime] = useState(() => {
    const now = new Date()
    const year = now.getFullYear() - 1911 // 民國年
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${year}/${month}/${day} ${hours}:${minutes}`
  })

  const [pageOpacity, setPageOpacity] = useState(0)
  const [orders, setOrders] = useState<OrderData[]>([])
  const [loading, setLoading] = useState(true)
  const [completedMachines, setCompletedMachines] = useState<Set<string>>(new Set())
  const [completedOrders, setCompletedOrders] = useState<CompletedOrderInfo[]>([])
  const [dailyReports, setDailyReports] = useState<{[key: string]: any}>({})

  useEffect(() => {
    // 組件掛載後開始淡入
    setTimeout(() => setPageOpacity(1), 50)
  }, [])

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
        
        // 載入訂單完成後，載入已完成訂單資訊
        loadCompletedOrders()
      } catch (error) {
        console.error('Error loading orders:', error)
      } finally {
        setLoading(false)
      }
    }

    loadOrders()

    // 載入已完成的訂單資訊
    const loadCompletedOrders = async () => {
      try {
        const response = await fetch('/api/orders/daily-reports')
        if (response.ok) {
          const data = await response.json()
          const dailyReports = data.dailyReports || {}
          
          // 分離已完成的機台
          const completedMachinesList: string[] = []
          const completedOrdersList: CompletedOrderInfo[] = []
          
          // 遍歷所有部門的 dailyReport
          Object.entries(dailyReports).forEach(([department, departmentReports]: [string, any]) => {
            if (typeof departmentReports === 'object' && departmentReports !== null) {
              Object.entries(departmentReports).forEach(([machineKey, reportData]: [string, any]) => {
                if (reportData.isCompleted) {
                  completedMachinesList.push(machineKey)
                  
                  const [orderNumber, machineNumber] = machineKey.split('-')
                  
                  // 嘗試從已載入的 orders 中獲取產品名稱
                  let productName = '載入中...'
                  if (orders.length > 0) {
                    const foundOrder = orders.find(o => o.orderNumber === orderNumber)
                    if (foundOrder) {
                      productName = foundOrder.orderInfo.productName
                    }
                  }
                  
                  completedOrdersList.push({
                    orderNumber,
                    machineNumber,
                    productName,
                    productionCount: reportData.productionCount || '1188 x 4',
                    lossCount: reportData.lossCount || '52',
                    completedTime: reportData.completedTime || '未知時間',
                    department: department === 'bagging' ? '抽袋課' : department
                  })
                }
              })
            }
          })
          
          setCompletedMachines(new Set(completedMachinesList))
          setCompletedOrders(completedOrdersList)
          setDailyReports(dailyReports)
        }
      } catch (error) {
        console.error('Error loading daily reports:', error)
      }
    }
  }, [])

  // 當orders載入完成後，更新已完成訂單的產品名稱
  useEffect(() => {
    if (orders.length > 0 && completedOrders.length > 0) {
      // 檢查是否還有「載入中...」的項目
      const hasLoadingItems = completedOrders.some(order => order.productName === '載入中...')
      if (hasLoadingItems) {
        setCompletedOrders(prev => prev.map(order => {
          const foundOrder = orders.find(o => o.orderNumber === order.orderNumber)
          return {
            ...order,
            productName: foundOrder ? foundOrder.orderInfo.productName : order.productName
          }
        }))
      }
    }
  }, [orders, completedOrders])

  return (
    <div className="admin-container min-h-screen bg-gradient-to-br p-4">
      <div className="max-w-[1600px] mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex h-screen">
          {/* Left Sidebar */}
          <BaggingStandaloneSidebar />

          {/* Main Content */}
          <div className="middle-col-section flex-1 flex transition-all duration-300 ease-in-out overflow-hidden">
            <div 
              className="flex-1 transition-opacity duration-150 ease-in-out overflow-y-auto"
              style={{ 
                opacity: pageOpacity,
              }}
            >
              <div className="order-record-container space-y-6 transition-all duration-300 ease-in-out p-6">
                {/* Header */}
                <div className="flex justify-between items-center text-white p-4" style={{ background: 'rgb(209 138 173)' }}>
                  <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-bold">抽袋課</h1>
                    <span className="text-lg">訂製單記錄</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm">{currentDateTime}</span>
                  </div>
                </div>

                {/* 佈告欄 - 已完成訂單資訊 */}
                {completedOrders.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md">
                    <div className="text-white p-3 rounded-tr-lg rounded-br-lg w-[200px]" style={{ background: '#7c7d99' }}>
                      <h2 className="text-base font-semibold leading-tight">已完成訂單佈告欄</h2>
                    </div>
                    <div className="p-4">
                      <div className="relative w-full overflow-auto">
                        <Table>
                          <TableHeader>
                             <TableRow className="bg-green-100 border-b">
                               <TableHead className="font-semibold text-gray-700 py-3 px-4">訂單編號</TableHead>
                               <TableHead className="font-semibold text-gray-700 py-3 px-4">機台</TableHead>
                               <TableHead className="font-semibold text-gray-700 py-3 px-4">品名</TableHead>
                               <TableHead className="font-semibold text-gray-700 py-3 px-4">生產數量</TableHead>
                               <TableHead className="font-semibold text-gray-700 py-3 px-4">耗損總量</TableHead>
                               <TableHead className="font-semibold text-gray-700 py-3 px-4">簽核單位</TableHead>
                               <TableHead className="font-semibold text-gray-700 py-3 px-4">派單與否</TableHead>
                               <TableHead className="font-semibold text-gray-700 py-3 px-4">完成時間</TableHead>
                             </TableRow>
                          </TableHeader>
                          <TableBody>
                            {completedOrders.map((order, index) => (
                              <TableRow key={index} className="border-b hover:bg-green-50">
                                <TableCell className="py-3 px-4">
                                  <span className="text-gray-800 font-medium">{order.orderNumber}</span>
                                </TableCell>
                                <TableCell className="py-3 px-4">
                                  <span className="font-medium text-white px-2 py-1 rounded" style={{ backgroundColor: 'rgb(234 179 8 / var(--tw-bg-opacity, 1))' }}>{order.machineNumber}號機</span>
                                </TableCell>
                                <TableCell className="py-3 px-4">
                                  <span className="text-sm">{order.productName}</span>
                                </TableCell>
                                <TableCell className="py-3 px-4">
                                  <span className="font-medium text-green-600">{order.productionCount}</span>
                                </TableCell>
                                <TableCell className="py-3 px-4">
                                  <span className="text-red-600 font-medium">{order.lossCount}</span>
                                </TableCell>
                                <TableCell className="py-3 px-4">
                                  <span className="text-blue-600 font-medium">{order.department}</span>
                                </TableCell>
                                <TableCell className="py-3 px-4">
                                  <span className="font-medium px-2 py-1 rounded text-sm bg-gray-100 text-gray-800">
                                    尚未派單
                                  </span>
                                </TableCell>
                                <TableCell className="py-3 px-4">
                                  <div className="inline-flex items-center px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                    <span className="text-xs text-green-700 font-medium">
                                      {order.completedTime}
                                    </span>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Order List */}
                <BaggingOrderList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}