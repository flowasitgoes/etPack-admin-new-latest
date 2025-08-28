"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./contexts/auth-context"
import AuthGuard from "./components/auth-guard"
import Sidebar from "./components/sidebar"
import StaffInfo from "./components/staff-info"
import OrdersPage from "./orders/page"
import SchedulePage from "./schedule/page"
import VendorsPage from "./vendors/page"
import ProductsPage from "./products/page"
import FormulasPage from "./formulas/page"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"
import "../styles/admin-colors.css"
import "../styles/admin.css"

export default function ERPAdmin() {
  const [activeModule, setActiveModule] = useState("orders")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [fadeOpacity, setFadeOpacity] = useState(1)
  const { user, logout } = useAuth()

  // 處理模組切換的淡入淡出效果
  const handleModuleChange = async (newModule: string) => {
    if (newModule === activeModule) return
    
    setIsTransitioning(true)
    setFadeOpacity(0)
    
    // 等待淡出動畫完成
    await new Promise(resolve => setTimeout(resolve, 150))
    
    // 切換模組
    setActiveModule(newModule)
    
    // 等待一幀確保 DOM 更新
    await new Promise(resolve => requestAnimationFrame(resolve))
    
    // 開始淡入
    setFadeOpacity(1)
    setIsTransitioning(false)
  }

  const handleLogout = () => {
    logout()
  }

  const renderActiveModule = () => {
    switch (activeModule) {
      case "orders":
        return <OrdersPage />
      case "schedule":
        return <SchedulePage />
      case "vendors":
        return <VendorsPage />
      case "products":
        return <ProductsPage />
      case "formulas":
        return <FormulasPage />
      default:
        return <OrdersPage />
    }
  }

  return (
    <AuthGuard>
      <div className="admin-container min-h-screen bg-gradient-to-br p-4">
        <div className="max-w-[1600px] mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex h-screen">
            {/* Left Sidebar */}
            <Sidebar activeModule={activeModule} onModuleChange={handleModuleChange} />

            {/* Main Content */}
            <div className="middle-col-section flex-1 flex transition-all duration-300 ease-in-out overflow-hidden">
              <div 
                className="flex-1 transition-opacity duration-150 ease-in-out overflow-y-auto"
                style={{ 
                  opacity: fadeOpacity,
                  pointerEvents: isTransitioning ? 'none' : 'auto'
                }}
              >
                {/* Header with User Info and Logout */}
                <div className="flex justify-between items-center p-4 border-b bg-white" style={{ minHeight: '95px' }}>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.role} - {user?.department}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>登出</span>
                  </Button>
                </div>

                {/* Page Content */}
                <div className="p-4">
                  {renderActiveModule()}
                </div>
              </div>

              {/* Right Sidebar - Staff Info (只在非配方資料庫和產品資訊模組顯示) */}
              {activeModule !== "formulas" && activeModule !== "products" && <StaffInfo />}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
