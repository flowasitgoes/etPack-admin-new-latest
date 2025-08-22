"use client"

import { Edit } from "lucide-react"

export default function BaggingBagSpecs() {
  return (
    <div className="grid grid-cols-[1fr_0.75fr] gap-6">
      <div>
        <div className="bg-theme-gray text-white px-4 py-2 text-center font-medium">
          生產規格描述
        </div>
        <div className="bg-gray-100 p-4 space-y-3 production-spec-form">
          {/* 厚度 */}
          <div className="flex items-center space-x-4 bg-white p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">厚度</div>
            <div className="flex items-center space-x-2">
              <div className="flex px-3 py-2 text-sm w-20 h-8 bg-gray-100 items-center border-b-2 border-gray-400">
                0.05
              </div>
              <span className="text-sm text-gray-600">mm</span>
            </div>
          </div>
          
          {/* 寬度 */}
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">寬度</div>
            <div className="flex items-center space-x-2">
              <div className="flex px-3 py-2 text-sm w-20 h-8 bg-gray-100 items-center border-b-2 border-gray-400">
                82
              </div>
              <span className="text-sm text-gray-600">mm</span>
            </div>
          </div>
          
          {/* 連結折角 */}
          <div className="bg-white p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-20 text-center mb-2">連結折角</div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 min-w-12">總寬</span>
                <div className="flex px-3 py-2 text-sm w-16 h-6 bg-gray-100 items-center border-b-2 border-gray-400">
                  41.2
                </div>
                <span className="text-sm text-gray-600">cm</span>
                <span className="text-sm text-gray-600 ml-4">面</span>
                <div className="flex px-3 py-2 text-sm w-16 h-6 bg-gray-100 items-center border-b-2 border-gray-400">
                  14.5
                </div>
                <span className="text-sm text-gray-600">cm</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 min-w-12">折</span>
                <div className="flex px-3 py-2 text-sm w-16 h-6 bg-gray-100 items-center border-b-2 border-gray-400">
                  2.5
                </div>
                <span className="text-sm text-gray-600">cm</span>
                <span className="text-sm text-gray-600 ml-4">一邊折</span>
                <div className="flex px-3 py-2 text-sm w-16 h-6 bg-gray-100 items-center border-b-2 border-gray-400">
                  1.2
                </div>
                <span className="text-sm text-gray-600">cm</span>
              </div>
            </div>
          </div>
          
          {/* 配方 */}
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">配方</div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">EW-28-1</span>
              <Edit className="w-3 h-3 text-gray-400" />
            </div>
          </div>
          
          {/* 染色 */}
          <div className="flex items-center space-x-4 bg-white p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">染色</div>
            <div className="flex items-center justify-between px-3 py-2 w-32 h-8 text-sm bg-gray-100 border-b-2 border-gray-400">
              <span>透明</span>
            </div>
            <div className="flex px-3 py-2 text-sm w-24 h-8 bg-gray-100 items-center border-b-2 border-gray-400">
              染白
            </div>
          </div>
          
          {/* 處理 */}
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">處理</div>
            <div className="flex items-center justify-between px-3 py-2 w-32 h-8 text-sm bg-gray-100 border-b-2 border-gray-400">
              <span>全處理</span>
            </div>
            <div className="flex px-3 py-2 text-sm w-24 h-8 bg-gray-100 items-center border-b-2 border-gray-400">
              雙理
            </div>
          </div>
          
          {/* 剖邊收捲 */}
          <div className="flex items-center space-x-4 bg-white p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-20 text-center">剖邊收捲</div>
            <div className="flex items-center justify-between px-3 py-2 w-32 h-8 text-sm bg-gray-100 border-b-2 border-gray-400">
              <span>雙剖雙收</span>
            </div>
            <div className="flex px-3 py-2 text-sm w-24 h-8 bg-gray-100 items-center border-b-2 border-gray-400">
              標準
            </div>
          </div>
          
          {/* 修邊 */}
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">修邊</div>
            <div className="flex items-center justify-between px-3 py-2 w-32 h-8 text-sm bg-gray-100 border-b-2 border-gray-400">
              <span>標準</span>
            </div>
            <div className="flex px-3 py-2 text-sm w-24 h-8 bg-gray-100 items-center border-b-2 border-gray-400">
              無
            </div>
          </div>
          
          {/* 連結印刷 */}
          <div className="bg-white p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-20 text-center mb-2">連結印刷</div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 min-w-8">印</span>
                <div className="flex px-3 py-2 text-sm w-16 h-6 bg-gray-100 items-center border-b-2 border-gray-400">
                  4
                </div>
                <span className="text-sm text-gray-600 ml-4">色</span>
                <div className="flex px-3 py-2 text-sm w-16 h-6 bg-gray-100 items-center border-b-2 border-gray-400">
                  2
                </div>
                <span className="text-sm text-gray-600 ml-4">面</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 min-w-12">版長</span>
                <div className="flex px-3 py-2 text-sm w-16 h-6 bg-gray-100 items-center border-b-2 border-gray-400">
                  420
                </div>
                <span className="text-sm text-gray-600">mm/圓周</span>
                <div className="flex px-3 py-2 text-sm w-16 h-6 bg-gray-100 items-center border-b-2 border-gray-400 ml-2">
                  42
                </div>
                <span className="text-sm text-gray-600">cm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-theme-gray text-white px-4 py-2 text-center font-medium">
          其他生產條件
        </div>
        <div className="bg-gray-100 p-4">
          <div className="text-sm space-y-2">
            <div>抽3000M*2R / 約 260K</div>
            <div>染白雙理</div>
          </div>
        </div>
      </div>
    </div>
  )
}
