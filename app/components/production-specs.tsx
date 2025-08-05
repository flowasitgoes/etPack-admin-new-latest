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
                                         <div className="bg-gray-100 p-4 space-y-3 production-spec-form">
                       <Input className="h-8 text-sm" placeholder="" />
                       <Input className="h-8 text-sm" placeholder="" />
                       <Input className="h-8 text-sm" placeholder="" />
                       <Input className="h-8 text-sm" placeholder="" />
                       <Input className="h-8 text-sm" placeholder="" />
                       <Input className="h-8 text-sm" placeholder="" />
                       <Input className="h-8 text-sm" placeholder="" />
                       <Input className="h-8 text-sm" placeholder="" />
                       <Input className="h-8 text-sm" placeholder="" />
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
                    <div className="bg-gray-100 p-4 space-y-3">
                      <div className="flex items-center space-x-4 bg-white p-2 rounded">
                        <span className="text-sm">獨立印刷2色版</span>
                      </div>
                      <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded">
                        <span className="text-sm">1.棕桔 2.黑</span>
                      </div>
                      <div className="flex items-center space-x-4 bg-white p-2 rounded">
                        <span className="text-sm">提收後拉出方向尾出</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-theme-gray text-white px-4 py-2 text-center font-medium">
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
      </div>

      {/* Lamination Section */}
      <div className="production-specifications-wrap" tabIndex={0}>
        <Card className="production-specifications-item border-orange-300">
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
                    <div className="bg-gray-100 p-4 space-y-2">
                      <div className="bg-white p-2 rounded">
                        <span className="text-sm">1.貼合方式: 熱貼合</span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-sm">2.溫度設定: 180°C</span>
                      </div>
                      <div className="bg-white p-2 rounded">
                        <span className="text-sm">3.壓力: 2.5kg/cm²</span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-sm">4.速度: 15m/min</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-theme-gray text-white px-4 py-2 text-center font-medium">
                      生產條件
                    </div>
                    <div className="bg-gray-100 p-4">
                      <div className="text-sm space-y-2">
                        <div>貼合3000M*2R / 約 260K</div>
                        <div>使用環保膠水</div>
                        <div>品質檢驗: 拉力測試</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="m-2">
                <Edit className="w-4 h-4 text-yellow-400" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Slitting Section */}
      <div className="production-specifications-wrap" tabIndex={0}>
        <Card className="production-specifications-item border-orange-200">
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
                    <div className="bg-gray-100 p-4 space-y-2">
                      <div className="bg-white p-2 rounded">
                        <span className="text-sm">1.分條寬度: 160cm</span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-sm">2.刀片規格: 0.5mm</span>
                      </div>
                      <div className="bg-white p-2 rounded">
                        <span className="text-sm">3.張力控制: 自動</span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-sm">4.收捲方式: 氣脹軸</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-theme-gray text-white px-4 py-2 text-center font-medium">
                      生產條件
                    </div>
                    <div className="bg-gray-100 p-4">
                      <div className="text-sm space-y-2">
                        <div>分條3000M*2R / 約 260K</div>
                        <div>邊緣平整度: ±0.5mm</div>
                        <div>收捲緊密度: 適中</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="m-2">
                <Edit className="w-4 h-4 text-orange-400" />
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
                    <div className="bg-gray-100 p-4 space-y-2">
                      <div className="bg-white p-2 rounded">
                        <span className="text-sm">1.壹字袋長41.2cm</span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-sm">2.內折4.5cm</span>
                      </div>
                      <div className="bg-white p-2 rounded">
                        <span className="text-sm">3.手提部分寬度2cm</span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-sm">4.孔距孔離邊1.5cm</span>
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
                <Edit className="w-4 h-4 text-green-400" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 