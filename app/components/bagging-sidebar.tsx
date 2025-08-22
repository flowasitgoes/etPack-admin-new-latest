"use client"

import { Search, Edit, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface BaggingSidebarProps {
  activeModule?: string
  onModuleChange?: (module: string) => void
}

export default function BaggingSidebar({ activeModule = "production-schedule", onModuleChange }: BaggingSidebarProps) {
  return (
    <div className="admin-left-sidebar bg-gray-50">
      <div className="user-and-search-section p-6">
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
      <nav className="space-y-2">
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
    </div>
  )
}
