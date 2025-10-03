"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type Formula } from "../lib/formula-service"

interface FormulaEditFormProps {
  formula: Formula
  onSave: (formula: Formula) => void
  onCancel: () => void
}

export default function FormulaEditForm({
  formula,
  onSave,
  onCancel
}: FormulaEditFormProps) {
  const [formData, setFormData] = useState({
    id: formula.id,
    name: formula.name,
    variants: [...formula.variants]
  })

  useEffect(() => {
    setFormData({
      id: formula.id,
      name: formula.name,
      variants: [...formula.variants]
    })
  }, [formula])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleVariantChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) => 
        i === index ? value : variant
      )
    }))
  }

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, ""]
    }))
  }

  const removeVariant = (index: number) => {
    if (formData.variants.length > 1) {
      setFormData(prev => ({
        ...prev,
        variants: prev.variants.filter((_, i) => i !== index)
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.id.trim() && formData.name.trim()) {
      // 過濾掉空的配方名稱
      const filteredVariants = formData.variants.filter(v => v.trim())
      
      const updatedFormula: Formula = {
        ...formula,
        id: formData.id,
        name: formData.name,
        variants: filteredVariants,
        updatedAt: new Date().toISOString()
      }
      
      onSave(updatedFormula)
    }
  }

  return (
    <div className="px-6 mb-6">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* 配方基本資料 */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6 pb-3">
            <div className="flex items-center justify-between">
              <div className="tracking-tight text-lg font-semibold text-gray-800">修改配方資料</div>
            </div>
          </div>
          <div className="p-6 pt-0 space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="formulaId" className="text-sm font-medium text-gray-700">
                  配方編號:
                </Label>
                <Input
                  id="formulaId"
                  value={formData.id}
                  onChange={(e) => handleInputChange("id", e.target.value)}
                  placeholder="請輸入配方編號"
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="formulaName" className="text-sm font-medium text-gray-700">
                  配方名稱:
                </Label>
                <Input
                  id="formulaName"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="請輸入配方名稱"
                  className="w-full"
                  required
                />
                
                {/* 動態配方名稱輸入欄位 - 插入到按鈕上方 */}
                {formData.variants.length > 1 && (
                  <div className="space-y-2">
                    {formData.variants.slice(1).map((variant, index) => (
                      <div key={index + 1} className="flex items-center gap-2">
                        <Input
                          value={variant}
                          onChange={(e) => handleVariantChange(index + 1, e.target.value)}
                          placeholder="請輸入配方名稱"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => removeVariant(index + 1)}
                          className="px-2 py-1 text-red-600 hover:bg-red-50"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={addVariant}
                  className="inline-flex items-center gap-1 text-primary hover:bg-primary/10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  新增配方名稱
                </Button>
              </div>
            </div>
            
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-10 px-4 py-2 bg-primary-dark hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 text-white"
          >
            確認
          </Button>
        </div>
      </form>
    </div>
  )
}
