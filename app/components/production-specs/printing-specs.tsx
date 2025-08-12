"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PrintingSpecs() {
  return (
    <div className="grid grid-cols-[1fr_0.75fr] gap-6">
      <div>
        <div className="bg-theme-gray text-white px-4 py-2 text-center font-medium">
          生產規格描述
        </div>
        <div className="bg-gray-100 p-4 space-y-3 production-spec-form">
          {/* 印刷 */}
          <div className="flex items-center space-x-4 bg-white p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">印刷</div>
            <div className="flex items-center space-x-2">
              <Input className="w-12 h-8 text-sm" placeholder="2" />
              <span className="text-sm text-gray-600">色</span>
              <Input className="w-16 h-8 text-sm" placeholder="" />
              <span className="text-sm text-gray-600">面</span>
            </div>
          </div>
          
          {/* 圓周 */}
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">圓周</div>
            <div className="flex items-center space-x-2">
              <Input className="w-20 h-8 text-sm" placeholder="" />
              <span className="text-sm text-gray-600">mm</span>
            </div>
          </div>
          
          {/* 版長 */}
          <div className="flex items-center space-x-4 bg-white p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">版長</div>
            <div className="flex items-center space-x-2">
              <Input className="w-20 h-8 text-sm" placeholder="" />
              <span className="text-sm text-gray-600">mm</span>
            </div>
          </div>
          
          {/* 條碼 */}
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">條碼</div>
            <div className="flex items-center space-x-2">
              <Input className="w-40 h-8 text-sm" placeholder="4712425028076" />
            </div>
          </div>
          
          {/* 料膜 */}
          <div className="flex items-center space-x-4 bg-white p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">料膜</div>
            <Select defaultValue="外購">
              <SelectTrigger className="w-32 h-8 text-sm select-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="外購">外購</SelectItem>
                <SelectItem value="自製">自製</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* 外購廠商名稱 */}
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-24 text-center">外購廠商名稱</div>
            <div className="flex items-center space-x-2">
              <Input className="w-40 h-8 text-sm" placeholder="" />
            </div>
          </div>
          
          {/* 材質 */}
          <div className="flex items-center space-x-4 bg-white p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">材質</div>
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
          
          {/* 厚度 */}
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">厚度</div>
            <div className="flex items-center space-x-2">
              <Input className="w-20 h-8 text-sm" placeholder="" />
              <span className="text-sm text-gray-600">u</span>
            </div>
          </div>
          
          {/* 膜寬 */}
          <div className="flex items-center space-x-4 bg-white p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">膜寬</div>
            <div className="flex items-center space-x-2">
              <Input className="w-20 h-8 text-sm" placeholder="" />
              <span className="text-sm text-gray-600">cm</span>
            </div>
          </div>
          
          {/* 數量 */}
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center mb-2">數量 (擇一)</div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Input className="w-20 h-8 text-sm" placeholder="3000" />
                <span className="text-sm text-gray-600">m</span>
                <span className="text-sm text-gray-600">X</span>
                <Input className="w-12 h-8 text-sm" placeholder="2" />
                <span className="text-sm text-gray-600">卷</span>
              </div>
              <div className="flex items-center space-x-2">
                <Input className="w-20 h-8 text-sm" placeholder="" />
                <span className="text-sm text-gray-600">Kgs</span>
                <span className="text-sm text-gray-600">X</span>
                <Input className="w-12 h-8 text-sm" placeholder="" />
                <span className="text-sm text-gray-600">卷</span>
              </div>
            </div>
          </div>
          
          {/* 油墨 */}
          <div className="bg-white p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center mb-2">油墨</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-600">1.</span>
                <Input className="w-16 h-6 text-sm" placeholder="特桔" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-600">2.</span>
                <Input className="w-16 h-6 text-sm" placeholder="黑" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-600">3.</span>
                <Input className="w-16 h-6 text-sm" placeholder="" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-600">4.</span>
                <Input className="w-16 h-6 text-sm" placeholder="" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-600">5.</span>
                <Input className="w-16 h-6 text-sm" placeholder="" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-600">6.</span>
                <Input className="w-16 h-6 text-sm" placeholder="" />
              </div>
            </div>
          </div>
          
          {/* 位置 */}
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">位置</div>
            <Select defaultValue="距左邊">
              <SelectTrigger className="w-32 h-8 text-sm select-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="距左邊">距左邊</SelectItem>
                <SelectItem value="其他">其他</SelectItem>
              </SelectContent>
            </Select>
            <Input className="w-16 h-8 text-sm" placeholder="" />
            <span className="text-sm text-gray-600">cm</span>
          </div>
          
          {/* 位置其他 */}
          <div className="flex items-center space-x-4 bg-white p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-20 text-center">位置其他</div>
            <div className="flex items-center space-x-2">
              <Input className="w-40 h-8 text-sm" placeholder="" />
            </div>
          </div>
          
          {/* 捲收方向 */}
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-20 text-center">捲收方向</div>
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
        </div>
      </div>
      <div>
        <div className="bg-theme-gray text-white px-4 py-2 text-center font-medium">
          其他生產條件
        </div>
        <div className="bg-gray-100 p-4">
          <div className="text-sm space-y-2 mb-3">
            <div>約260k</div>
          </div>
          <div className="text-sm space-y-2">
            <div>印3000M*2R / 約 260K</div>
            <div>條碼: 4712425028076</div>
          </div>
        </div>
      </div>
    </div>
  )
}
