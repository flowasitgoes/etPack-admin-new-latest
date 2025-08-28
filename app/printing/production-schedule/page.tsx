"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Printer, FileText, Plus } from "lucide-react"

interface PrintingSchedule {
  id: string
  orderNumber: string
  customerName: string
  productName: string
  machine: string
  startTime: string
  endTime: string
  status: "pending" | "in-progress" | "completed"
  priority: "high" | "medium" | "low"
}

export default function PrintingProductionSchedule() {
  const [schedules, setSchedules] = useState<PrintingSchedule[]>([
    {
      id: "1",
      orderNumber: "K01140414001",
      customerName: "譯加/KP0510",
      productName: "鮮自然2024/厚62u",
      machine: "印刷機A",
      startTime: "2025-08-25 08:00",
      endTime: "2025-08-25 16:00",
      status: "in-progress",
      priority: "high"
    },
    {
      id: "2",
      orderNumber: "K01140414002",
      customerName: "迪士尼",
      productName: "2024迪士尼-M28X46.5CM",
      machine: "印刷機B",
      startTime: "2025-08-25 16:00",
      endTime: "2025-08-26 00:00",
      status: "pending",
      priority: "medium"
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "待處理"
      case "in-progress":
        return "進行中"
      case "completed":
        return "已完成"
      default:
        return "未知"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "高"
      case "medium":
        return "中"
      case "low":
        return "低"
      default:
        return "未知"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* 頁面標題 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Printer className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">印刷排程</h1>
            <p className="text-gray-600">管理印刷機台的生產排程</p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          新增排程
        </Button>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">待處理</p>
                <p className="text-xl font-bold text-gray-900">
                  {schedules.filter(s => s.status === "pending").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Printer className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">進行中</p>
                <p className="text-xl font-bold text-gray-900">
                  {schedules.filter(s => s.status === "in-progress").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">已完成</p>
                <p className="text-xl font-bold text-gray-900">
                  {schedules.filter(s => s.status === "completed").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">總排程</p>
                <p className="text-xl font-bold text-gray-900">{schedules.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 排程列表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>印刷排程列表</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-mono text-lg font-bold text-gray-900">
                        {schedule.orderNumber}
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getStatusColor(schedule.status)}`}
                      >
                        {getStatusText(schedule.status)}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getPriorityColor(schedule.priority)}`}
                      >
                        優先級: {getPriorityText(schedule.priority)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">客戶名稱</p>
                        <p className="font-medium text-gray-900">{schedule.customerName}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">產品名稱</p>
                        <p className="font-medium text-gray-900">{schedule.productName}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">印刷機台</p>
                        <p className="font-medium text-gray-900">{schedule.machine}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">時間安排</p>
                        <p className="font-medium text-gray-900">
                          {schedule.startTime} - {schedule.endTime}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      編輯
                    </Button>
                    <Button variant="outline" size="sm">
                      查看詳情
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
