"use client"

import { useState, useEffect, use } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Package, User, Edit, Plus, Minus } from "lucide-react"
import BaggingSidebar from "../../../components/bagging-sidebar"
import "../../../../styles/admin-colors.css"
import "../../../../styles/admin.css"

interface OrderData {
  orderNumber: string
  date: string
  orderInfo: {
    customerName: string
    customerCode: string
    productCode: string
    productName: string
    orderQuantity: string
    orderUnit1: string
    orderQuantity2: string
    orderUnit2: string
    deliveryDate: string
    formulaNumber: string
  }
}

interface BagRollData {
  id: string
  rollNumber: string
  weight: string
  thickness: string
  faceWidth: string
  folding: string
  printing: string
  treatmentStrength: string
  dyeing: string
  openness: string
  bagBodyStrength: string
}

interface LossRecord {
  startup: string
  machineWash: string
  windBreak: string
  bubbles: string
  trimming: string
  otherLosses: string
  moldChange: string
  sampleChange: string
  tooManyParticles: string
}

export default function DailyReportDetailPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = use(params)
  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeModule, setActiveModule] = useState("daily-report")
  const [bagRolls, setBagRolls] = useState<BagRollData[]>([
    { id: '1', rollNumber: 'C.151826', weight: '297', thickness: '', faceWidth: '', folding: '', printing: '', treatmentStrength: '', dyeing: '', openness: '', bagBodyStrength: '' },
    { id: '2', rollNumber: 'C.151827', weight: '297', thickness: '', faceWidth: '', folding: '', printing: '', treatmentStrength: '', dyeing: '', openness: '', bagBodyStrength: '' },
    { id: '3', rollNumber: 'C.151828', weight: '297', thickness: '', faceWidth: '', folding: '', printing: '', treatmentStrength: '', dyeing: '', openness: '', bagBodyStrength: '' }
  ])
  const [lossRecord, setLossRecord] = useState<LossRecord>({
    startup: '', machineWash: '', windBreak: '', bubbles: '', trimming: '',
    otherLosses: '', moldChange: '', sampleChange: '', tooManyParticles: ''
  })
  const [remarks, setRemarks] = useState("配號機冷水輪2F 故障")

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderNumber}`)
        if (response.ok) {
          const data = await response.json()
          setOrder(data.orderData)
        }
      } catch (error) {
        console.error('Error loading order:', error)
      } finally {
        setLoading(false)
      }
    }

    loadOrder()
  }, [orderNumber])

  const handleModuleChange = (newModule: string) => {
    setActiveModule(newModule)
    // 導航到對應的頁面
    if (newModule === "production-schedule") {
      window.location.href = "/bagging"
    } else if (newModule === "order-record") {
      window.location.href = "/bagging"
    } else if (newModule === "material-record") {
      window.location.href = "/bagging"
    } else if (newModule === "daily-report") {
      // 保持在當前頁面
    } else if (newModule === "recipe-database") {
      window.location.href = "/bagging"
    }
  }

  const addBagRoll = () => {
    const newId = (bagRolls.length + 1).toString()
    const newRollNumber = `C.${Math.floor(Math.random() * 900000) + 100000}`
    setBagRolls([...bagRolls, {
      id: newId,
      rollNumber: newRollNumber,
      weight: '297',
      thickness: '', faceWidth: '', folding: '', printing: '', treatmentStrength: '', dyeing: '', openness: '', bagBodyStrength: ''
    }])
  }

  const removeBagRoll = (id: string) => {
    if (bagRolls.length > 1) {
      setBagRolls(bagRolls.filter(roll => roll.id !== id))
    }
  }

  const updateBagRoll = (id: string, field: keyof BagRollData, value: string) => {
    setBagRolls(bagRolls.map(roll => 
      roll.id === id ? { ...roll, [field]: value } : roll
    ))
  }

  const updateLossRecord = (field: keyof LossRecord, value: string) => {
    setLossRecord({ ...lossRecord, [field]: value })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!order) {
    return <div className="p-6">訂單不存在</div>
  }

  return (
    <div className="admin-container min-h-screen bg-gradient-to-br p-4">
      <div className="max-w-[1600px] mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex h-screen">
          {/* Left Sidebar */}
          <BaggingSidebar activeModule={activeModule} onModuleChange={handleModuleChange} />

          {/* Main Content */}
          <div className="middle-col-section flex-1 flex transition-all duration-300 ease-in-out overflow-hidden">
            <div className="flex-1 transition-opacity duration-150 ease-in-out overflow-y-auto">
              <div className="bagging-container space-y-6 p-6">
                {/* 頁面標題 */}
                <div className="flex justify-between items-center text-white p-4" style={{ background: 'rgb(209 138 173)' }}>
                  <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-bold">抽袋課</h1>
                    <span className="text-lg">生產/檢驗日報表</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm">
                      {new Date().toLocaleString('zh-TW', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex gap-6">
                  {/* 左半部 */}
                  <div className="flex-1 space-y-6">
                    {/* 1. 訂單資訊 - 唯讀區塊 */}
                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <div className="text-white p-3 rounded-tr-lg rounded-br-lg w-[280px]" style={{ background: '#7c7d99' }}>
                            <h2 className="text-base font-semibold leading-tight">訂單編號 {order.orderNumber}</h2>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="bg-gray-100">操作日期:</Badge>
                            <span>{order.date}</span>
                            <Badge variant="outline" className="bg-gray-100 ml-4">機台:</Badge>
                            <Badge className="bg-pink-200 text-black">1</Badge>
                            <span>號機</span>
                            <Badge variant="outline" className="bg-gray-100 ml-4">班別:</Badge>
                            <Badge className="bg-pink-200 text-black">C</Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="bg-gray-100">客戶名稱:</Badge>
                            <span>{order.orderInfo.customerName}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="bg-gray-100">品　　名:</Badge>
                            <span>{order.orderInfo.productName}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="bg-gray-100">訂製數量:</Badge>
                            <span>{order.orderInfo.orderQuantity}{order.orderInfo.orderUnit1} / {order.orderInfo.orderQuantity2}{order.orderInfo.orderUnit2}</span>
                          </div>
                          <div className="flex items-center space-x-2 col-span-2">
                            <Badge variant="outline" className="bg-gray-100">工作時間:</Badge>
                                                          <Badge className="bg-gray-100 text-black">18</Badge>
                            <span>時</span>
                                                          <Badge className="bg-gray-100 text-black">00</Badge>
                            <span>分 至</span>
                                                          <Badge className="bg-gray-100 text-black">21</Badge>
                            <span>時</span>
                            <Badge className="bg-purple-100 text-black">40</Badge>
                            <span>分</span>
                            <Edit className="w-4 h-4 text-gray-500" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 2. 成品計量/檢驗結果 */}
                    <Card className="shadow-lg">
                                              <CardHeader className="text-white" style={{ backgroundColor: 'rgb(209 138 173)' }}>
                          <CardTitle>成品計量 / 檢驗結果</CardTitle>
                        </CardHeader>
                      <CardContent className="p-6 space-y-4">
                        {bagRolls.map((roll, index) => (
                                                      <div key={roll.id} className="border rounded-lg p-4 w-full">
                              <div className="flex justify-between items-center mb-4">
                                <div className="inline-flex items-center border px-3 py-1 text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-gray-600 text-white" style={{ backgroundColor: 'rgb(209 138 173)' }}>
                                  袋捲編號: {roll.rollNumber}
                                </div>
                              <Button
                                variant="outline"
                                onClick={() => removeBagRoll(roll.id)}
                                className="text-red-600 hover:text-red-800 h-10 px-4"
                              >
                                <Minus className="w-5 h-5" />
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-6 gap-2">
                              {/* 第一行 */}
                              <div className="bg-gray-100 text-gray-800 font-semibold text-sm py-2 px-3 rounded flex items-center justify-center">
                                重量
                              </div>
                              <div className="py-2">
                                <Input
                                  value={roll.weight}
                                  onChange={(e) => updateBagRoll(roll.id, 'weight', e.target.value)}
                                  placeholder="輸入數值"
                                  className="h-10"
                                />
                              </div>
                              <div className="bg-gray-100 text-gray-800 font-semibold text-sm py-2 px-3 rounded flex items-center justify-center">
                                厚度
                              </div>
                              <div className="py-2">
                                <Input
                                  value={roll.thickness}
                                  onChange={(e) => updateBagRoll(roll.id, 'thickness', e.target.value)}
                                  placeholder="輸入數值"
                                  className="h-10"
                                />
                              </div>
                              <div className="bg-gray-100 text-gray-800 font-semibold text-sm py-2 px-3 rounded flex items-center justify-center">
                                面寬
                              </div>
                              <div className="py-2">
                                <Input
                                  value={roll.faceWidth}
                                  onChange={(e) => updateBagRoll(roll.id, 'faceWidth', e.target.value)}
                                  placeholder="輸入數值"
                                  className="h-10"
                                />
                              </div>

                              {/* 第二行 */}
                              <div className="bg-gray-100 text-gray-800 font-semibold text-sm py-2 px-3 rounded flex items-center justify-center">
                                折邊
                              </div>
                              <div className="py-2">
                                <Input
                                  value={roll.folding}
                                  onChange={(e) => updateBagRoll(roll.id, 'folding', e.target.value)}
                                  placeholder="輸入數值"
                                  className="h-10"
                                />
                              </div>
                              <div className="bg-gray-100 text-gray-800 font-semibold text-sm py-2 px-3 rounded flex items-center justify-center">
                                印刷
                              </div>
                              <div className="py-2">
                                <Input
                                  value={roll.printing}
                                  onChange={(e) => updateBagRoll(roll.id, 'printing', e.target.value)}
                                  placeholder="輸入數值"
                                  className="h-10"
                                />
                              </div>
                              <div className="bg-gray-100 text-gray-800 font-semibold text-sm py-2 px-3 rounded flex items-center justify-center">
                                處理強度
                              </div>
                              <div className="py-2">
                                <Input
                                  value={roll.treatmentStrength}
                                  onChange={(e) => updateBagRoll(roll.id, 'treatmentStrength', e.target.value)}
                                  placeholder="輸入數值"
                                  className="h-10"
                                />
                              </div>

                              {/* 第三行 */}
                              <div className="bg-gray-100 text-gray-800 font-semibold text-sm py-2 px-3 rounded flex items-center justify-center">
                                染色
                              </div>
                              <div className="py-2">
                                <Input
                                  value={roll.dyeing}
                                  onChange={(e) => updateBagRoll(roll.id, 'dyeing', e.target.value)}
                                  placeholder="輸入數值"
                                  className="h-10"
                                />
                              </div>
                              <div className="bg-gray-100 text-gray-800 font-semibold text-sm py-2 px-3 rounded flex items-center justify-center">
                                開口性
                              </div>
                              <div className="py-2">
                                <Input
                                  value={roll.openness}
                                  onChange={(e) => updateBagRoll(roll.id, 'openness', e.target.value)}
                                  placeholder="輸入數值"
                                  className="h-10"
                                />
                              </div>
                              <div className="bg-gray-100 text-gray-800 font-semibold text-sm py-2 px-3 rounded flex items-center justify-center">
                                袋身強度
                              </div>
                              <div className="py-2">
                                <Input
                                  value={roll.bagBodyStrength}
                                  onChange={(e) => updateBagRoll(roll.id, 'bagBodyStrength', e.target.value)}
                                  placeholder="輸入數值"
                                  className="h-10"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <Button onClick={addBagRoll} className="w-full text-white" style={{ backgroundColor: 'rgb(209 138 173)' }}>
                          <Plus className="w-4 h-4 mr-2" />
                          新增袋捲
                        </Button>
                      </CardContent>
                    </Card>

                    {/* 3. 耗損記錄 */}
                    <Card className="shadow-lg">
                      <CardHeader className="text-white bg-gray-500 py-3">
                        <CardTitle className="text-lg">耗損記錄</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { key: 'startup', label: '開機' },
                            { key: 'machineWash', label: '改台洗車' },
                            { key: 'windBreak', label: '清風斷帶' },
                            { key: 'bubbles', label: '起水泡' },
                            { key: 'trimming', label: '修邊' },
                            { key: 'otherLosses', label: '其他耗損' },
                            { key: 'moldChange', label: '清模換網' },
                            { key: 'sampleChange', label: '試料換料' },
                            { key: 'tooManyParticles', label: '顆粒太多' }
                          ].map((field) => (
                            <div key={field.key} className="text-center">
                              <div className="bg-gray-100 text-gray-800 font-semibold text-sm py-1 px-2 rounded-t">
                                {field.label}
                              </div>
                              <Input
                                value={lossRecord[field.key as keyof LossRecord]}
                                onChange={(e) => updateLossRecord(field.key as keyof LossRecord, e.target.value)}
                                className="rounded-t-none border-t-0"
                                placeholder="輸入數值"
                              />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* 4. 領料記錄和產量記錄 */}
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="shadow-lg">
                        <CardHeader className="text-white bg-gray-500 py-3">
                          <CardTitle className="text-lg">領料記錄</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="bg-white rounded p-3 space-y-2">
                            <div className="flex justify-between">
                              <Badge variant="outline" className="bg-purple-100">領料日期:</Badge>
                              <span>{order.date}</span>
                            </div>
                            <div className="flex justify-between">
                              <Badge variant="outline" className="bg-purple-100">合計數量:</Badge>
                              <span>1240 k</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg">
                        <CardHeader className="text-white bg-gray-500 py-3">
                          <CardTitle className="text-lg">產量記錄</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="bg-white rounded p-3 space-y-2">
                            <div className="flex justify-between">
                              <Badge variant="outline" className="bg-purple-100">生產數量:</Badge>
                              <span>1188 x 4</span>
                            </div>
                            <div className="flex justify-between">
                              <Badge variant="outline" className="bg-purple-100">耗損總量:</Badge>
                              <span className="text-red-600">52</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* 右半部 */}
                  <div className="w-80 space-y-6">
                    {/* 操作人員和組長 */}
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="shadow-lg">
                        <CardHeader className="text-white bg-gray-500 py-3">
                          <CardTitle className="text-lg">操作人員</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center mx-auto mb-2">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="font-medium text-sm">陳某某</div>
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg">
                        <CardHeader className="text-white bg-gray-500 py-3">
                          <CardTitle className="text-lg">組長</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center mx-auto mb-2">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="font-medium text-sm">林某某</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* 生產規格描述 */}
                    <Card className="shadow-lg">
                                              <CardHeader className="text-white bg-gray-500 py-3">
                          <CardTitle className="text-lg">生產規格描述</CardTitle>
                        </CardHeader>
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-start items-center space-x-4">
                          <Badge variant="outline" className="bg-purple-100">厚　度:</Badge>
                          <span>0.038 mm</span>
                        </div>
                        <div className="flex justify-start items-center space-x-4">
                          <Badge variant="outline" className="bg-purple-100">寬　度:</Badge>
                          <span>160 cm. 剖中間80cm,雙剖雙收</span>
                        </div>
                        <div className="flex justify-start items-center space-x-4">
                          <Badge variant="outline" className="bg-purple-100">配　方:</Badge>
                          <span>EW-28-1 <Edit className="w-4 h-4 text-gray-500" /></span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 生產條件 */}
                    <Card className="shadow-lg">
                                              <CardHeader className="text-white bg-gray-500 py-3">
                          <CardTitle className="text-lg">生產條件</CardTitle>
                        </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div>抽3000M*2R / 約 260K</div>
                          <div>染白雙理</div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 成品庫存記錄 */}
                    <Card className="shadow-lg">
                                              <CardHeader className="text-white bg-gray-500 py-3">
                          <CardTitle className="text-lg">成品庫存記錄</CardTitle>
                        </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="bg-purple-100">庫存狀態:</Badge>
                          <span>0 k</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 外購 */}
                    <Card className="shadow-lg">
                                              <CardHeader className="text-white bg-gray-500 py-3">
                          <CardTitle className="text-lg">外購</CardTitle>
                        </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="bg-purple-100">外購數量:</Badge>
                          <span>1240 k <Edit className="w-4 h-4 text-gray-500" /></span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 備註 */}
                    <Card className="shadow-lg">
                                              <CardHeader className="text-white bg-gray-500 py-3">
                          <CardTitle className="text-lg">備註</CardTitle>
                        </CardHeader>
                      <CardContent className="p-4">
                        <Textarea
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                          placeholder="輸入備註..."
                          className="min-h-[100px]"
                        />
                      </CardContent>
                    </Card>
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
