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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ChevronDown, Trash2, X } from "lucide-react"
import { useBaggingProductionSpecs } from "@/app/contexts/bagging-production-specs-context"

export default function BaggingCreatingCategoryOrder() {
  const { productionSpecs, addProductionSpec, clearAllProductionSpecs } = useBaggingProductionSpecs()
  const [showClearAllDialog, setShowClearAllDialog] = useState(false)
  
  // 计算各个类型的数量
  const counts = {
    bag: productionSpecs.filter(item => item.type === 'bag').length,
    printing: productionSpecs.filter(item => item.type === 'printing').length,
    lamination: productionSpecs.filter(item => item.type === 'lamination').length,
    slitting: productionSpecs.filter(item => item.type === 'slitting').length,
    cutting: productionSpecs.filter(item => item.type === 'cutting').length
  }

  // 计算总表单数量
  const totalCount = productionSpecs.length

  const handleClearAllClick = () => {
    setShowClearAllDialog(true)
  }

  const handleClearAllConfirm = () => {
    clearAllProductionSpecs()
    setShowClearAllDialog(false)
  }

  const handleClearAllCancel = () => {
    setShowClearAllDialog(false)
  }

  return (
    <>
      <div className="px-6 mb-8 space-y-6">
        {/* 創建課別表單 Section */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-800">新增表單</h2>
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
                    onClick={handleClearAllClick}
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
                  onClick={() => addProductionSpec('bag')}
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
                  onClick={() => addProductionSpec('printing')}
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
                  onClick={() => addProductionSpec('lamination')}
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
                  style={{ backgroundColor: '#87bf8d' }}
                  onClick={() => addProductionSpec('slitting')}
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
                  style={{ backgroundColor: 'rgb(188 171 103)' }}
                  onClick={() => addProductionSpec('cutting')}
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

      {/* 清除全部確認對話框 */}
      <AlertDialog open={showClearAllDialog} onOpenChange={setShowClearAllDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確認清除全部</AlertDialogTitle>
            <AlertDialogDescription>
              您確定要清除所有生產規格表單嗎？此操作無法撤銷。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleClearAllCancel}>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearAllConfirm} className="bg-red-500 hover:bg-red-600">
              確認清除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
