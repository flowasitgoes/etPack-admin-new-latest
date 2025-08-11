"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CuttingSpecs() {
  return (
    <div className="grid grid-cols-[1fr_0.75fr] gap-6">
      <div>
        <div className="bg-theme-gray text-white px-4 py-2 text-center font-medium">
          生產規格描述
        </div>
        <div className="bg-gray-100 p-4 space-y-3 production-spec-form">
          {/* 袋型 */}
          <div className="flex items-center space-x-4 bg-white p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">袋型</div>
            <Select defaultValue="醫療平口袋">
              <SelectTrigger className="w-40 h-8 text-sm select-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="醫療平口袋">醫療平口袋</SelectItem>
                <SelectItem value="其他">其他</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* 袋型 */}
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded">
            <div className="text-sm text-gray-600">袋型</div>
            <Select defaultValue="請選擇">
              <SelectTrigger className="w-40 h-8 text-sm select-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="請選擇">請選擇</SelectItem>
                <SelectItem value="其他">其他</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* 印刷圖面 */}
          <div className="flex items-center space-x-4 bg-white p-2 rounded">
            <div className="text-sm text-gray-600">印刷圖面</div>
            <Select defaultValue="請選擇">
              <SelectTrigger className="w-32 h-8 text-sm select-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="請選擇">請選擇</SelectItem>
                <SelectItem value="其他">其他</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">袋長</span>
              <Input className="w-20 h-8 text-sm" placeholder="" />
              <span className="text-sm text-gray-600">cm</span>
            </div>
          </div>
          
          {/* 數量 */}
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded">
            <div className="text-sm text-gray-600">數量</div>
            <Input className="w-32 h-8 text-sm" placeholder="" />
            <Select defaultValue="磅/捆">
              <SelectTrigger className="w-24 h-8 text-sm select-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="磅/捆">磅/捆</SelectItem>
                <SelectItem value="其他">其他</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* 小包裝數量 */}
          <div className="flex items-center space-x-4 bg-white p-2 rounded">
            <div className="text-sm text-gray-600">小包裝數量</div>
            <Input className="w-20 h-8 text-sm" placeholder="" />
            <Select defaultValue="束">
              <SelectTrigger className="w-24 h-8 text-sm select-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="束">束</SelectItem>
                <SelectItem value="其他">其他</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* 大包裝數量 */}
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded">
            <div className="text-sm text-gray-600">大包裝數量</div>
            <Input className="w-20 h-8 text-sm" placeholder="" />
            <Select defaultValue="塑膠袋">
              <SelectTrigger className="w-24 h-8 text-sm select-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="塑膠袋">塑膠袋</SelectItem>
                <SelectItem value="其他">其他</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* 膠帶顏色 */}
          <div className="flex items-center space-x-4 bg-white p-2 rounded">
            <div className="text-sm text-gray-600">膠帶顏色</div>
            <Select defaultValue="其他">
              <SelectTrigger className="w-24 h-8 text-sm select-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="其他">其他</SelectItem>
                <SelectItem value="標準">標準</SelectItem>
              </SelectContent>
            </Select>
            <Input className="w-24 h-8 text-sm" placeholder="填值" />
          </div>
        </div>
      </div>
      <div>
        <div className="bg-theme-gray text-white px-4 py-2 text-center font-medium">
          其他生產條件
        </div>
        <div className="bg-gray-100 p-4">
          <div className="text-sm space-y-2">
            <div>塑膠扣方向成品: 短邊朝上</div>
            <div>長扣在上 短扣在下</div>
            <div>請拿2A紙箱.6層貼紙朝外</div>
          </div>
        </div>
      </div>
    </div>
  )
}
