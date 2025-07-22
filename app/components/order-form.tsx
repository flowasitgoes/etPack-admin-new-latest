"use client"

import { Edit } from "lucide-react"

export default function OrderForm() {
  return (
    <div className="mid-col-order-details-and-prod-spec">
      {/* Order Details Form */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">客戶名稱</div>
            <div className="flex items-center space-x-2">
              <span>和展/KW8010</span>
              <Edit className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">品名</div>
            <div className="flex items-center space-x-2">
              <span>阿昌8入染白豪字袋14.5*41.2cm</span>
              <Edit className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">訂製數量</div>
            <div className="flex items-center space-x-2">
              <span>12800 只 / 20箱</span>
              <Edit className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">單米重</div>
            <div className="flex items-center space-x-2">
              <span>54.11(單層)</span>
              <Edit className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">交貨日期</div>
            <div className="flex items-center space-x-2">
              <span>114/04/29</span>
              <Edit className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">配方編號</div>
            <div className="flex items-center space-x-2">
              <span>EW-28-1</span>
              <Edit className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium min-w-20">自訂義</div>
            <div className="flex items-center space-x-2">
              <span>W8010-B02001</span>
              <Edit className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 