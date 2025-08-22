"use client"

import { useState, useEffect } from "react"
import BaggingSidebar from "../components/bagging-sidebar"
import BaggingProductionSchedule from "./production-schedule/page"
import MaterialRecordPage from "./material-record/page"
import OrderRecordPage from "./order-record/page"
import "../../styles/admin-colors.css"
import "../../styles/admin.css"

export default function BaggingPage() {
  const [activeModule, setActiveModule] = useState("production-schedule")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [fadeOpacity, setFadeOpacity] = useState(1)

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

  const renderActiveModule = () => {
    switch (activeModule) {
      case "production-schedule":
        return <BaggingProductionSchedule />
      case "material-record":
        return <MaterialRecordPage />
      case "order-record":
        return <OrderRecordPage />
      case "daily-report":
        return <div className="p-6">生產/檢驗日報表 - 開發中</div>
      case "recipe-database":
        return <div className="p-6">配方資料庫 - 開發中</div>
      default:
        return <BaggingProductionSchedule />
    }
  }

  return (
    <div className="admin-container min-h-screen bg-gradient-to-br p-4">
      <div className="max-w-[1600px] mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex h-screen">
          {/* Left Sidebar */}
          <BaggingSidebar activeModule={activeModule} onModuleChange={handleModuleChange} />

          {/* Main Content */}
          <div className="middle-col-section flex-1 flex transition-all duration-300 ease-in-out overflow-hidden">
            <div 
              className="flex-1 transition-opacity duration-150 ease-in-out overflow-y-auto"
              style={{ 
                opacity: fadeOpacity,
                pointerEvents: isTransitioning ? 'none' : 'auto'
              }}
            >
              {renderActiveModule()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
