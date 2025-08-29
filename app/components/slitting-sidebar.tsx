"use client"

import { Search, Edit, User, FileText, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface SlittingSidebarProps {
  activeModule?: string
  onModuleChange?: (module: string) => void
}

interface RecentOrder {
  id: string
  orderNumber: string
  customerName: string
  productName: string
  createdAt: string
  status: string
}

export default function SlittingSidebar({ activeModule = "production-schedule", onModuleChange }: SlittingSidebarProps) {
  const [activeDepartment, setActiveDepartment] = useState("slitting")
  const router = useRouter()

  // 課別資料
  const departments = [
    { id: "business", name: "業務課", shortName: "業", path: "/" },
    { id: "extraction", name: "抽袋課", shortName: "抽", path: "/bagging" },
    { id: "printing", name: "印刷課", shortName: "印", path: "/printing" },
    { id: "laminating", name: "貼合課", shortName: "貼", path: "/laminating" },
    { id: "slitting", name: "分條課", shortName: "分", path: "/slitting" },
    { id: "cutting", name: "裁袋課", shortName: "裁", path: "/cutting" }
  ]

  // 最近訂單資料
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

  const handleDepartmentClick = (deptId: string) => {
    setActiveDepartment(deptId)
    const department = departments.find(d => d.id === deptId)
    if (department) {
      router.push(department.path)
    }
  }

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
      window.open(`http://localhost:3004/slitting/${order.orderNumber}`, '_blank')
    } else if (order.orderNumber === "K01140414002") {
      window.open(`http://localhost:3004/slitting/${order.orderNumber}`, '_blank')
    } else if (order.orderNumber === "K01140414003") {
      window.open(`http://localhost:3004/slitting/${order.orderNumber}`, '_blank')
    } else if (order.orderNumber === "K01140414004") {
      window.open(`http://localhost:3004/slitting/${order.orderNumber}`, '_blank')
    }
  }

  return (
    <div className="admin-left-sidebar bg-gray-50 flex flex-col h-full">
      {/* 課別分頁 - 移到最上方 */}
      <div className="p-4 border-b border-gray-200" style={{ minHeight: '95px' }}>
        <div className="grid grid-cols-3 gap-2">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => handleDepartmentClick(dept.id)}
              className={`p-1.5 text-sm font-medium rounded transition-all duration-200 ${
                activeDepartment === dept.id
                  ? "bg-[#2BBAA5] text-white shadow-md"
                  : "bg-[#93D3AE]/30 text-gray-700 hover:bg-[#93D3AE]/50"
              }`}
            >
              {dept.shortName}
            </button>
          ))}
        </div>
      </div>

      <div className="user-and-search-section p-6 pb-0">
        {/* User Profile */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white shadow-md"
            >
              <Edit className="w-3 h-3" />
            </Button>
          </div>
          <h3 className="font-medium text-gray-800">陳某某</h3>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Input placeholder="搜尋..." className="pl-10 border-gray-300" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2 px-4">
        <div 
          className={`text-center px-4 py-3 cursor-pointer transition-colors ${
            activeModule === "production-schedule" 
              ? "bg-gradient-primary text-white" 
              : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
          }`}
          onClick={() => onModuleChange?.("production-schedule")}
        >
          生產排程
        </div>
        <div 
          className={`text-center px-4 py-3 cursor-pointer transition-colors ${
            activeModule === "order-record" 
              ? "bg-gradient-primary text-white" 
              : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
          }`}
          onClick={() => onModuleChange?.("order-record")}
        >
          訂製單記錄
        </div>
        <div 
          className={`text-center px-4 py-3 cursor-pointer transition-colors ${
            activeModule === "material-record" 
              ? "bg-gradient-primary text-white" 
              : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
          }`}
          onClick={() => onModuleChange?.("material-record")}
        >
          領料記錄
        </div>
        <div 
          className={`text-center px-4 py-3 cursor-pointer transition-colors ${
            activeModule === "daily-report" 
              ? "bg-gradient-primary text-white" 
              : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
          }`}
          onClick={() => onModuleChange?.("daily-report")}
        >
          生產/檢驗日報表
        </div>
        <div 
          className={`text-center px-4 py-3 cursor-pointer transition-colors ${
            activeModule === "recipe-database" 
              ? "bg-gradient-primary text-white" 
              : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
          }`}
          onClick={() => onModuleChange?.("recipe-database")}
        >
          配方資料庫
        </div>
      </nav>

      {/* 分隔線 */}
      <div className="flex-1"></div>
      <div className="border-t border-gray-200 mx-4 my-2"></div>

      {/* 最近新增訂單區域 */}
      <div className="flex-shrink-0">
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
      </div>
    </div>
  )
}
