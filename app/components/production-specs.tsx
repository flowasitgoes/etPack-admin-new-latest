"use client"

import { Edit } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductionSpecs() {
  return (
    <div className="production-specifications-container space-y-6">
      {/* Bag Section */}
      <div className="production-specifications-wrap" tabIndex={0}>
        <Card className="production-specifications-item border-pink-200">
        <CardContent className="p-0">
          <div className="flex">
              <div className="bg-bag-drawing text-white px-6 py-8 flex items-center justify-center text-2xl text-vertical">
              <div className="text-wrap-vertical">
                  <div>抽</div>
                  <div>袋</div>
              </div>
            </div>
            <div className="production-spec-scrollable-wrap flex-1 p-6">
              <div className="grid grid-cols-2 gap-6">
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
              </div>
              <Button size="icon" variant="ghost" className="m-2">
                <Edit className="w-4 h-4 text-pink-400" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Printing Section */}
      <div className="production-specifications-wrap" tabIndex={0}>
        <Card className="production-specifications-item border-blue-200">
          <CardContent className="p-0">
            <div className="flex">
              <div className="bg-bag-printing text-white px-6 py-8 flex items-center justify-center text-2xl text-vertical">
                <div className="text-wrap-vertical">
                  <div>印</div>
                  <div>刷</div>
                </div>
              </div>
              <div className="production-spec-scrollable-wrap flex-1 p-6">
                <div className="grid grid-cols-2 gap-6">
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
                        <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center mb-2">數量</div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Input className="w-20 h-8 text-sm" placeholder="3000" />
                            <span className="text-sm text-gray-600">m</span>
                            <span className="text-sm text-gray-600">X</span>
                            <Input className="w-12 h-8 text-sm" placeholder="2" />
                            <span className="text-sm text-gray-600">卷</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">(擇一)</span>
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
                    生產條件
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
              </div>
              <Button size="icon" variant="ghost" className="m-2">
                <Edit className="w-4 h-4 text-[#fccc48]" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lamination Section */}
      <div className="production-specifications-wrap" tabIndex={0}>
        <Card className="production-specifications-item border-[#e4b49c]">
          <CardContent className="p-0">
            <div className="flex">
              <div className="bg-bag-lamination text-white px-6 py-8 flex items-center justify-center text-2xl text-vertical">
                <div className="text-wrap-vertical">
                  <div>貼</div>
                  <div>合</div>
                </div>
              </div>
              <div className="production-spec-scrollable-wrap flex-1 p-6">
                <div className="grid grid-cols-2 gap-6">
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
                            <Select defaultValue="其他">
                              <SelectTrigger className="w-32 h-8 text-sm select-trigger">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="其他">其他</SelectItem>
                                <SelectItem value="標準">標準</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input className="w-32 h-8 text-sm" placeholder="" />
                          </div>
                          
                          {/* 厚度 */}
                          <div className="flex items-center space-x-4">
                            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">厚度</div>
                            <div className="flex items-center space-x-2">
                              <Input className="w-20 h-8 text-sm" placeholder="" />
                              <span className="text-sm text-gray-600">u</span>
                            </div>
                          </div>
                          
                          {/* 膜寬 */}
                          <div className="flex items-center space-x-4">
                            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">膜寬</div>
                            <div className="flex items-center space-x-2">
                              <Input className="w-20 h-8 text-sm" placeholder="" />
                              <span className="text-sm text-gray-600">cm</span>
                            </div>
                          </div>
                          
                          {/* 料膜數量 */}
                          <div>
                            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-20 text-center mb-2">料膜數量</div>
                            <div className="text-xs mb-2">(擇一)</div>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Input className="w-20 h-8 text-sm" placeholder="" />
                                <span className="text-sm text-gray-600">m</span>
                                <span className="text-sm text-gray-600">X</span>
                                <Input className="w-12 h-8 text-sm" placeholder="" />
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
                        </div>
                      </div>
                      
                      {/* 料膜 B */}
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-20 text-center mb-2">料膜 B</div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-4">
                            <Select defaultValue="其他">
                              <SelectTrigger className="w-32 h-8 text-sm select-trigger">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="其他">其他</SelectItem>
                                <SelectItem value="標準">標準</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input className="w-32 h-8 text-sm" placeholder="" />
                          </div>
                          
                          {/* 厚度 */}
                          <div className="flex items-center space-x-4">
                            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">厚度</div>
                            <div className="flex items-center space-x-2">
                              <Input className="w-20 h-8 text-sm" placeholder="" />
                              <span className="text-sm text-gray-600">u</span>
                            </div>
                          </div>
                          
                          {/* 膜寬 */}
                          <div className="flex items-center space-x-4">
                            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">膜寬</div>
                            <div className="flex items-center space-x-2">
                              <Input className="w-20 h-8 text-sm" placeholder="" />
                              <span className="text-sm text-gray-600">cm</span>
                            </div>
                          </div>
                          
                          {/* 料膜數量 */}
                          <div>
                            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-20 text-center mb-2">料膜數量</div>
                            <div className="text-xs mb-2">(擇一)</div>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Input className="w-20 h-8 text-sm" placeholder="" />
                                <span className="text-sm text-gray-600">m</span>
                                <span className="text-sm text-gray-600">X</span>
                                <Input className="w-12 h-8 text-sm" placeholder="" />
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
                      </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-theme-gray text-white px-4 py-2 text-center font-medium">
                      生產條件
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
              </div>
              <Button size="icon" variant="ghost" className="m-2">
                <Edit className="w-4 h-4 text-[#e4b49c]" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Slitting Section */}
      <div className="production-specifications-wrap" tabIndex={0}>
        <Card className="production-specifications-item border-[#9ee7a6]">
          <CardContent className="p-0">
            <div className="flex">
              <div className="bg-bag-slitting text-white px-6 py-8 flex items-center justify-center text-2xl text-vertical">
                <div className="text-wrap-vertical">
                  <div>分</div>
                  <div>條</div>
                </div>
              </div>
              <div className="production-spec-scrollable-wrap flex-1 p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="bg-theme-gray text-white px-4 py-2 text-center font-medium">
                      生產規格描述
                    </div>
                    <div className="bg-gray-100 p-4 space-y-3 production-spec-form">
                      {/* 第一組 - 料膜 */}
                      <div className="bg-white p-2 rounded">
                        <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center mb-2">料膜</div>
                        <div className="flex items-center space-x-2">
                          <Input className="w-20 h-8 text-sm" placeholder="" />
                          <span className="text-sm text-gray-600">cm</span>
                        </div>
                      </div>
                      
                      {/* 工段(一) */}
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-20 text-center mb-2">工段(一)</div>
                        <div className="flex items-center space-x-4">
                          <Select defaultValue="其他">
                            <SelectTrigger className="w-32 h-8 text-sm select-trigger">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="其他">其他</SelectItem>
                              <SelectItem value="標準">標準</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">尺寸</span>
                            <Input className="w-16 h-8 text-sm" placeholder="" />
                            <span className="text-sm text-gray-600">cm</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* 數量 */}
                      <div className="bg-white p-2 rounded">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">數量</span>
                          <Input className="w-20 h-8 text-sm" placeholder="" />
                          <span className="text-sm text-gray-600">m</span>
                          <span className="text-sm text-gray-600">X</span>
                          <Input className="w-12 h-8 text-sm" placeholder="" />
                          <span className="text-sm text-gray-600">卷</span>
                        </div>
                      </div>
                      
                      {/* 第二組 - 料膜 */}
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center mb-2">料膜</div>
                        <div className="flex items-center space-x-2">
                          <Input className="w-20 h-8 text-sm" placeholder="" />
                          <span className="text-sm text-gray-600">cm</span>
                        </div>
                      </div>
                      
                      {/* 工段(二) */}
                      <div className="bg-white p-2 rounded">
                        <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-20 text-center mb-2">工段(二)</div>
                        <div className="flex items-center space-x-4">
                          <Select defaultValue="其他">
                            <SelectTrigger className="w-32 h-8 text-sm select-trigger">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="其他">其他</SelectItem>
                              <SelectItem value="標準">標準</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">尺寸</span>
                            <Input className="w-16 h-8 text-sm" placeholder="" />
                            <span className="text-sm text-gray-600">cm</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* 數量 */}
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">數量</span>
                          <Input className="w-20 h-8 text-sm" placeholder="" />
                          <span className="text-sm text-gray-600">m</span>
                          <span className="text-sm text-gray-600">X</span>
                          <Input className="w-12 h-8 text-sm" placeholder="" />
                          <span className="text-sm text-gray-600">卷</span>
                        </div>
                      </div>
                      
                      {/* 捲收方向 */}
                      <div className="bg-white p-2 rounded">
                        <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-20 text-center mb-2">捲收方向</div>
                        <div className="flex items-center space-x-4">
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
                      
                      {/* 折角 */}
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center mb-2">折角</div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-4">
                            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">袋膜寬</div>
                            <div className="flex items-center space-x-2">
                              <Input className="w-16 h-8 text-sm" placeholder="" />
                              <span className="text-sm text-gray-600">cm</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">面寬</div>
                            <div className="flex items-center space-x-2">
                              <Input className="w-16 h-8 text-sm" placeholder="" />
                              <span className="text-sm text-gray-600">cm</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">折角</div>
                            <div className="flex items-center space-x-2">
                              <Input className="w-16 h-8 text-sm" placeholder="" />
                              <span className="text-sm text-gray-600">cm</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-20 text-center">一邊折</div>
                            <div className="flex items-center space-x-2">
                              <Input className="w-16 h-8 text-sm" placeholder="" />
                              <span className="text-sm text-gray-600">cm</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-white bg-primary px-3 py-1 rounded text-sm font-medium min-w-16 text-center">數量</div>
                            <div className="flex items-center space-x-2">
                              <Input className="w-16 h-8 text-sm" placeholder="" />
                              <span className="text-sm text-gray-600">kgs</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-theme-gray text-white px-4 py-2 text-center font-medium">
                      生產條件
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
              </div>
              <Button size="icon" variant="ghost" className="m-2">
                <Edit className="w-4 h-4 text-[#9ee7a6]" />
              </Button>
          </div>
        </CardContent>
      </Card>
    </div>

      {/* Bag Cutting Section */}
      <div className="production-specifications-wrap" tabIndex={0}>
        <Card className="production-specifications-item border-yellow-400">
          <CardContent className="p-0">
            <div className="flex">
              <div className="bg-bag-cutting text-white px-6 py-8 flex items-center justify-center text-2xl text-vertical">
                <div className="text-wrap-vertical">
                  <div>裁</div>
                  <div>袋</div>
                </div>
              </div>
              <div className="production-spec-scrollable-wrap flex-1 p-6">
                <div className="grid grid-cols-2 gap-6">
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
                <Edit className="w-4 h-4 text-[#fccc48]" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 