"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

interface OrderData {
  orderNumber: string
  productName: string
  orderQuantity: string
  deliveryDate: string
  machine: string
}

export default function PrintingProductionSchedule() {
  const [currentDateTime] = useState(() => {
    const now = new Date()
    const year = now.getFullYear() - 1911 // 民國年
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${year}/${month}/${day} ${hours}:${minutes}`
  })

  // 待生產訂製單數據 - 從 API 動態讀取
  const [pendingOrders, setPendingOrders] = useState<OrderData[]>([])
  const [loading, setLoading] = useState(true)

  // 從 API 讀取訂單資料
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/orders')
        const data = await response.json()
        
        if (data.orders && Array.isArray(data.orders)) {
          setPendingOrders(data.orders)
        } else {
          console.error('API 返回的資料格式不正確:', data)
          setPendingOrders([])
        }
      } catch (error) {
        console.error('讀取訂單資料時發生錯誤:', error)
        setPendingOrders([])
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  // 機台生產排程數據
  const [machineSchedules, setMachineSchedules] = useState([
    {
      machine: "印刷機A",
      schedule1: "",
      schedule2: "",
      schedule3: "",
      schedule4: "",
      schedule5: "",
      schedule6: "",
      schedule7: "",
      schedule8: ""
    },
    {
      machine: "印刷機B",
      schedule1: "",
      schedule2: "",
      schedule3: "",
      schedule4: "",
      schedule5: "",
      schedule6: "",
      schedule7: "",
      schedule8: ""
    },
    {
      machine: "印刷機C",
      schedule1: "",
      schedule2: "",
      schedule3: "",
      schedule4: "",
      schedule5: "",
      schedule6: "",
      schedule7: "",
      schedule8: ""
    }
  ])

  // 處理確認按鈕點擊
  const handleConfirm = (orderIndex: number) => {
    console.log('確認按鈕被點擊，訂單索引:', orderIndex)
    
    const order = pendingOrders[orderIndex]
    console.log('選中的訂單:', order)
    
    const machineName = order.machine
    console.log('選中的機台:', machineName)
    
    // 找到對應的機台
    const machineIndex = machineSchedules.findIndex(schedule => schedule.machine === machineName)
    console.log('找到的機台索引:', machineIndex)
    
    if (machineIndex !== -1) {
      // 找到該機台的第一個空排程位置
      const schedule = machineSchedules[machineIndex]
      let emptyScheduleIndex = -1
      
      for (let i = 1; i <= 8; i++) {
        const scheduleKey = `schedule${i}` as keyof typeof schedule
        if (!schedule[scheduleKey]) {
          emptyScheduleIndex = i
          break
        }
      }
      
      console.log('找到的空排程位置:', emptyScheduleIndex)
      
      if (emptyScheduleIndex !== -1) {
        // 更新機台排程
        const updatedSchedules = [...machineSchedules]
        const scheduleKey = `schedule${emptyScheduleIndex}` as keyof typeof updatedSchedules[0]
        updatedSchedules[machineIndex] = {
          ...updatedSchedules[machineIndex],
          [scheduleKey]: order.orderNumber
        }
        console.log('更新後的排程:', updatedSchedules)
        setMachineSchedules(updatedSchedules)
        
        // 不再從待生產列表中移除該訂單
        console.log('訂單保留在待生產列表中')
      }
    }
  }

  // 處理機台選擇變更
  const handleMachineChange = (orderIndex: number, machine: string) => {
    const updatedOrders = [...pendingOrders]
    updatedOrders[orderIndex] = {
      ...updatedOrders[orderIndex],
      machine
    }
    setPendingOrders(updatedOrders)
  }

  // 處理移除按鈕點擊
  const handleRemove = (orderIndex: number) => {
    console.log('移除按鈕被點擊，訂單索引:', orderIndex)
    
    const order = pendingOrders[orderIndex]
    console.log('要移除的訂單:', order)
    
    const machineName = order.machine
    console.log('對應的機台:', machineName)
    
    // 找到對應的機台
    const machineIndex = machineSchedules.findIndex(schedule => schedule.machine === machineName)
    console.log('找到的機台索引:', machineIndex)
    
    if (machineIndex !== -1) {
      // 找到該機台中包含此訂單的排程位置
      const schedule = machineSchedules[machineIndex]
      let scheduleIndexToRemove = -1
      
      for (let i = 1; i <= 8; i++) {
        const scheduleKey = `schedule${i}` as keyof typeof schedule
        if (schedule[scheduleKey] === order.orderNumber) {
          scheduleIndexToRemove = i
          break
        }
      }
      
      console.log('找到要移除的排程位置:', scheduleIndexToRemove)
      
      if (scheduleIndexToRemove !== -1) {
        // 從機台排程中移除該訂單
        const updatedSchedules = [...machineSchedules]
        const scheduleKey = `schedule${scheduleIndexToRemove}` as keyof typeof updatedSchedules[0]
        updatedSchedules[machineIndex] = {
          ...updatedSchedules[machineIndex],
          [scheduleKey]: ""
        }
        console.log('更新後的排程:', updatedSchedules)
        setMachineSchedules(updatedSchedules)
        
        console.log('訂單已從排程中移除')
      }
    }
  }

  return (
    <div className="bagging-container space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center text-white p-4" style={{ background: 'rgb(136 183 204)' }}>
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">印刷課</h1>
          <span className="text-lg">生產排程</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span className="text-sm">{currentDateTime}</span>
        </div>
      </div>

      {/* 待生產訂製單列表 */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="text-white p-3 rounded-tr-lg rounded-br-lg w-[200px]" style={{ background: '#7c7d99' }}>
          <h2 className="text-base font-semibold leading-tight">待生產訂製單列表</h2>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">
            確認訂單指定的印刷機台號碼,按下確定後無法變更,請小心操作
            <span className="text-red-500 font-semibold">無法變更</span>
          </p>
          
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted text-white border-b [&:hover]:bg-[rgb(209 138 173)]" style={{ background: 'rgb(118, 81, 99)' }}>
                  <TableHead className="[&:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle text-white font-semibold">訂單編號</TableHead>
                  <TableHead className="[&:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle text-white font-semibold">產品名稱</TableHead>
                  <TableHead className="[&:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle text-white font-semibold">訂製數量</TableHead>
                  <TableHead className="[&:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle text-white font-semibold">交貨日期</TableHead>
                  <TableHead className="[&:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle text-white font-semibold">印刷機台</TableHead>
                  <TableHead className="[&:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle text-white font-semibold">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="p-4 text-center text-gray-500">
                      載入中...
                    </TableCell>
                  </TableRow>
                ) : pendingOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="p-4 text-center text-gray-500">
                      目前沒有待生產的訂單
                    </TableCell>
                  </TableRow>
                ) : (
                  pendingOrders.map((order, index) => (
                    <TableRow key={index} className="border-b hover:bg-gray-50">
                      <TableCell className="p-4 align-middle bg-purple-100 font-medium">
                        <Link 
                          href={`/printing/${order.orderNumber}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                        >
                          {order.orderNumber}
                        </Link>
                      </TableCell>
                      <TableCell className="p-4 align-middle">{order.productName}</TableCell>
                      <TableCell className="p-4 align-middle">{order.orderQuantity}</TableCell>
                      <TableCell className="p-4 align-middle">{order.deliveryDate}</TableCell>
                      <TableCell className="p-4 align-middle">
                        <Select 
                          value={order.machine} 
                          onValueChange={(value) => handleMachineChange(index, value)}
                        >
                          <SelectTrigger className="w-24 h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="印刷機A">印刷機A</SelectItem>
                            <SelectItem value="印刷機B">印刷機B</SelectItem>
                            <SelectItem value="印刷機C">印刷機C</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="p-4 align-middle">
                        <div className="flex items-center space-x-2">
                          <Button 
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded h-10"
                            onClick={() => handleConfirm(index)}
                          >
                            確認
                          </Button>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline" className="w-6 h-6 p-0 text-sm">+</Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="w-6 h-6 p-0 text-sm"
                              onClick={() => handleRemove(index)}
                            >
                              -
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* 機台生產排程列表 */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="text-white p-3 rounded-tr-lg rounded-br-lg w-[200px]" style={{ background: '#7c7d99' }}>
          <h2 className="text-base font-semibold leading-tight">印刷機台生產排程列表</h2>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <div className="min-w-max">
              <Table>
                <TableHeader>
                  <TableRow className="text-white border-b [&:hover]:bg-[rgb(209 138 173)]" style={{ background: 'rgb(118, 81, 99)' }}>
                    <TableHead className="h-12 px-4 text-left align-middle text-white font-semibold min-w-[100px]">機台</TableHead>
                    <TableHead className="h-12 px-4 text-left align-middle text-white font-semibold min-w-[150px]">排程01</TableHead>
                    <TableHead className="h-12 px-4 text-left align-middle text-white font-semibold min-w-[150px]">排程02</TableHead>
                    <TableHead className="h-12 px-4 text-left align-middle text-white font-semibold min-w-[150px]">排程03</TableHead>
                    <TableHead className="h-12 px-4 text-left align-middle text-white font-semibold min-w-[150px]">排程04</TableHead>
                    <TableHead className="h-12 px-4 text-left align-middle text-white font-semibold min-w-[150px]">排程05</TableHead>
                    <TableHead className="h-12 px-4 text-left align-middle text-white font-semibold min-w-[150px]">排程06</TableHead>
                    <TableHead className="h-12 px-4 text-left align-middle text-white font-semibold min-w-[150px]">排程07</TableHead>
                    <TableHead className="h-12 px-4 text-left align-middle text-white font-semibold min-w-[150px]">排程08</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {machineSchedules.map((schedule, index) => (
                    <TableRow key={index} className="border-b hover:bg-gray-50">
                      <TableCell className="p-4 align-middle bg-pink-200 font-medium min-w-[100px]">{schedule.machine}</TableCell>
                      <TableCell className={`p-4 align-middle min-w-[150px] ${schedule.schedule1 ? "bg-gray-100" : ""}`}>
                        {schedule.schedule1 ? (
                          <Link 
                            href={`/printing/${schedule.schedule1}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                          >
                            {schedule.schedule1}
                          </Link>
                        ) : ""}
                      </TableCell>
                      <TableCell className={`p-4 align-middle min-w-[150px] ${schedule.schedule2 ? "bg-gray-100" : ""}`}>
                        {schedule.schedule2 ? (
                          <Link 
                            href={`/printing/${schedule.schedule2}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                          >
                            {schedule.schedule2}
                          </Link>
                        ) : ""}
                      </TableCell>
                      <TableCell className={`p-4 align-middle min-w-[150px] ${schedule.schedule3 ? "bg-gray-100" : ""}`}>
                        {schedule.schedule3 ? (
                          <Link 
                            href={`/printing/${schedule.schedule3}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                          >
                            {schedule.schedule3}
                          </Link>
                        ) : ""}
                      </TableCell>
                      <TableCell className={`p-4 align-middle min-w-[150px] ${schedule.schedule4 ? "bg-gray-100" : ""}`}>
                        {schedule.schedule4 ? (
                          <Link 
                            href={`/printing/${schedule.schedule4}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                          >
                            {schedule.schedule4}
                          </Link>
                        ) : ""}
                      </TableCell>
                      <TableCell className={`p-4 align-middle min-w-[150px] ${schedule.schedule5 ? "bg-gray-100" : ""}`}>
                        {schedule.schedule5 ? (
                          <Link 
                            href={`/printing/${schedule.schedule5}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                          >
                            {schedule.schedule5}
                          </Link>
                        ) : ""}
                      </TableCell>
                      <TableCell className={`p-4 align-middle min-w-[150px] ${schedule.schedule6 ? "bg-gray-100" : ""}`}>
                        {schedule.schedule6 ? (
                          <Link 
                            href={`/printing/${schedule.schedule6}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                          >
                            {schedule.schedule6}
                          </Link>
                        ) : ""}
                      </TableCell>
                      <TableCell className={`p-4 align-middle min-w-[150px] ${schedule.schedule7 ? "bg-gray-100" : ""}`}>
                        {schedule.schedule7 ? (
                          <Link 
                            href={`/printing/${schedule.schedule7}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                          >
                            {schedule.schedule7}
                          </Link>
                        ) : ""}
                      </TableCell>
                      <TableCell className={`p-4 align-middle min-w-[150px] ${schedule.schedule8 ? "bg-gray-100" : ""}`}>
                        {schedule.schedule8 ? (
                          <Link 
                            href={`/printing/${schedule.schedule8}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                          >
                            {schedule.schedule8}
                          </Link>
                        ) : ""}
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
  )
}
