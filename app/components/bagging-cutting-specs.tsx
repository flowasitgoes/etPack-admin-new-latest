"use client"

export default function BaggingCuttingSpecs() {
  return (
    <div className="grid grid-cols-[1fr_0.75fr] gap-6">
      <div>
        <div className="bg-theme-gray text-white px-4 py-2 text-center font-medium">
          生產規格描述
        </div>
        <div className="bg-gray-100 p-4 space-y-3 production-spec-form">
          <div className="flex items-center space-x-4 bg-white p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">袋型</div>
            <div className="flex items-center justify-between px-3 py-2 w-40 h-8 text-sm bg-gray-100 border-b-2 border-gray-400">
              <span>醫療平口袋</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded">
            <div className="text-sm text-gray-600">袋型</div>
            <div className="flex items-center justify-between px-3 py-2 w-40 h-8 text-sm bg-gray-100 border-b-2 border-gray-400">
              <span>標準袋型</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-white p-2 rounded">
            <div className="text-sm text-gray-600">印刷圖面</div>
            <div className="flex items-center justify-between px-3 py-2 w-32 h-8 text-sm bg-gray-100 border-b-2 border-gray-400">
              <span>標準圖面</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">袋長</span>
              <div className="flex px-3 py-2 text-sm w-20 h-8 bg-gray-100 items-center border-b-2 border-gray-400">20</div>
              <span className="text-sm text-gray-600">cm</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded">
            <div className="text-sm text-gray-600">數量</div>
            <div className="flex px-3 py-2 text-sm w-32 h-8 bg-gray-100 items-center border-b-2 border-gray-400">1000</div>
            <div className="flex items-center justify-between px-3 py-2 w-24 h-8 text-sm bg-gray-100 border-b-2 border-gray-400">
              <span>磅/捆</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-white p-2 rounded">
            <div className="text-sm text-gray-600">小包裝數量</div>
            <div className="flex px-3 py-2 text-sm w-20 h-8 bg-gray-100 items-center border-b-2 border-gray-400">50</div>
            <div className="flex items-center justify-between px-3 py-2 w-24 h-8 text-sm bg-gray-100 border-b-2 border-gray-400">
              <span>束</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded">
            <div className="text-sm text-gray-600">大包裝數量</div>
            <div className="flex px-3 py-2 text-sm w-20 h-8 bg-gray-100 items-center border-b-2 border-gray-400">20</div>
            <div className="flex items-center justify-between px-3 py-2 w-24 h-8 text-sm bg-gray-100 border-b-2 border-gray-400">
              <span>塑膠袋</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-white p-2 rounded">
            <div className="text-sm text-gray-600">膠帶顏色</div>
            <div className="flex items-center justify-between px-3 py-2 w-24 h-8 text-sm bg-gray-100 border-b-2 border-gray-400">
              <span>其他</span>
            </div>
            <div className="flex px-3 py-2 text-sm w-24 h-8 bg-gray-100 items-center border-b-2 border-gray-400">透明</div>
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
