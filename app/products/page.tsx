"use client"

import { useState, useEffect } from "react"

export default function ProductsPage() {
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
          <span>產品資訊</span>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">產品資訊</h2>
          <p className="text-gray-500">此功能正在開發中...</p>
        </div>
      </div>
    </div>
  )
} 