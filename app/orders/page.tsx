"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import OrderForm from "../components/order-form"
import CreatingCategoryOrder from "../components/creating-category-order"
import ProductionSpecs from "../components/production-specs"
import { ProductionSpecsProvider } from "../contexts/production-specs-context"

export default function OrdersPage() {
  const [pageOpacity, setPageOpacity] = useState(0)
  const [orderNumber, setOrderNumber] = useState("K01140414001")
  const [orderDate, setOrderDate] = useState("114/03/20")

  useEffect(() => {
    // 組件掛載後開始淡入
    setTimeout(() => setPageOpacity(1), 50)
  }, [])
  
  return (
    <ProductionSpecsProvider>
      <div 
        className="middle-col-outer-wrap flex-1 transition-all duration-300 ease-in-out"
        style={{ opacity: pageOpacity }}
      >
        {/* Header */}
        <div className="bg-gray-600 text-white px-6 py-4 mb-6">
          <div className="flex items-center space-x-2 text-sm">
            <span>業務課</span>
            <span>{">"}</span>
            <span>訂製單記錄</span>
          </div>
        </div>

        {/* Order Header */}
        <div className="order-header-wrap">
          <div className="bg-theme-gray text-white px-6 py-3 mb-6 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="font-medium">訂單編號</span>
              <Input 
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-48 h-8 text-sm bg-white text-gray-900 border-0"
                placeholder="請輸入訂單編號"
              />
            </div>
          </div>

          <div className="px-6 py-3 mb-6 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm">日期:</span>
              <Input 
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
                className="w-32 h-8 text-sm border border-gray-300"
                placeholder="請輸入日期"
              />
            </div>
          </div>
        </div>
        
        {/* Order Form */}
        <OrderForm />
        <CreatingCategoryOrder />

        {/* Production Specifications */}
        <ProductionSpecs />
      </div>
    </ProductionSpecsProvider>
  )
} 