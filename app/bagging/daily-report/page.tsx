"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Package, Factory } from "lucide-react"
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

export default function DailyReportPage() {
  const [orders, setOrders] = useState<OrderData[]>([])
  const [loading, setLoading] = useState(true)
  const [completedMachines, setCompletedMachines] = useState<Set<string>>(new Set())
  const [completedOrders, setCompletedOrders] = useState<CompletedOrderInfo[]>([])
  const [dispatchedMachines, setDispatchedMachines] = useState<Set<string>>(new Set())
  const [notification, setNotification] = useState<{message: string, visible: boolean}>({message: '', visible: false})
  const [dailyReports, setDailyReports] = useState<{[key: string]: any}>({})

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
          
          // 分離已完成的機台和已派單的機台
          const completedMachinesList: string[] = []
          const dispatchedMachinesList: string[] = []
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
                
                if (reportData.dispatchStatus === '已派單') {
                  dispatchedMachinesList.push(machineKey)
                }
              })
            }
          })
          
          setCompletedMachines(new Set(completedMachinesList))
          setDispatchedMachines(new Set(dispatchedMachinesList))
          setCompletedOrders(completedOrdersList)
          setDailyReports(dailyReports)
        }
      } catch (error) {
        console.error('Error loading daily reports:', error)
      }
    }

    // 更新已完成訂單的產品名稱
    const updateCompletedOrdersWithProductNames = () => {
      setCompletedOrders(prev => prev.map(order => {
        const foundOrder = orders.find(o => o.orderNumber === order.orderNumber)
        return {
          ...order,
          productName: foundOrder ? foundOrder.orderInfo.productName : order.productName
        }
      }))
    }

    // 監聽來自其他頁面的完成狀態更新
    const handleStorageChange = () => {
      loadCompletedOrders()
    }

    // 初始載入完成狀態 - 現在在 loadOrders 完成後調用

    // 不再需要 localStorage 和 storage 事件監聽
    // window.addEventListener('storage', handleStorageChange)
    // return () => window.removeEventListener('storage', handleStorageChange)
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

  const formatQuantity = (order: OrderData) => {
    const { orderQuantity, orderUnit1, orderQuantity2, orderUnit2 } = order.orderInfo
    if (orderQuantity2 && orderUnit2) {
      return `${orderQuantity}${orderUnit1}/${orderQuantity2}${orderUnit2}`
    }
    return `${orderQuantity}${orderUnit1}`
  }

  // 派單功能
  const handleDispatch = async (orderNumber: string) => {
    // 找到當前行的所有checkbox
    const checkboxes = document.querySelectorAll(`input[type="checkbox"][data-order="${orderNumber}"]:checked`)
    const selectedMachines: string[] = []
    
    checkboxes.forEach((checkbox) => {
      const machineNumber = checkbox.getAttribute('data-machine')
      if (machineNumber) {
        const machineKey = `${orderNumber}-${machineNumber}`
        selectedMachines.push(machineKey)
      }
    })
    
    if (selectedMachines.length === 0) {
      setNotification({message: '請先選擇要派單的機台', visible: true})
      setTimeout(() => setNotification({message: '', visible: false}), 3000)
      return
    }
    
    try {
      // 為每個選中的機台更新派單狀態
      const updatePromises = selectedMachines.map(async (machineKey) => {
        const [orderNum, machineNum] = machineKey.split('-')
        const response = await fetch(`/api/orders/${orderNum}/daily-report?department=bagging`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            machine: machineNum,
            productionCount: '1188 x 4',
            lossCount: '52',
            dispatchStatus: '已派單',
            completedTime: null,
            isCompleted: true
          })
        })
        return response.ok
      })
      
      const results = await Promise.all(updatePromises)
      
      if (results.every(result => result)) {
        // 更新本地狀態
        const updatedDispatched = new Set([...dispatchedMachines, ...selectedMachines])
        setDispatchedMachines(updatedDispatched)
        
        // 取消勾選所有checkbox
        checkboxes.forEach((checkbox) => {
          (checkbox as HTMLInputElement).checked = false
        })
        
        // 顯示通知
        const machineNumbers = selectedMachines.map(key => key.split('-')[1] + '號機').join('、')
        setNotification({message: `已派出 ${machineNumbers} 的訂單`, visible: true})
        setTimeout(() => setNotification({message: '', visible: false}), 3000)
      } else {
        setNotification({message: '派單失敗，請重試', visible: true})
        setTimeout(() => setNotification({message: '', visible: false}), 3000)
      }
    } catch (error) {
      console.error('Error dispatching orders:', error)
      setNotification({message: '派單失敗，請重試', visible: true})
      setTimeout(() => setNotification({message: '', visible: false}), 3000)
    }
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
          <BaggingStandaloneSidebar />

          {/* Main Content */}
          <div className="middle-col-section flex-1 flex transition-all duration-300 ease-in-out overflow-hidden">
            <div className="flex-1 transition-opacity duration-150 ease-in-out overflow-y-auto">
              <div className="bagging-container space-y-6 p-6">
                {/* 頁面標題 */}
                <div className="flex justify-between items-center text-white p-4" style={{ background: 'rgb(209 138 173)' }}>
                  <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-bold">抽袋課</h1>
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

                {/* 說明文字 */}
                <div className="bg-white rounded-lg shadow-md">
                  <div className="text-white p-3 rounded-tr-lg rounded-br-lg w-[200px]" style={{ background: '#7c7d99' }}>
                    <h2 className="text-base font-semibold leading-tight">待生產訂製單列表</h2>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-4">
                      點選 <span className="text-red-500 font-semibold">訂單編號</span> 進入生產/檢驗日報表填寫作業
                    </p>
                    
                    {/* 生產機台狀態解釋區域 */}
                     <div className="bg-gray-50 rounded-lg p-4 mb-4">
                       <h3 className="text-sm font-semibold text-gray-700 mb-3 text-right">生產機台狀態說明</h3>
                       <div className="flex items-center justify-end space-x-6">
                         <div className="flex items-center space-x-2">
                           <div className="w-6 h-6 border-2 border-green-500 rounded bg-white"></div>
                           <span className="text-sm text-gray-600">白色：未排程</span>
                         </div>
                         <div className="flex items-center space-x-2">
                           <div className="w-6 h-6 border-2 border-green-500 rounded bg-green-500"></div>
                           <span className="text-sm text-gray-600">綠色：已排程</span>
                         </div>
                         <div className="flex items-center space-x-2">
                           <div className="w-6 h-6 border-2 border-yellow-500 rounded bg-yellow-500"></div>
                           <span className="text-sm text-gray-600">黃色：已完成</span>
                         </div>
                         <div className="flex items-center space-x-2">
                           <div className="w-6 h-6 border-2 border-blue-500 rounded bg-blue-500"></div>
                           <span className="text-sm text-gray-600">藍色：已派單</span>
                         </div>
                       </div>
                     </div>
                    
                    <div className="relative w-full overflow-auto">
                      <Table className="w-full">
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
                            <React.Fragment key={order.orderNumber}>
                              {/* 第一行：基本資訊 */}
                              <TableRow className="border-b hover:bg-gray-50">
                                <TableCell className="py-3 px-4">
                                  <span className="text-gray-800 font-medium">
                                    {order.orderNumber}
                                  </span>
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
                                      
                                      // 檢查機台是否已完成
                                      const machineKey = `${order.orderNumber}-${machine}`
                                      const isCompleted = completedMachines.has(machineKey)
                                      
                                      // 只有1號機台有超連結
                                      if (machine === 1) {
                                        return (
                                          <a
                                            key={machine}
                                            href={`/bagging/${order.orderNumber}/daily?machine=${machine}`}
                                            className={`w-8 h-8 border-2 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 cursor-pointer inline-flex items-center justify-center ${
                                              isCompleted
                                                ? 'border-yellow-500 bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-300'
                                                : isActive 
                                                  ? 'border-green-500 bg-green-500 text-white hover:bg-green-600 focus:ring-green-300' 
                                                  : 'border-green-500 text-green-600 hover:bg-green-50 focus:ring-green-300'
                                            }`}
                                          >
                                            {machine}
                                          </a>
                                        );
                                      } else {
                                        return (
                                          <button
                                            key={machine}
                                            className={`w-8 h-8 border-2 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 cursor-default ${
                                              isCompleted
                                                ? 'border-yellow-500 bg-yellow-500 text-white'
                                                : isActive 
                                                  ? 'border-green-500 bg-green-500 text-white' 
                                                  : 'border-green-500 text-green-600'
                                            }`}
                                          >
                                            {machine}
                                          </button>
                                        );
                                      }
                                    })}
                                  </div>
                                </TableCell>
                              </TableRow>
                              
                              {/* 第二行：完成狀態 */}
                              <TableRow className="border-b bg-blue-50">
                                <TableCell colSpan={5} className="py-2 px-4">
                                  {(() => {
                                    const completedMachinesForOrder = Array.from(completedMachines).filter(key => 
                                      key.startsWith(order.orderNumber)
                                    );
                                    
                                    if (completedMachinesForOrder.length > 0) {
                                      return (
                                        <div className="flex items-center justify-between w-full">
                                          {/* 標籤區域 */}
                                          <div className="flex items-center gap-2 bg-[#ababab] rounded px-3 py-2 w-fit">
                                            {/* 機台號碼和對應的Checkbox */}
                                            <div className="flex flex-wrap gap-2">
                                              {completedMachinesForOrder.map(machineKey => {
                                                const machineNumber = machineKey.split('-')[1];
                                                const isDispatched = dispatchedMachines.has(machineKey);
                                                return (
                                                  <div key={machineKey} className="flex items-center gap-1">
                                                    <input 
                                                      type="checkbox" 
                                                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                                      data-order={order.orderNumber}
                                                      data-machine={machineNumber}
                                                      disabled={isDispatched}
                                                    />
                                                    <span 
                                                      className="font-medium text-white px-2 py-1 rounded"
                                                      style={{ 
                                                        backgroundColor: isDispatched 
                                                          ? 'rgb(59 130 246 / var(--tw-bg-opacity, 1))' 
                                                          : 'rgb(234 179 8 / var(--tw-bg-opacity, 1))' 
                                                      }}
                                                    >
                                                      {machineNumber}號機
                                                    </span>
                                                  </div>
                                                );
                                              })}
                                            </div>
                                            
                                            {/* 完成數量 */}
                                            <div>
                                              {(() => {
                                                // 從 dailyReports 獲取實際生產數量
                                                const firstCompletedMachine = completedMachinesForOrder[0];
                                                const baggingReports = dailyReports.bagging || {};
                                                const machineData = baggingReports[firstCompletedMachine];
                                                const actualProductionCount = machineData?.productionCount || formatQuantity(order);
                                                
                                                return (
                                                  <span className="font-medium text-white">
                                                    {actualProductionCount}
                                                  </span>
                                                );
                                              })()}
                                            </div>
                                          </div>
                                          
                                          {/* 控制元件區域 */}
                                          <div className="w-[60px] flex justify-end">
                                            <button 
                                              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1 rounded transition-colors"
                                              onClick={() => handleDispatch(order.orderNumber)}
                                            >
                                              派單
                                            </button>
                                          </div>
                                        </div>
                                      );
                                    }
                                    return null;
                                  })()}
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
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
      
      {/* 通知組件 */}
      {notification.visible && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {notification.message}
        </div>
      )}
    </div>
  )
}
