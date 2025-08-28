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
  // 模擬最近新增訂單資料
  const recentOrders: RecentOrder[] = [
    {
      id: "1",
      orderNumber: "K01140414001",
      customerName: "台灣包裝公司",
      productName: "環保購物袋",
      createdAt: "2024-01-15 14:30",
      status: "新訂單"
    },
    {
      id: "2", 
      orderNumber: "K01140414002",
      customerName: "永續生活館",
      productName: "可重複使用袋",
      createdAt: "2024-01-15 13:45",
      status: "處理中"
    },
    {
      id: "3",
      orderNumber: "K01140414003", 
      customerName: "綠色商店",
      productName: "生物降解袋",
      createdAt: "2024-01-15 12:20",
      status: "新訂單"
    },
    {
      id: "4",
      orderNumber: "K01140414004",
      customerName: "環保用品專賣",
      productName: "無紡布購物袋",
      createdAt: "2024-01-15 11:15",
      status: "處理中"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "新訂單":
        return "bg-blue-100 text-blue-800"
      case "處理中":
        return "bg-yellow-100 text-yellow-800"
      case "完成":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
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
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-mono text-sm font-medium text-gray-900">
                    {order.orderNumber}
                  </span>
                  <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                    {order.status}
                  </Badge>
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
