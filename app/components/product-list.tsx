"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Product } from "../lib/product-service"

interface ProductListProps {
  products: Product[]
  selectedProduct: string
  sortBy: string
  onProductSelect: (productId: string) => void
  onSortChange: (sortBy: string) => void
  onEditClick: (product: Product) => void
  isEditing?: boolean
  editingProductId?: string
}

export default function ProductList({
  products,
  selectedProduct,
  sortBy,
  onProductSelect,
  onSortChange,
  onEditClick,
  isEditing = false,
  editingProductId = ""
}: ProductListProps) {
  // 獲取排序選項顯示文字
  const getSortOptionText = (option: string) => {
    switch (option) {
      case "name":
        return "名稱排序"
      case "number":
        return "編號排序"
      default:
        return "名稱排序"
    }
  }

  return (
    <div className="px-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">產品列表</h2>
        <div className="relative">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-40">
              <SelectValue>
                {getSortOptionText(sortBy)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">名稱排序</SelectItem>
              <SelectItem value="number">編號排序</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Table */}
      <Card className="mb-6">
        <CardContent className="p-0">
          <div className="grid grid-cols-3">
            <div className="bg-primary text-white px-4 py-3 text-center font-medium rounded-tl-lg">
              產品編號
            </div>
            <div className="bg-primary text-white px-4 py-3 text-center font-medium">
              品名
            </div>
            <div className="bg-primary text-white px-4 py-3 text-center font-medium rounded-tr-lg">
              操作
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {products.map((product) => {
              const isCurrentlyEditing = isEditing && editingProductId === product.id
              const isDisabled = isEditing && editingProductId !== product.id
              
              return (
                <div
                  key={product.id}
                  className={`grid grid-cols-3 border-b transition-colors ${
                    selectedProduct === product.id ? "bg-purple-50" : ""
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
                        onProductSelect(product.id)
                      }
                    }}
                  >
                    {product.id}
                  </div>
                  <div 
                    className={`px-4 py-3 text-sm border-r ${
                      isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    onClick={() => {
                      if (!isDisabled) {
                        onProductSelect(product.id)
                      }
                    }}
                  >
                    {product.variants.map((variant, vIndex) => (
                      <div key={vIndex} className="mb-1 last:mb-0">
                        {variant}
                      </div>
                    ))}
                  </div>
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
                      if (!isDisabled) {
                        onEditClick(product)
                      }
                    }}
                    disabled={isDisabled}
                  >
                    產品基本資料編輯
                  </Button>
                </div>
              </div>
            )
          })}
          </div>
        </CardContent>
      </Card>
      
      {/* 提示信息 - 只在沒有選擇產品時顯示 */}
      {!selectedProduct && products.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">點擊上方產品來查看歷史訂單記錄</p>
        </div>
      )}
    </div>
  )
} 