"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { type Product } from "../lib/product-service"

interface ProductEditFormProps {
  product: Product | null
  onSave: (updatedProduct: Product) => void
  onCancel: () => void
}

export default function ProductEditForm({
  product,
  onSave,
  onCancel
}: ProductEditFormProps) {
  const [formData, setFormData] = useState({
    id: "",
    variants: [""]
  })

  // 當產品改變時更新表單數據
  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        variants: [...product.variants]
      })
    }
  }, [product])

  const handleVariantChange = (index: number, value: string) => {
    const newVariants = [...formData.variants]
    newVariants[index] = value
    setFormData({ ...formData, variants: newVariants })
  }

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, ""]
    })
  }

  const removeVariant = (index: number) => {
    if (formData.variants.length > 1) {
      const newVariants = formData.variants.filter((_, i) => i !== index)
      setFormData({ ...formData, variants: newVariants })
    }
  }

  // 確保至少有一個變體
  const ensureMinimumVariants = () => {
    if (formData.variants.length === 0) {
      setFormData({ ...formData, variants: [""] })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (product) {
      const filteredVariants = formData.variants.filter(v => v.trim() !== "")
      if (filteredVariants.length === 0) {
        alert("請至少輸入一個產品變體")
        return
      }
      const updatedProduct: Product = {
        ...product,
        id: formData.id,
        name: filteredVariants[0], // 使用第一個變體作為品名
        variants: filteredVariants
      }
      onSave(updatedProduct)
    }
  }

  if (!product) {
    return null
  }

  return (
    <div className="w-80 bg-white p-6 shadow-lg border-l">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.id}
        </h3>
        <p className="text-sm text-gray-600">編輯產品基本資料</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 產品編號 */}
        <div className="space-y-2">
          <Label htmlFor="productId" className="text-sm font-medium text-gray-700">
            產品編號
          </Label>
          <Input
            id="productId"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            className="w-full"
            placeholder="輸入產品編號"
          />
        </div>

        {/* 產品變體 */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            產品變體 (品名)
          </Label>
          <div className="space-y-2">
            {formData.variants.map((variant, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  value={variant}
                  onChange={(e) => handleVariantChange(index, e.target.value)}
                  placeholder={index === 0 ? "主要品名" : `變體 ${index + 1}`}
                  className="flex-1"
                />
                {formData.variants.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeVariant(index)}
                    className="px-2 text-red-600 hover:text-red-700"
                  >
                    刪除
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addVariant}
              className="w-full"
            >
              新增變體
            </Button>
          </div>
        </div>

        {/* 按鈕區域 */}
        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            取消
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-primary-dark hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 text-white"
          >
            確認送出
          </Button>
        </div>
      </form>
    </div>
  )
} 