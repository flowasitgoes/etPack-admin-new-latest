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
  const pendingOrders = [
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
  ]

  // 機台生產排程數據
  const machineSchedules = [
    {
      machine: "1號機",
      schedule1: "K01140626001-2",
      schedule2: "K01140701001-2",
      schedule3: "",
      schedule4: ""
    },
    {
      machine: "2號機",
      schedule1: "K01140701001-3",
      schedule2: "",
      schedule3: "",
      schedule4: ""
    },
    {
      machine: "3號機",
      schedule1: "K01140624003",
      schedule2: "",
      schedule3: "",
      schedule4: ""
    }
  ]

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
        <div className="bg-gray-600 text-white p-4 rounded-t-lg">
          <h2 className="text-lg font-semibold">待生產訂製單列表</h2>
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
                      <Select defaultValue={order.machine}>
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
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded h-10">
                          確認
                        </Button>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" className="w-6 h-6 p-0 text-sm">+</Button>
                          <Button size="sm" variant="outline" className="w-6 h-6 p-0 text-sm">-</Button>
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
        <div className="bg-purple-800 text-white p-4 rounded-t-lg">
          <h2 className="text-lg font-semibold">機台生產排程列表</h2>
        </div>
        <div className="p-4">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-purple-800 text-white border-b">
                  <TableHead className="h-12 px-4 text-left align-middle text-white font-semibold">排程01</TableHead>
                  <TableHead className="h-12 px-4 text-left align-middle text-white font-semibold">排程02</TableHead>
                  <TableHead className="h-12 px-4 text-left align-middle text-white font-semibold">排程03</TableHead>
                  <TableHead className="h-12 px-4 text-left align-middle text-white font-semibold">排程04</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {machineSchedules.map((schedule, index) => (
                  <TableRow key={index} className="border-b hover:bg-gray-50">
                    <TableCell className="p-4 align-middle bg-pink-200 font-medium">{schedule.machine}</TableCell>
                    <TableCell className={`p-4 align-middle ${schedule.schedule1 ? "bg-gray-100" : ""}`}>
                      {schedule.schedule1 || ""}
                    </TableCell>
                    <TableCell className={`p-4 align-middle ${schedule.schedule2 ? "bg-gray-100" : ""}`}>
                      {schedule.schedule2 || ""}
                    </TableCell>
                    <TableCell className={`p-4 align-middle ${schedule.schedule3 ? "bg-gray-100" : ""}`}>
                      {schedule.schedule3 || ""}
                    </TableCell>
                    <TableCell className={`p-4 align-middle ${schedule.schedule4 ? "bg-gray-100" : ""}`}>
                      {schedule.schedule4 || ""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
