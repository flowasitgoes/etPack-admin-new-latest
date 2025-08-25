"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ScheduleItem {
  orderNumber: string
  recorder: string
  deliveryDate: string
  customerName: string
  productInfo: string
}

export default function SchedulePage() {
  const [pageOpacity, setPageOpacity] = useState(0)
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 組件掛載後開始淡入
    setTimeout(() => setPageOpacity(1), 50)
    
    // 獲取工作排程數據
    fetchScheduleData()
  }, [])

  const fetchScheduleData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/schedule')
      if (!response.ok) {
        throw new Error('Failed to fetch schedule data')
      }
      const data = await response.json()
      setScheduleData(data)
    } catch (err) {
      console.error('Error fetching schedule data:', err)
      setError(err instanceof Error ? err.message : '獲取數據失敗')
    } finally {
      setLoading(false)
    }
  }

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
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-600">載入中...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={fetchScheduleData} variant="outline">
                重新載入
              </Button>
            </div>
          ) : scheduleData.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">目前沒有訂單數據</p>
            </div>
          ) : (
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
                        <Link 
                          href={`/bagging/${item.orderNumber}`}
                          className="bg-gray-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-gray-600 transition-colors cursor-pointer"
                        >
                          {item.orderNumber}
                        </Link>
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
          )}
        </div>
      </div>
    </div>
  )
} 