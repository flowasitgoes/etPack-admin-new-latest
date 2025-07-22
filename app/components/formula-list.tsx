"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { type Formula } from "../lib/formula-service"

interface FormulaListProps {
  formulas: Formula[]
  selectedFormula: string
  sortBy: string
  onFormulaSelect: (formulaId: string) => void
  onSortChange: (sortBy: string) => void
}

export default function FormulaList({
  formulas,
  selectedFormula,
  sortBy,
  onFormulaSelect,
  onSortChange
}: FormulaListProps) {
  return (
    <div className="px-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">配方列表</h2>
        <div className="relative">
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            onClick={() => onSortChange(sortBy === "name" ? "order" : "name")}
          >
            <span>{sortBy === "name" ? "名稱排序" : "訂單排序"}</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Formula Table */}
      <Card className="mb-6">
        <CardContent className="p-0">
          <div className="grid grid-cols-2">
            <div className="bg-primary text-white px-4 py-3 text-center font-medium rounded-tl-lg">
              配方編號
            </div>
            <div className="bg-primary text-white px-4 py-3 text-center font-medium rounded-tr-lg">
              配方名稱
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {formulas.map((formula) => (
              <div
                key={formula.id}
                className={`grid grid-cols-2 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedFormula === formula.id ? "bg-purple-50" : ""
                }`}
                onClick={() => onFormulaSelect(formula.id)}
              >
                <div className="px-4 py-3 text-sm border-r">
                  {formula.id}
                </div>
                <div className="px-4 py-3 text-sm">
                  {formula.variants.map((variant, vIndex) => (
                    <div key={vIndex} className="mb-1 last:mb-0">
                      {variant}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
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