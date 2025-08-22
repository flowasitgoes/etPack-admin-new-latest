"use client"

import { useState } from "react"
import { Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function BaggingProductionSchedule() {
  const [currentDateTime] = useState(() => {
    const now = new Date()
    const year = now.getFullYear() - 1911 // 民國年
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${year}/${month}/${day} ${hours}:${minutes}`
  })

  // 待生產訂製單數據
  const [pendingOrders, setPendingOrders] = useState([
    {
      orderNumber: "K01140625001",
      productName: "鮮自然224/厚62u",
      orderQuantity: "1600KG/600捲",
      deliveryDate: "114/07/21",
      machine: "1號機"
    },
    {
      orderNumber: "K01140626001-1",
      productName: "2024迪士尼-M29X46.5cm",
      orderQuantity: "1262500只",
      deliveryDate: "114/09/04",
      machine: "1號機"
    },
    {
      orderNumber: "K01140701001-4",
      productName: "PL-768奈芙捲衛6入袋",
      orderQuantity: "20000只/23箱",
      deliveryDate: "114/07/15",
      machine: "1號機"
    }
  ])

  // 機台生產排程數據
  const [machineSchedules, setMachineSchedules] = useState([
    {
      machine: "1號機",
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
      machine: "2號機",
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
      machine: "3號機",
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
      <div className="flex justify-between items-center text-white p-4" style={{ background: '#76514c' }}>
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">抽袋課</h1>
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
            確認訂單指定的生產機台號碼,按下確定後無法變更,請小心操作
            <span className="text-red-500 font-semibold">無法變更</span>
          </p>
          
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 border-b">
                  <TableHead className="h-12 px-4 text-left align-middle text-gray-700 font-semibold">訂單編號</TableHead>
                  <TableHead className="h-12 px-4 text-left align-middle text-gray-700 font-semibold">產品名稱</TableHead>
                  <TableHead className="h-12 px-4 text-left align-middle text-gray-700 font-semibold">訂製數量</TableHead>
                  <TableHead className="h-12 px-4 text-left align-middle text-gray-700 font-semibold">交貨日期</TableHead>
                  <TableHead className="h-12 px-4 text-left align-middle text-gray-700 font-semibold">生產機台</TableHead>
                  <TableHead className="h-12 px-4 text-left align-middle text-gray-700 font-semibold">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingOrders.map((order, index) => (
                  <TableRow key={index} className="border-b hover:bg-gray-50">
                    <TableCell className="p-4 align-middle bg-purple-100 font-medium">{order.orderNumber}</TableCell>
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
                          <SelectItem value="1號機">1號機</SelectItem>
                          <SelectItem value="2號機">2號機</SelectItem>
                          <SelectItem value="3號機">3號機</SelectItem>
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
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* 機台生產排程列表 */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="text-white p-3 rounded-tr-lg rounded-br-lg w-[200px]" style={{ background: '#7c7d99' }}>
          <h2 className="text-base font-semibold leading-tight">機台生產排程列表</h2>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <div className="min-w-max">
              <Table>
                <TableHeader>
                  <TableRow className="bg-purple-800 text-white border-b [&:hover]:bg-purple-800">
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
                        {schedule.schedule1 || ""}
                      </TableCell>
                      <TableCell className={`p-4 align-middle min-w-[150px] ${schedule.schedule2 ? "bg-gray-100" : ""}`}>
                        {schedule.schedule2 || ""}
                      </TableCell>
                      <TableCell className={`p-4 align-middle min-w-[150px] ${schedule.schedule3 ? "bg-gray-100" : ""}`}>
                        {schedule.schedule3 || ""}
                      </TableCell>
                      <TableCell className={`p-4 align-middle min-w-[150px] ${schedule.schedule4 ? "bg-gray-100" : ""}`}>
                        {schedule.schedule4 || ""}
                      </TableCell>
                      <TableCell className={`p-4 align-middle min-w-[150px] ${schedule.schedule5 ? "bg-gray-100" : ""}`}>
                        {schedule.schedule5 || ""}
                      </TableCell>
                      <TableCell className={`p-4 align-middle min-w-[150px] ${schedule.schedule6 ? "bg-gray-100" : ""}`}>
                        {schedule.schedule6 || ""}
                      </TableCell>
                      <TableCell className={`p-4 align-middle min-w-[150px] ${schedule.schedule7 ? "bg-gray-100" : ""}`}>
                        {schedule.schedule7 || ""}
                      </TableCell>
                      <TableCell className={`p-4 align-middle min-w-[150px] ${schedule.schedule8 ? "bg-gray-100" : ""}`}>
                        {schedule.schedule8 || ""}
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
