"use client"

import { useState, useEffect } from "react"
import { Calendar } from "lucide-react"
import BaggingOrderForm from "../../components/bagging-order-form"
import BaggingProductionSpecs from "../../components/bagging-production-specs"
import { BaggingProductionSpecsProvider } from "../../contexts/bagging-production-specs-context"

export default function OrderRecordPage() {
  const [currentDateTime] = useState(() => {
    const now = new Date()
    const year = now.getFullYear() - 1911 // 民國年
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${year}/${month}/${day} ${hours}:${minutes}`
  })

  const [pageOpacity, setPageOpacity] = useState(0)

  useEffect(() => {
    // 組件掛載後開始淡入
    setTimeout(() => setPageOpacity(1), 50)
  }, [])

  return (
    <BaggingProductionSpecsProvider>
      <div 
        className="order-record-container space-y-6 transition-all duration-300 ease-in-out"
        style={{ opacity: pageOpacity }}
      >
        {/* Header */}
        <div className="flex justify-between items-center text-white p-4" style={{ background: '#76514c' }}>
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">抽袋課</h1>
            <span className="text-lg">訂製單記錄</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span className="text-sm">{currentDateTime}</span>
          </div>
        </div>

        {/* Order Header */}
        <div className="order-header-wrap">
          <div className="bg-gray-600 text-white px-6 py-3 mb-6 flex justify-between items-center">
            <span className="font-medium">訂單編號 K01140414001</span>
          </div>

          <div className="px-6 py-3 mb-6 flex justify-between items-center">
            <span className="text-sm">日期: 114/03/20</span>
          </div>
        </div>
        
        {/* Order Form */}
        <BaggingOrderForm />

        {/* Production Specifications */}
        <BaggingProductionSpecs />
      </div>
    </BaggingProductionSpecsProvider>
  )
}
