"use client"

import { Search, Edit, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import RecentOrdersSection from "./recent-orders-section"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface SidebarProps {
  activeModule?: string
  onModuleChange?: (module: string) => void
}

export default function Sidebar({ activeModule = "orders", onModuleChange }: SidebarProps) {
  const [activeDepartment, setActiveDepartment] = useState("business")
  const router = useRouter()
  const pathname = usePathname()

  // 根據當前路由自動設置活躍模組
  const getActiveModuleFromPath = () => {
    if (pathname === '/employee-table') {
      return 'employee-database'
    }
    if (pathname === '/employee-info') {
      return 'employee-database'
    }
    if (pathname === '/formulas') {
      return 'formulas'
    }
    if (pathname === '/vendors') {
      return 'vendors'
    }
    if (pathname === '/products') {
      return 'products'
    }
    if (pathname === '/orders') {
      return 'orders'
    }
    return activeModule
  }

  const currentActiveModule = getActiveModuleFromPath()

  // 課別資料
  const departments = [
    { id: "business", name: "業務課", shortName: "業", path: "/" },
    { id: "extraction", name: "抽袋課", shortName: "抽", path: "/bagging" },
    { id: "printing", name: "印刷課", shortName: "印", path: "/printing" },
    { id: "laminating", name: "貼合課", shortName: "貼", path: "/laminating" },
    { id: "slitting", name: "分條課", shortName: "分", path: "/slitting" },
    { id: "cutting", name: "裁袋課", shortName: "裁", path: "/cutting" }
  ]

  const handleDepartmentClick = (deptId: string) => {
    setActiveDepartment(deptId)
    const department = departments.find(d => d.id === deptId)
    if (department) {
      router.push(department.path)
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
            <a href="/employee-info" className="block">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center hover:opacity-80 transition-opacity">
                <User className="w-10 h-10 text-white" />
              </div>
            </a>
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
            activeModule === "schedule" 
              ? "bg-gradient-primary text-white" 
              : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
          }`}
          onClick={() => onModuleChange?.("schedule")}
        >
          工作排程
        </div>
        <div 
          className={`text-center px-4 py-3 cursor-pointer transition-colors ${
            currentActiveModule === "orders" 
              ? "bg-gradient-primary text-white" 
              : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
          }`}
          onClick={() => onModuleChange?.("orders")}
        >
          訂製單記錄
        </div>
        <div 
          className={`text-center px-4 py-3 cursor-pointer transition-colors ${
            currentActiveModule === "vendors" 
              ? "bg-gradient-primary text-white" 
              : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
          }`}
          onClick={() => onModuleChange?.("vendors")}
        >
          客戶資訊
        </div>
        <div 
          className={`text-center px-4 py-3 cursor-pointer transition-colors ${
            currentActiveModule === "products" 
              ? "bg-gradient-primary text-white" 
              : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
          }`}
          onClick={() => onModuleChange?.("products")}
        >
          產品資訊
        </div>
        <div 
          className={`text-center px-4 py-3 cursor-pointer transition-colors ${
            currentActiveModule === "formulas" 
              ? "bg-gradient-primary text-white" 
              : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
          }`}
          onClick={() => onModuleChange?.("formulas")}
        >
          配方資料庫
        </div>
        <div 
          className={`text-center px-4 py-3 cursor-pointer transition-colors ${
            currentActiveModule === "employee-database" 
              ? "bg-gradient-primary text-white" 
              : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
          }`}
          onClick={() => window.location.href = '/employee-table'}
        >
          員工資料庫
        </div>
      </nav>

      {/* 分隔線 */}
      <div className="flex-1"></div>
      <div className="border-t border-gray-200 mx-4 my-2"></div>

      {/* 最近新增訂單區域 */}
      <div className="flex-shrink-0">
        <RecentOrdersSection />
      </div>
    </div>
  )
}

