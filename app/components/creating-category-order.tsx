"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Trash2, X } from "lucide-react"

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  <X className="w-4 h-4 mr-2" />
                  清除全部
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600 cursor-pointer justify-center"
                  onClick={clearAllCounts}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  確認清除全部
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="grid grid-cols-5 gap-6">
            {/* 抽袋 */}
            <div className="text-center">
              <button 
                className="w-20 h-12 rounded-lg text-white font-bold text-base border-none cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 mb-3"
                style={{ backgroundColor: '#e49cc0' }}
                onClick={() => incrementCount('bag')}
              >
                + 抽袋
              </button>
              <div className="flex justify-center items-center">
                <div className="border-b-2 border-gray-400 pb-1 text-base font-bold" style={{ color: '#666' }}>
                  {counts.bag}
                </div>
                <span className="ml-2 text-xs text-gray-600">張表單</span>
              </div>
            </div>
            
            {/* 印刷 */}
            <div className="text-center">
              <button 
                className="w-20 h-12 rounded-lg text-white font-bold text-base border-none cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 mb-3"
                style={{ backgroundColor: '#9ccee4' }}
                onClick={() => incrementCount('printing')}
              >
                + 印刷
              </button>
              <div className="flex justify-center items-center">
                <div className="border-b-2 border-gray-400 pb-1 text-base font-bold" style={{ color: '#666' }}>
                  {counts.printing}
                </div>
                <span className="ml-2 text-xs text-gray-600">張表單</span>
              </div>
            </div>
            
            {/* 貼合 */}
            <div className="text-center">
              <button 
                className="w-20 h-12 rounded-lg text-white font-bold text-base border-none cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 mb-3"
                style={{ backgroundColor: '#e4b49c' }}
                onClick={() => incrementCount('lamination')}
              >
                + 貼合
              </button>
              <div className="flex justify-center items-center">
                <div className="border-b-2 border-gray-400 pb-1 text-base font-bold" style={{ color: '#666' }}>
                  {counts.lamination}
                </div>
                <span className="ml-2 text-xs text-gray-600">張表單</span>
              </div>
            </div>
            
            {/* 分條 */}
            <div className="text-center">
              <button 
                className="w-20 h-12 rounded-lg text-white font-bold text-base border-none cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 mb-3"
                style={{ backgroundColor: '#9ee7a6' }}
                onClick={() => incrementCount('slitting')}
              >
                + 分條
              </button>
              <div className="flex justify-center items-center">
                <div className="border-b-2 border-gray-400 pb-1 text-base font-bold" style={{ color: '#666' }}>
                  {counts.slitting}
                </div>
                <span className="ml-2 text-xs text-gray-600">張表單</span>
              </div>
            </div>
            
            {/* 裁袋 */}
            <div className="text-center">
              <button 
                className="w-20 h-12 rounded-lg text-white font-bold text-base border-none cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 mb-3"
                style={{ backgroundColor: '#fccc48' }}
                onClick={() => incrementCount('cutting')}
              >
                + 裁袋
              </button>
              <div className="flex justify-center items-center">
                <div className="border-b-2 border-gray-400 pb-1 text-base font-bold" style={{ color: '#666' }}>
                  {counts.cutting}
                </div>
                <span className="ml-2 text-xs text-gray-600">張表單</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
