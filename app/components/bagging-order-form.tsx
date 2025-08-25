"use client"

import { Upload } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface BaggingOrderFormProps {
  orderData?: {
    orderInfo: {
      customerName: string
      customerCode: string
      productCode: string
      productName: string
      orderQuantity: string
      orderUnit1: string
      orderQuantity2: string
      orderUnit2: string
      deliveryDate: string
      formulaNumber: string
      sampleFile: string
    }
  }
}

export default function BaggingOrderForm({ orderData }: BaggingOrderFormProps = {}) {
  const [formData, setFormData] = useState({
    customerName: orderData?.orderInfo?.customerName || "譯加/KP0510",
    customerCode: orderData?.orderInfo?.customerCode || "KP0510",
    productCode: orderData?.orderInfo?.productCode || "P0510-A03022",
    productName: orderData?.orderInfo?.productName || "鮮自然2024/厚62u",
    orderQuantity: orderData?.orderInfo?.orderQuantity || "12800",
    orderUnit1: orderData?.orderInfo?.orderUnit1 || "只",
    orderQuantity2: orderData?.orderInfo?.orderQuantity2 || "20",
    orderUnit2: orderData?.orderInfo?.orderUnit2 || "箱",
    deliveryDate: orderData?.orderInfo?.deliveryDate || "114/07/21",
    formulaNumber: orderData?.orderInfo?.formulaNumber || "EW-28-1",
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
            <div className="flex h-10 w-full px-3 py-2 text-base md:text-sm flex-1 bg-gray-100 items-center border-b-2 border-gray-400">
              {formData.customerName}
            </div>
            
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">編號</div>
            <div className="flex h-10 w-full px-3 py-2 text-base md:text-sm flex-1 bg-gray-100 items-center border-b-2 border-gray-400">
              {formData.customerCode}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">產品編號</div>
            <div className="flex h-10 w-full px-3 py-2 text-base md:text-sm flex-1 bg-gray-100 items-center border-b-2 border-gray-400">
              {formData.productCode}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">品名</div>
            <div className="flex h-10 w-full px-3 py-2 text-base md:text-sm flex-1 bg-gray-100 items-center border-b-2 border-gray-400">
              {formData.productName}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">訂製數量</div>
            <div className="flex h-10 w-full px-3 py-2 text-base md:text-sm flex-1 bg-gray-100 items-center border-b-2 border-gray-400">
              {formData.orderQuantity}
            </div>
            <div className="flex h-10 items-center justify-between px-3 py-2 text-sm w-20 bg-gray-100 border-b-2 border-gray-400">
              <span>{formData.orderUnit1}</span>
            </div>
            <div className="flex h-10 px-3 py-2 text-base md:text-sm w-20 bg-gray-100 items-center border-b-2 border-gray-400">
              {formData.orderQuantity2}
            </div>
            <div className="flex h-10 items-center justify-between px-3 py-2 text-sm w-20 bg-gray-100 border-b-2 border-gray-400">
              <span>{formData.orderUnit2}</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">交貨日期</div>
            <div className="flex h-10 w-full px-3 py-2 text-base md:text-sm flex-1 bg-gray-100 items-center border-b-2 border-gray-400">
              {formData.deliveryDate}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">配方編號</div>
            <div className="flex h-10 w-full px-3 py-2 text-base md:text-sm flex-1 bg-gray-100 items-center border-b-2 border-gray-400">
              {formData.formulaNumber}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">樣品/圖稿</div>
            <div className="flex items-center space-x-2 flex-1">
              <div className="flex h-10 w-full px-3 py-2 text-base md:text-sm flex-1 bg-gray-100 items-center border-b-2 border-gray-400">
                樣品圖稿.jpg
              </div>
              <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 bg-gray-100">
                <Upload className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
