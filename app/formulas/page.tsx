"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import ModuleTabs from "../components/module-tabs"
import FormulaList from "../components/formula-list"
import HistoricalOrders from "../components/historical-orders"
import { FormulaService, type Formula, type HistoricalOrder } from "../lib/formula-service"

export default function FormulasPage() {
  const [activeTab, setActiveTab] = useState("formulas")
  const [selectedFormula, setSelectedFormula] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [formulas, setFormulas] = useState<Formula[]>([])
  const [historicalOrders, setHistoricalOrders] = useState<HistoricalOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [pageOpacity, setPageOpacity] = useState(0)

  // 標籤配置
  const tabs = [
    { id: "formulas", label: "配方列表" },
    { id: "orders", label: "訂製單記錄" }
  ]

  // 獲取當前日期時間
  const getCurrentDateTime = () => {
    const now = new Date()
    const year = now.getFullYear() - 1911 // 民國年
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${year} / ${month} / ${day} ${hours}:${minutes}`
  }

  // 初始化載入配方數據
  useEffect(() => {
    const loadFormulas = async () => {
      try {
        const formulasData = await FormulaService.getAllFormulas()
        const sortedFormulas = await FormulaService.sortFormulas(formulasData, sortBy)
        setFormulas(sortedFormulas)
        // 不自動選擇第一個配方，讓用戶主動選擇
      } catch (error) {
        console.error("載入配方數據失敗:", error)
      } finally {
        setLoading(false)
        // 數據載入完成後開始淡入
        setTimeout(() => setPageOpacity(1), 50)
      }
    }

    loadFormulas()
  }, []) // 只在組件掛載時執行一次

  // 處理排序變更
  const handleSortChange = async (newSortBy: string) => {
    setSortBy(newSortBy)
    const sortedFormulas = await FormulaService.sortFormulas(formulas, newSortBy)
    setFormulas(sortedFormulas)
    // 注意：這裡不改變 selectedFormula，保持用戶當前選擇的配方
  }

  // 當選擇的配方改變時，載入對應的歷史訂單
  useEffect(() => {
    const loadHistoricalOrders = async () => {
      if (selectedFormula) {
        try {
          const orders = await FormulaService.getHistoricalOrders(selectedFormula)
          setHistoricalOrders(orders)
        } catch (error) {
          console.error("載入歷史訂單失敗:", error)
        }
      }
    }

    loadHistoricalOrders()
  }, [selectedFormula])



  if (loading) {
    return (
      <div className="middle-col-outer-wrap flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="middle-col-outer-wrap flex-1 transition-all duration-300 ease-in-out"
      style={{ opacity: pageOpacity }}
    >
      {/* Header */}
      <div className="bg-gray-600 text-white px-6 py-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <span>業務課</span>
            <span>{">"}</span>
            <span>配方資料庫</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>{getCurrentDateTime()}</span>
          </div>
        </div>
      </div>

      {/* Module Tabs */}
      {/* <ModuleTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
      /> */}

      {/* Formula List Section */}
      <FormulaList
        formulas={formulas}
        selectedFormula={selectedFormula}
        sortBy={sortBy}
        onFormulaSelect={setSelectedFormula}
        onSortChange={handleSortChange}
      />

      {/* Historical Order Records Section - 只在選擇配方後顯示 */}
      {selectedFormula && (
        <HistoricalOrders
          formulaId={selectedFormula}
          orders={historicalOrders}
        />
      )}
    </div>
  )
} 