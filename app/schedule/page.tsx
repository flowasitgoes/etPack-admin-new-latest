"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SchedulePage() {
  const [pageOpacity, setPageOpacity] = useState(0)

  useEffect(() => {
    // 組件掛載後開始淡入
    setTimeout(() => setPageOpacity(1), 50)
  }, [])

  // 示例數據
  const scheduleData = [
    {
      orderNumber: "K01140421358441",
      recorder: "H11",
      deliveryDate: "2025/05/30",
      customerName: "PSD",
      productInfo: "W8010-B201"
    },
    {
      orderNumber: "K01140421358402",
      recorder: "H11",
      deliveryDate: "2025/06/30",
      customerName: "TD",
      productInfo: "W8010-B301"
    }
  ]

  const handlePreview = (orderNumber: string) => {
    console.log(`預覽訂單: ${orderNumber}`)
    // 這裡可以添加預覽邏輯，比如跳轉到預覽頁面
    // window.location.href = `/orders/preview?orderNumber=${orderNumber}`
  }

  return (
    <div 
      className="middle-col-outer-wrap flex-1 transition-all duration-300 ease-in-out"
      style={{ opacity: pageOpacity }}
    >
      {/* Header */}
      <div className="bg-gray-600 text-white px-6 py-4 mb-6">
        <div className="flex items-center space-x-2 text-sm">
          <span>業務課</span>
          <span>{">"}</span>
          <span>工作排程</span>
        </div>
      </div>

      {/* Page Title */}
      <div className="px-6 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">工作排程 - 已建立之訂單列表</h1>
      </div>

      {/* Schedule Table */}
      <div className="px-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-medium text-gray-700 border-r border-gray-200">
                  訂單編號
                </TableHead>
                <TableHead className="font-medium text-gray-700 border-r border-gray-200">
                  記錄人員
                </TableHead>
                <TableHead className="font-medium text-gray-700 border-r border-gray-200">
                  交貨日期
                </TableHead>
                <TableHead className="font-medium text-gray-700 border-r border-gray-200">
                  客戶名稱
                </TableHead>
                <TableHead className="font-medium text-gray-700">
                  產品資訊
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduleData.map((item, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="border-r border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="bg-gray-500 text-white px-3 py-1 rounded text-sm font-medium">
                        {item.orderNumber}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePreview(item.orderNumber)}
                        className="flex items-center space-x-1 px-2 py-1 h-auto hover:bg-gray-100 text-gray-600"
                      >
                        <Eye className="w-3 h-3" />
                        <span className="text-xs">預覽</span>
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="border-r border-gray-200 text-gray-700">
                    {item.recorder}
                  </TableCell>
                  <TableCell className="border-r border-gray-200 text-gray-700">
                    {item.deliveryDate}
                  </TableCell>
                  <TableCell className="border-r border-gray-200 text-gray-700">
                    {item.customerName}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {item.productInfo}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
} 