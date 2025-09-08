"use client"

import { useState, useEffect } from "react"
import { Calendar, ArrowLeft } from "lucide-react"
import CuttingOrderForm from "../../components/cutting-order-form"
import CuttingProductionSpecs from "../../components/cutting-production-specs"
import { CuttingProductionSpecsProvider, useCuttingProductionSpecs } from "../../contexts/cutting-production-specs-context"
import CuttingSidebar from "../../components/cutting-sidebar"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import "../../../styles/admin-colors.css"
import "../../../styles/admin.css"

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
    sampleFile: string
  }
  bagging: any[]
  printing: any[]
  lamination: any[]
  slitting: any[]
  cutting: any[]
  submittedAt: string
  status: string
}

function OrderDetailContent() {
  const params = useParams()
  const router = useRouter()
  const orderNumber = params.orderNumber as string
  const { initializeFromOrderData } = useCuttingProductionSpecs()

  const [currentDateTime] = useState(() => {
    const now = new Date()
    const year = now.getFullYear() - 1911 // 民國年
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${year}/${month}/${day} ${hours}:${minutes}`
  })

  const [pageOpacity, setPageOpacity] = useState(0)
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 組件掛載後開始淡入
    setTimeout(() => setPageOpacity(1), 50)
  }, [])

  const handleBackToOrderRecord = () => {
    router.push('/cutting/order-record')
  }

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // 直接讀取特定訂單的詳細資料
        const response = await fetch(`/api/orders/${orderNumber}`)
        const data = await response.json()
        
        if (data.success) {
          setOrderData(data.orderData)
          // 初始化生產規格資料
          initializeFromOrderData(data.orderData)
        } else {
          setError(data.message || '無法讀取訂單資料')
        }
      } catch (error) {
        console.error('讀取訂單資料時發生錯誤:', error)
        setError('讀取訂單資料時發生錯誤')
      } finally {
        setLoading(false)
      }
    }

    if (orderNumber) {
      fetchOrderData()
    }
  }, [orderNumber])

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">載入中...</div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg text-red-600">{error}</div>
        </div>
      )
    }

    if (!orderData) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">找不到訂單資料</div>
        </div>
      )
    }

    return (
      <div 
        className="order-record-container space-y-6 transition-all duration-300 ease-in-out"
        style={{ opacity: pageOpacity }}
      >
        {/* Header */}
        <div className="flex justify-between items-center text-white p-4" style={{ background: 'rgb(167, 153, 95)' }}>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToOrderRecord}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回訂製單記錄
            </Button>
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">裁袋課</h1>
              <span className="text-lg">訂製單記錄</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span className="text-sm">{currentDateTime}</span>
          </div>
        </div>

        {/* Order Header */}
        <div className="order-header-wrap">
          <div className="bg-gray-600 text-white px-6 py-3 mb-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="font-medium">訂單編號</span>
              <input
                type="text"
                value={orderData.orderNumber}
                readOnly
                className="bg-transparent text-white px-3 py-1 border-b-2 border-white focus:outline-none font-medium cursor-default"
                placeholder="輸入訂單編號"
              />
            </div>
          </div>

          <div className="px-6 py-3 mb-6 flex justify-between items-center">
            <span className="text-sm">日期: {orderData.date}</span>
          </div>
        </div>
        
        {/* Order Form */}
        <CuttingOrderForm orderData={orderData} />

        {/* Production Specifications */}
        <CuttingProductionSpecs />
      </div>
    )
  }

  return (
    <div className="admin-container min-h-screen bg-gradient-to-br p-4">
      <div className="max-w-[1600px] mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex h-screen">
          {/* Left Sidebar */}
          <CuttingSidebar 
            activeModule="order-record" 
            onModuleChange={(module) => {
              // 導航回主裁袋課頁面
              router.push('/cutting')
            }}
          />

          {/* Main Content */}
          <div className="middle-col-section flex-1 flex transition-all duration-300 ease-in-out overflow-hidden">
            <div 
              className="flex-1 transition-opacity duration-150 ease-in-out overflow-y-auto"
            >
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrderDetailPage() {
  return (
    <CuttingProductionSpecsProvider>
      <OrderDetailContent />
    </CuttingProductionSpecsProvider>
  )
}
