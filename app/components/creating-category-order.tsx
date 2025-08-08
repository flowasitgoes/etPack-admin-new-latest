"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CreatingCategoryOrder() {
  // 各个生产步骤的计数状态
  const [counts, setCounts] = useState({
    bag: 0,      // 抽袋
    printing: 0, // 印刷
    lamination: 0, // 贴合
    slitting: 0, // 分条
    cutting: 0   // 裁袋
  })

  // 增加计数的函数
  const incrementCount = (type: keyof typeof counts) => {
    setCounts(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }))
  }

  // 清除全部计数
  const clearAllCounts = () => {
    setCounts({
      bag: 0,
      printing: 0,
      lamination: 0,
      slitting: 0,
      cutting: 0
    })
  }
  return (
    <div className="px-6 mb-8 space-y-6">
      {/* 生產流程 Section */}
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-800">生產流程</h2>
                        <Button
              variant="destructive"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={clearAllCounts}
            >
              清除全部
            </Button>
          </div>
          
          <div className="grid grid-cols-5 gap-6">
            {/* 抽袋 */}
            <div className="text-center">
              <button 
                className="w-20 h-20 rounded-full text-white font-bold text-lg border-none cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: '#e49cc0' }}
                onClick={() => incrementCount('bag')}
              >
                抽袋
              </button>
            </div>
            
            {/* 印刷 */}
            <div className="text-center">
              <button 
                className="w-20 h-20 rounded-full text-white font-bold text-lg border-none cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: '#9ccee4' }}
                onClick={() => incrementCount('printing')}
              >
                印刷
              </button>
            </div>
            
            {/* 貼合 */}
            <div className="text-center">
              <button 
                className="w-20 h-20 rounded-full text-white font-bold text-lg border-none cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: '#e4b49c' }}
                onClick={() => incrementCount('lamination')}
              >
                貼合
              </button>
            </div>
            
            {/* 分條 */}
            <div className="text-center">
              <button 
                className="w-20 h-20 rounded-full text-white font-bold text-lg border-none cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: '#9ee7a6' }}
                onClick={() => incrementCount('slitting')}
              >
                分條
              </button>
            </div>
            
            {/* 裁袋 */}
            <div className="text-center">
              <button 
                className="w-20 h-20 rounded-full text-white font-bold text-lg border-none cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: '#fccc48' }}
                onClick={() => incrementCount('cutting')}
              >
                裁袋
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 實體視覺化 Section */}
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-6 text-center">實體視覺化</h2>
          
          <div className="grid grid-cols-5 gap-8">
            {/* 抽袋 */}
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-800 mb-4">抽袋</h3>
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-gray-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
                  {counts.bag}
                </div>
              </div>
            </div>
            
            {/* 印刷 */}
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-800 mb-4">印刷</h3>
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-gray-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
                  {counts.printing}
                </div>
              </div>
            </div>
            
            {/* 貼合 */}
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-800 mb-4">貼合</h3>
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-gray-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
                  {counts.lamination}
                </div>
              </div>
            </div>
            
            {/* 分條 */}
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-800 mb-4">分條</h3>
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-gray-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
                  {counts.slitting}
                </div>
              </div>
            </div>
            
            {/* 裁袋 */}
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-800 mb-4">裁袋</h3>
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-gray-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
                  {counts.cutting}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
