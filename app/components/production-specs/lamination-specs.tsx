"use client"

export default function LaminationSpecs() {
  return (
    <div className="grid grid-cols-[1fr_0.75fr] gap-6">
      <div>
        <div className="bg-theme-gray text-white px-4 py-2 text-center font-medium">
          生產規格描述
        </div>
        <div className="bg-gray-100 p-4 space-y-3 production-spec-form">
          {/* 料膜 A */}
          <div className="bg-white p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-20 text-center mb-2">料膜 A</div>
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-between px-3 py-2 w-32 h-8 text-sm bg-gray-100 border-b-2 border-gray-400">
                  <span>其他</span>
                </div>
                <div className="flex px-3 py-2 text-sm w-32 h-8 bg-gray-100 items-center border-b-2 border-gray-400">
                  33
                </div>
              </div>
              
              {/* 厚度 */}
              <div className="flex items-center space-x-4">
                <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">厚度</div>
                <div className="flex items-center space-x-2">
                  <div className="flex px-3 py-2 text-sm w-20 h-8 bg-gray-100 items-center border-b-2 border-gray-400">
                    25
                  </div>
                  <span className="text-sm text-gray-600">u</span>
                </div>
              </div>
              
              {/* 膜寬 */}
              <div className="flex items-center space-x-4">
                <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">膜寬</div>
                <div className="flex items-center space-x-2">
                  <div className="flex px-3 py-2 text-sm w-20 h-8 bg-gray-100 items-center border-b-2 border-gray-400">
                    82
                  </div>
                  <span className="text-sm text-gray-600">cm</span>
                </div>
              </div>
              
              {/* 料膜數量 */}
              <div>
                <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-20 text-center mb-2">料膜 A 數量 (擇一)</div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex px-3 py-2 text-sm w-20 h-8 bg-gray-100 items-center border-b-2 border-gray-400">
                      3000
                    </div>
                    <span className="text-sm text-gray-600">m</span>
                    <span className="text-sm text-gray-600">X</span>
                    <div className="flex px-3 py-2 text-sm w-12 h-8 bg-gray-100 items-center border-b-2 border-gray-400">
                      2
                    </div>
                    <span className="text-sm text-gray-600">卷</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex px-3 py-2 text-sm w-20 h-8 bg-gray-100 items-center border-b-2 border-gray-400">
                      260
                    </div>
                    <span className="text-sm text-gray-600">Kgs</span>
                    <span className="text-sm text-gray-600">X</span>
                    <div className="flex px-3 py-2 text-sm w-12 h-8 bg-gray-100 items-center border-b-2 border-gray-400">
                      2
                    </div>
                    <span className="text-sm text-gray-600">卷</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 料膜 B */}
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-20 text-center mb-2">料膜 B</div>
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-between px-3 py-2 w-32 h-8 text-sm bg-gray-100 border-b-2 border-gray-400">
                  <span>其他</span>
                </div>
                <div className="flex px-3 py-2 text-sm w-32 h-8 bg-gray-100 items-center border-b-2 border-gray-400">
                  45
                </div>
              </div>
              
              {/* 厚度 */}
              <div className="flex items-center space-x-4">
                <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">厚度</div>
                <div className="flex items-center space-x-2">
                  <div className="flex px-3 py-2 text-sm w-20 h-8 bg-gray-100 items-center border-b-2 border-gray-400">
                    30
                  </div>
                  <span className="text-sm text-gray-600">u</span>
                </div>
              </div>
              
              {/* 膜寬 */}
              <div className="flex items-center space-x-4">
                <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">膜寬</div>
                <div className="flex items-center space-x-2">
                  <div className="flex px-3 py-2 text-sm w-20 h-8 bg-gray-100 items-center border-b-2 border-gray-400">
                    82
                  </div>
                  <span className="text-sm text-gray-600">cm</span>
                </div>
              </div>
              
              {/* 料膜數量 */}
              <div>
                <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-20 text-center mb-2">料膜 B 數量 (擇一)</div>
                <div className="text-xs mb-2"></div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex px-3 py-2 text-sm w-20 h-8 bg-gray-100 items-center border-b-2 border-gray-400">
                      3000
                    </div>
                    <span className="text-sm text-gray-600">m</span>
                    <span className="text-sm text-gray-600">X</span>
                    <div className="flex px-3 py-2 text-sm w-12 h-8 bg-gray-100 items-center border-b-2 border-gray-400">
                      2
                    </div>
                    <span className="text-sm text-gray-600">卷</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex px-3 py-2 text-sm w-20 h-8 bg-gray-100 items-center border-b-2 border-gray-400">
                      280
                    </div>
                    <span className="text-sm text-gray-600">Kgs</span>
                    <span className="text-sm text-gray-600">X</span>
                    <div className="flex px-3 py-2 text-sm w-12 h-8 bg-gray-100 items-center border-b-2 border-gray-400">
                      2
                    </div>
                    <span className="text-sm text-gray-600">卷</span>
                  </div>
                </div>
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
          <div className="text-sm space-y-2 mb-3">
            <div>塑膠扣方向成品: 短邊朝上</div>
            <div>長扣在上 短扣在下</div>
            <div>請拿2A紙箱.6箱一層貼紙朝外</div>
          </div>
          <div className="production-spec-form space-y-3">
          </div>
        </div>
      </div>
    </div>
  )
}
