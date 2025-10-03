"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import ModuleTabs from "../components/module-tabs"
import FormulaList from "../components/formula-list"
import FormulaAddForm from "../components/formula-add-form"
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
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingFormulaId, setEditingFormulaId] = useState("")

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

  // 處理新增配方
  const handleAddFormula = async (newFormula: Formula) => {
    try {
      const savedFormula = await FormulaService.createFormula(newFormula)
      
      // 更新本地配方列表
      setFormulas(prev => [...prev, savedFormula])
      
      // 選擇新添加的配方
      setSelectedFormula(savedFormula.id)
      
      // 關閉新增表單
      setIsAdding(false)
    } catch (error) {
      console.error("新增配方失敗:", error)
    }
  }

  // 處理新增按鈕點擊
  const handleAddClick = () => {
    setIsAdding(true)
    setSelectedFormula("")
  }

  // 處理取消新增
  const handleCancelAdd = () => {
    setIsAdding(false)
  }

  // 處理編輯配方
  const handleEditFormula = (formula: Formula) => {
    setIsEditing(true)
    setEditingFormulaId(formula.id)
    setIsAdding(false)
    setSelectedFormula("")
  }

  // 處理保存編輯
  const handleSaveEdit = async (updatedFormula: Formula) => {
    try {
      // 這裡可以調用 API 來保存編輯的配方
      // const savedFormula = await FormulaService.updateFormula(updatedFormula)
      
      // 更新本地配方列表
      setFormulas(prev => prev.map(f => 
        f.id === updatedFormula.id ? updatedFormula : f
      ))
      
      // 關閉編輯模式
      setIsEditing(false)
      setEditingFormulaId("")
    } catch (error) {
      console.error("保存配方失敗:", error)
    }
  }

  // 處理取消編輯
  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingFormulaId("")
  }



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
        onEditClick={handleEditFormula}
        onAddClick={handleAddClick}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
        isEditing={isEditing}
        editingFormulaId={editingFormulaId}
      />

      {/* Formula Add Form - 只在新增模式時顯示 */}
      {isAdding && (
        <FormulaAddForm
          onSave={handleAddFormula}
          onCancel={handleCancelAdd}
        />
      )}

      {/* Historical Order Records Section - 只在選擇配方後顯示 */}
      {selectedFormula && !isAdding && !isEditing && (
        <HistoricalOrders
          formulaId={selectedFormula}
          orders={historicalOrders}
        />
      )}
    </div>
  )
} 