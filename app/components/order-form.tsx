"use client"

import { Upload } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function OrderForm() {
  const [formData, setFormData] = useState({
    customerName: "",
    customerCode: "",
    productCode: "",
    productName: "",
    orderQuantity: "",
    orderUnit1: "只",
    orderUnit2: "箱",
    deliveryDate: "",
    formulaNumber: "",
    sampleFile: null as File | null
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'image/jpeg') {
      setFormData(prev => ({
        ...prev,
        sampleFile: file
      }))
    }
  }

  const quantityUnits1 = [
    { value: "米", label: "米" },
    { value: "公斤", label: "公斤" },
    { value: "只", label: "只" }
  ]

  const quantityUnits2 = [
    { value: "箱", label: "箱" },
    { value: "卷", label: "卷" }
  ]

  return (
    <div className="mid-col-order-details-and-prod-spec">
      {/* Order Details Form */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">客戶名稱</div>
            <Input
              value={formData.customerName}
              onChange={(e) => handleInputChange('customerName', e.target.value)}
              className="flex-1"
              placeholder="輸入客戶名稱"
            />
            
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">編號</div>
            <Input
              value={formData.customerCode}
              onChange={(e) => handleInputChange('customerCode', e.target.value)}
              className="flex-1"
              placeholder="輸入編號"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">產品編號</div>
            <Input
              value={formData.productCode}
              onChange={(e) => handleInputChange('productCode', e.target.value)}
              className="flex-1"
              placeholder="輸入產品編號"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">品名</div>
            <Input
              value={formData.productName}
              onChange={(e) => handleInputChange('productName', e.target.value)}
              className="flex-1"
              placeholder="輸入品名"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">訂製數量</div>
            <Input
              value={formData.orderQuantity}
              onChange={(e) => handleInputChange('orderQuantity', e.target.value)}
              className="flex-1"
              placeholder="輸入數量"
            />
            <Select value={formData.orderUnit1} onValueChange={(value) => handleInputChange('orderUnit1', value)}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {quantityUnits1.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={formData.orderUnit2} onValueChange={(value) => handleInputChange('orderUnit2', value)}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {quantityUnits2.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">交貨日期</div>
            <Input
              value={formData.deliveryDate}
              onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
              className="flex-1"
              placeholder="輸入交貨日期"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">配方編號</div>
            <Input
              value={formData.formulaNumber}
              onChange={(e) => handleInputChange('formulaNumber', e.target.value)}
              className="flex-1"
              placeholder="輸入配方編號"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">樣品/圖稿</div>
            <div className="flex items-center space-x-2 flex-1">
              <Input
                type="file"
                accept=".jpg,.jpeg"
                onChange={handleFileUpload}
                className="flex-1"
                placeholder="選擇樣品或圖稿"
              />
              <Button variant="outline" size="sm" className="px-3">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 