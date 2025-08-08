"use client"

import { useState, useEffect } from "react"
import OrderForm from "../components/order-form"
import CreatingCategoryOrder from "../components/creating-category-order"
import ProductionSpecs from "../components/production-specs"

export default function OrdersPage() {
  const [pageOpacity, setPageOpacity] = useState(0)

  useEffect(() => {
    // 組件掛載後開始淡入
    setTimeout(() => setPageOpacity(1), 50)
  }, [])
  return (
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
          <span className="font-medium">訂單編號 K01140414001</span>
        </div>

        <div className="px-6 py-3 mb-6 flex justify-between items-center">
          <span className="text-sm">日期: 114/03/20</span>
        </div>
      </div>
      
      {/* Order Form */}
      <OrderForm />
      <CreatingCategoryOrder />

      {/* Production Specifications */}
      <ProductionSpecs />
    </div>
  )
} 