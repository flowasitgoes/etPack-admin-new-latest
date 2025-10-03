"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Formula } from "../lib/formula-service"

interface FormulaListProps {
  formulas: Formula[]
  selectedFormula: string
  sortBy: string
  onFormulaSelect: (formulaId: string) => void
  onSortChange: (sortBy: string) => void
  onEditClick?: (formula: Formula) => void
  onAddClick?: () => void
  isEditing?: boolean
  editingFormulaId?: string
}

export default function FormulaList({
  formulas,
  selectedFormula,
  sortBy,
  onFormulaSelect,
  onSortChange,
  onEditClick,
  onAddClick,
  isEditing = false,
  editingFormulaId = ""
}: FormulaListProps) {
  // 獲取排序選項顯示文字
  const getSortOptionText = (option: string) => {
    switch (option) {
      case "name":
        return "名稱排序"
      case "order":
        return "訂單排序"
      default:
        return "名稱排序"
    }
  }

  return (
    <div className="px-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">配方列表</h2>
        <div className="relative">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-40">
              <SelectValue>
                {getSortOptionText(sortBy)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">名稱排序</SelectItem>
              <SelectItem value="order">訂單排序</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Formula Table */}
      <Card className="mb-6">
        <CardContent className="p-0">
          <div className={onEditClick ? "grid grid-cols-3" : "grid grid-cols-2"}>
            <div className="bg-primary text-white px-4 py-3 text-center font-medium rounded-tl-lg">
              配方編號
            </div>
            <div className={`bg-primary text-white px-4 py-3 text-center font-medium ${onEditClick ? "" : "rounded-tr-lg"}`}>
              配方名稱
            </div>
            {onEditClick && (
              <div className="bg-primary text-white px-4 py-3 text-center font-medium rounded-tr-lg">
                操作
              </div>
            )}
          </div>
          <div className="max-h-64 overflow-y-auto">
            {formulas.map((formula) => {
              const isCurrentlyEditing = isEditing && editingFormulaId === formula.id
              const isDisabled = isEditing && editingFormulaId !== formula.id
              
              return (
                <div
                  key={formula.id}
                  className={`${onEditClick ? "grid grid-cols-3" : "grid grid-cols-2"} border-b transition-colors ${
                    selectedFormula === formula.id ? "bg-purple-50" : ""
                  } ${
                    isCurrentlyEditing ? "bg-blue-50 border-blue-200" : ""
                  } ${
                    isDisabled ? "opacity-50 bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <div 
                    className={`px-4 py-3 text-sm border-r ${
                      isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    onClick={() => {
                      if (!isDisabled) {
                        onFormulaSelect(formula.id)
                      }
                    }}
                  >
                    {formula.id}
                  </div>
                  <div 
                    className={`px-4 py-3 text-sm ${onEditClick ? "border-r" : ""} ${
                      isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    onClick={() => {
                      if (!isDisabled) {
                        onFormulaSelect(formula.id)
                      }
                    }}
                  >
                    {formula.variants.map((variant, vIndex) => (
                      <div key={vIndex} className="mb-1 last:mb-0">
                        {variant}
                      </div>
                    ))}
                  </div>
                  {onEditClick && (
                    <div className="px-4 py-3 text-sm flex items-center justify-center">
                      <Button
                        size="sm"
                        className={`px-3 py-1 text-xs font-medium rounded-md shadow-sm transition-all duration-200 transform ${
                          isDisabled 
                            ? "bg-gray-400 text-gray-600 cursor-not-allowed" 
                            : "bg-primary-dark hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 text-white hover:shadow-md hover:-translate-y-0.5"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (!isDisabled && onEditClick) {
                            onEditClick(formula)
                          }
                        }}
                        disabled={isDisabled}
                      >
                        配方基本資料編輯
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          {/* 新增按鈕 */}
          {onAddClick && (
            <div className="flex justify-end p-4 border-t">
              <Button
                onClick={onAddClick}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-9 px-3 bg-primary text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                新增資料
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* 提示信息 - 只在沒有選擇配方時顯示 */}
      {!selectedFormula && formulas.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">點擊上方配方來查看歷史訂單記錄</p>
        </div>
      )}
    </div>
  )
} 