"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, ArrowRight } from "lucide-react"

interface RecentOrder {
  id: string
  orderNumber: string
  customerName: string
  productName: string
  createdAt: string
  status: string
}

export default function RecentOrdersSection() {
  // 使用真實的訂單資料
  const recentOrders: RecentOrder[] = [
    {
      id: "1",
      orderNumber: "K01140414001",
      customerName: "譯加/KP0510",
      productName: "鮮自然2024/厚62u",
      createdAt: "2025-08-25 11:19:22",
      status: "新訂單"
    },
    {
      id: "2", 
      orderNumber: "K01140414002",
      customerName: "迪士尼",
      productName: "2024迪士尼-M28X46.5CM",
      createdAt: "2025-08-25 11:46:05",
      status: "處理中"
    },
    {
      id: "3",
      orderNumber: "K01140414003", 
      customerName: "全聯",
      productName: "全聯-PL-768",
      createdAt: "2025-08-25 11:50:07",
      status: "新訂單"
    },
    {
      id: "4",
      orderNumber: "K01140414004",
      customerName: "DDD",
      productName: "High End Plastic",
      createdAt: "2025-08-25 14:29:26",
      status: "處理中"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "新訂單":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "處理中":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "完成":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleOrderClick = (order: RecentOrder) => {
    // 根據訂單編號決定要跳轉到哪個頁面
    if (order.orderNumber === "K01140414001") {
      window.open(`http://localhost:3004/bagging/${order.orderNumber}`, '_blank')
    } else if (order.orderNumber === "K01140414002") {
      window.open(`http://localhost:3004/bagging/${order.orderNumber}`, '_blank')
    } else if (order.orderNumber === "K01140414003") {
      window.open(`http://localhost:3004/bagging/${order.orderNumber}`, '_blank')
    } else if (order.orderNumber === "K01140414004") {
      window.open(`http://localhost:3004/bagging/${order.orderNumber}`, '_blank')
    }
  }

  return (
    <div className="space-y-4 p-4">
      {/* 最近新增訂單標題 */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-[#2BBAA5]" />
          最近新增訂單
        </h3>
        <Badge variant="outline" className="text-xs">
          {recentOrders.length} 筆
        </Badge>
      </div>

      {/* 訂單列表 */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="p-3 bg-white rounded-lg border border-gray-200 hover:border-[#2BBAA5]/30 hover:shadow-sm transition-all duration-200 cursor-pointer group"
            onClick={() => handleOrderClick(order)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-mono text-sm font-medium text-gray-900">
                    {order.orderNumber}
                  </span>
                  <div className={`text-xs px-2 py-1 border flex flex-col items-center leading-relaxed ${getStatusColor(order.status)}`}>
                    {order.status.split('').map((char, index) => (
                      <span key={index}>{char}</span>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>{order.customerName}</div>
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {order.createdAt}
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#2BBAA5] transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* 查看更多按鈕 */}
      <div className="text-center pt-2">
        <button className="text-sm text-[#2BBAA5] hover:text-[#2BBAA5]/80 font-medium transition-colors">
          查看更多訂單 →
        </button>
      </div>
    </div>
  )
}
