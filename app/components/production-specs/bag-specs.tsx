"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit } from "lucide-react"

export default function BagSpecs() {
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
              <Input className="w-20 h-8 text-sm" placeholder="" />
              <span className="text-sm text-gray-600">mm</span>
            </div>
          </div>
          
          {/* 寬度 */}
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">寬度</div>
            <div className="flex items-center space-x-2">
              <Input className="w-20 h-8 text-sm" placeholder="" />
              <span className="text-sm text-gray-600">mm</span>
            </div>
          </div>
          
          {/* 連結折角 */}
          <div className="bg-white p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-20 text-center mb-2">連結折角</div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 min-w-12">總寬</span>
                <Input className="w-16 h-6 text-sm" placeholder="" />
                <span className="text-sm text-gray-600">cm</span>
                <span className="text-sm text-gray-600 ml-4">面</span>
                <Input className="w-16 h-6 text-sm" placeholder="" />
                <span className="text-sm text-gray-600">cm</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 min-w-12">折</span>
                <Input className="w-16 h-6 text-sm" placeholder="" />
                <span className="text-sm text-gray-600">cm</span>
                <span className="text-sm text-gray-600 ml-4">一邊折</span>
                <Input className="w-16 h-6 text-sm" placeholder="" />
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
            <Select defaultValue="染色">
              <SelectTrigger className="w-32 h-8 text-sm select-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="染色">染色</SelectItem>
                <SelectItem value="未染色">未染色</SelectItem>
              </SelectContent>
            </Select>
            <Input className="w-24 h-8 text-sm" placeholder="填值" />
          </div>
          
          {/* 處理 */}
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">處理</div>
            <Select defaultValue="中間">
              <SelectTrigger className="w-32 h-8 text-sm select-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="中間">中間</SelectItem>
                <SelectItem value="其他">其他</SelectItem>
              </SelectContent>
            </Select>
            <Input className="w-24 h-8 text-sm" placeholder="填值" />
          </div>
          
          {/* 剖邊收捲 */}
          <div className="flex items-center space-x-4 bg-white p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-20 text-center">剖邊收捲</div>
            <Select defaultValue="其他">
              <SelectTrigger className="w-32 h-8 text-sm select-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="其他">其他</SelectItem>
                <SelectItem value="標準">標準</SelectItem>
              </SelectContent>
            </Select>
            <Input className="w-24 h-8 text-sm" placeholder="填值" />
          </div>
          
          {/* 修邊 */}
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">修邊</div>
            <Select defaultValue="其他">
              <SelectTrigger className="w-32 h-8 text-sm select-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="其他">其他</SelectItem>
                <SelectItem value="標準">標準</SelectItem>
              </SelectContent>
            </Select>
            <Input className="w-24 h-8 text-sm" placeholder="填值" />
          </div>
          
          {/* 連結印刷 */}
          <div className="bg-white p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-20 text-center mb-2">連結印刷</div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 min-w-8">印</span>
                <Input className="w-16 h-6 text-sm" placeholder="" />
                <span className="text-sm text-gray-600 ml-4">色</span>
                <Input className="w-16 h-6 text-sm" placeholder="" />
                <span className="text-sm text-gray-600 ml-4">面</span>
                <Input className="w-16 h-6 text-sm" placeholder="" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 min-w-12">版長</span>
                <Input className="w-16 h-6 text-sm" placeholder="" />
                <span className="text-sm text-gray-600">mm/圓周</span>
                <Input className="w-16 h-6 text-sm ml-2" placeholder="" />
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
