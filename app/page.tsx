"use client"

import { Search, Edit, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function ERPAdmin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-blue-500 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex h-screen">
          {/* Left Sidebar */}
          <div className="w-64 bg-gray-50 p-6">
            {/* User Profile */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white shadow-md"
                >
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
              <h3 className="font-medium text-gray-800">陳某某</h3>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Input placeholder="搜尋..." className="pl-10 rounded-full border-gray-300" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-2">
              <div className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 px-4 py-3 rounded-lg cursor-pointer transition-colors">
                工作排程
              </div>
              <div className="text-purple-600 bg-purple-100 px-4 py-3 rounded-lg font-medium">訂製單記錄</div>
              <div className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 px-4 py-3 rounded-lg cursor-pointer transition-colors">
                廠商資訊
              </div>
              <div className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 px-4 py-3 rounded-lg cursor-pointer transition-colors">
                產品資訊
              </div>
              <div className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 px-4 py-3 rounded-lg cursor-pointer transition-colors">
                配方資料庫
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="middle-col-section flex-1 flex" style={{ overflow: "scroll" }}  >
            <div className="flex-1 p-6">
              {/* Header */}
              <div className="bg-gray-600 text-white px-6 py-4 rounded-t-lg mb-6">
                <div className="flex items-center space-x-2 text-sm">
                  <span>業務課</span>
                  <span>{">"}</span>
                  <span>訂製單記錄</span>
                </div>
              </div>

              {/* Order Header */}
              <div className="bg-gray-500 text-white px-6 py-3 rounded-lg mb-6 flex justify-between items-center">
                <span className="font-medium">訂單編號 K01140414001</span>
                <span className="text-sm">日期: 114/03/20</span>
              </div>

              {/* Order Details Form */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-200 px-4 py-2 rounded-lg text-sm font-medium min-w-20">客戶名稱</div>
                    <div className="flex items-center space-x-2">
                      <span>和展/KW8010</span>
                      <Edit className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-200 px-4 py-2 rounded-lg text-sm font-medium min-w-20">品名</div>
                    <div className="flex items-center space-x-2">
                      <span>阿昌8入染白豪字袋14.5*41.2cm</span>
                      <Edit className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-200 px-4 py-2 rounded-lg text-sm font-medium min-w-20">訂製數量</div>
                    <div className="flex items-center space-x-2">
                      <span>12800 只 / 20箱</span>
                      <Edit className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-200 px-4 py-2 rounded-lg text-sm font-medium min-w-20">單米重</div>
                    <div className="flex items-center space-x-2">
                      <span>54.11(單層)</span>
                      <Edit className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-200 px-4 py-2 rounded-lg text-sm font-medium min-w-20">交貨日期</div>
                    <div className="flex items-center space-x-2">
                      <span>114/04/29</span>
                      <Edit className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-200 px-4 py-2 rounded-lg text-sm font-medium min-w-20">配方編號</div>
                    <div className="flex items-center space-x-2">
                      <span>EW-28-1</span>
                      <Edit className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-200 px-4 py-2 rounded-lg text-sm font-medium min-w-20">自訂義</div>
                    <div className="flex items-center space-x-2">
                      <span>W8010-B02001</span>
                      <Edit className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Production Specifications */}
              <div className="space-y-6">
                {/* Bag Section */}
                <Card className="border-pink-200">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="bg-pink-300 text-white px-6 py-8 flex items-center justify-center text-2xl font-bold min-w-20">
                        抽袋
                      </div>
                      <div className="flex-1 p-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <div className="bg-gray-500 text-white px-4 py-2 rounded-t-lg text-center font-medium">
                              生產規格描述
                            </div>
                            <div className="bg-gray-100 p-4 space-y-3">
                              <div className="flex items-center space-x-4">
                                <div className="bg-purple-200 px-3 py-1 rounded text-sm font-medium min-w-16">厚度</div>
                                <span className="text-sm">0.038 mm</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="bg-purple-200 px-3 py-1 rounded text-sm font-medium min-w-16">寬度</div>
                                <span className="text-sm">160 cm. 到中間90cm,豪到雙收</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="bg-purple-200 px-3 py-1 rounded text-sm font-medium min-w-16">配方</div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm">EW-28-1</span>
                                  <Edit className="w-3 h-3 text-gray-400" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="bg-gray-500 text-white px-4 py-2 rounded-t-lg text-center font-medium">
                              生產條件
                            </div>
                            <div className="bg-gray-100 p-4">
                              <div className="text-sm space-y-2">
                                <div>抽3000M*2R / 約 260K</div>
                                <div>染白豪理</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" className="m-2">
                        <Edit className="w-4 h-4 text-pink-400" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Printing Section */}
                <Card className="border-blue-200">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="bg-blue-300 text-white px-6 py-8 flex items-center justify-center text-2xl font-bold min-w-20">
                        印刷
                      </div>
                      <div className="flex-1 p-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <div className="bg-gray-500 text-white px-4 py-2 rounded-t-lg text-center font-medium">
                              生產規格描述
                            </div>
                            <div className="bg-gray-100 p-4 space-y-3">
                              <div className="text-sm space-y-2">
                                <div>獨立印刷2色版</div>
                                <div>1.棕桔 2.黑</div>
                                <div className="bg-gray-200 p-2 rounded">提收後拉出方向尾出</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="bg-gray-500 text-white px-4 py-2 rounded-t-lg text-center font-medium">
                              生產條件
                            </div>
                            <div className="bg-gray-100 p-4">
                              <div className="text-sm space-y-2">
                                <div>印3000M*2R / 約 260K</div>
                                <div>條碼: 4712425028076</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" className="m-2">
                        <Edit className="w-4 h-4 text-blue-400" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Bag Cutting Section */}
                <Card className="border-green-200">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="bg-green-300 text-white px-6 py-8 flex items-center justify-center text-2xl font-bold min-w-20">
                        裁袋
                      </div>
                      <div className="flex-1 p-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <div className="bg-gray-500 text-white px-4 py-2 rounded-t-lg text-center font-medium">
                              生產規格描述
                            </div>
                            <div className="bg-gray-100 p-4 space-y-3">
                              <div className="flex items-center space-x-4">
                                <div className="bg-purple-200 px-3 py-1 rounded text-sm font-medium min-w-16">壹字袋長</div>
                                <span className="text-sm">41.2cm</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="bg-purple-200 px-3 py-1 rounded text-sm font-medium min-w-16">內折</div>
                                <span className="text-sm">4.5cm</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="bg-purple-200 px-3 py-1 rounded text-sm font-medium min-w-16">手提部分寬度</div>
                                <span className="text-sm">2cm</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="bg-purple-200 px-3 py-1 rounded text-sm font-medium min-w-16">孔距孔離邊</div>
                                <span className="text-sm">1.5cm</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="bg-gray-500 text-white px-4 py-2 rounded-t-lg text-center font-medium">
                              生產條件
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
                      </div>
                      <Button size="icon" variant="ghost" className="m-2">
                        <Edit className="w-4 h-4 text-green-400" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Sidebar - Staff Info */}
            <div className="right-col-section w-64 bg-gray-50 p-6" style={{ position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
              <div className="space-y-6">
                {/* Order Creator */}
                <div className="text-center">
                  <div className="bg-gray-200 px-4 py-2 rounded-lg mb-4 font-medium">製單</div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center mx-auto mb-2">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm font-medium">陳某某</div>
                </div>

                {/* Manager */}
                <div className="text-center">
                  <div className="bg-gray-200 px-4 py-2 rounded-lg mb-4 font-medium">經理</div>
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mx-auto mb-2">
                    <User className="w-8 h-8 text-gray-500" />
                  </div>
                </div>

                {/* General Manager */}
                <div className="text-center">
                  <div className="bg-gray-200 px-4 py-2 rounded-lg mb-4 font-medium">總經理</div>
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mx-auto mb-2">
                    <User className="w-8 h-8 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
