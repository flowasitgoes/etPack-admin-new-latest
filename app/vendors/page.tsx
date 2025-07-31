"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import VendorList from "../components/vendor-list"
import VendorDetailForm from "../components/vendor-detail-form"
import VendorOrders from "../components/vendor-orders"
import { VendorService, type Vendor, type VendorOrder } from "../lib/vendor-service"

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [selectedVendor, setSelectedVendor] = useState("")
  const [selectedVendorData, setSelectedVendorData] = useState<Vendor | null>(null)
  const [vendorOrders, setVendorOrders] = useState<VendorOrder[]>([])
  const [sortBy, setSortBy] = useState("name")
  const [loading, setLoading] = useState(true)
  const [pageOpacity, setPageOpacity] = useState(0)

  // 獲取當前日期時間
  const getCurrentDateTime = () => {
    const now = new Date()
    const year = now.getFullYear() - 1911 // 民國年
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${year} / ${month} / ${day} ${hours}:${minutes}`
  }

  // 初始化載入客戶數據
  useEffect(() => {
    const loadVendors = async () => {
      try {
        const vendorsData = await VendorService.getAllVendors()
        const sortedVendors = await VendorService.sortVendors(vendorsData, sortBy)
        setVendors(sortedVendors)
      } catch (error) {
        console.error("載入客戶數據失敗:", error)
      } finally {
        setLoading(false)
        // 數據載入完成後開始淡入
        setTimeout(() => setPageOpacity(1), 50)
      }
    }

    loadVendors()
  }, []) // 只在組件掛載時執行一次

  // 處理排序變更
  const handleSortChange = async (newSortBy: string) => {
    setSortBy(newSortBy)
    const sortedVendors = await VendorService.sortVendors(vendors, newSortBy)
    setVendors(sortedVendors)
  }

  // 處理客戶選擇
  const handleVendorSelect = (vendorId: string) => {
    setSelectedVendor(vendorId)
    const vendor = vendors.find(v => v.id === vendorId)
    setSelectedVendorData(vendor || null)
  }

  // 處理保存編輯
  const handleSaveEdit = async (updatedVendor: Vendor) => {
    try {
      const savedVendor = await VendorService.updateVendor(updatedVendor, selectedVendor)
      
      // 更新本地客戶列表
      const updatedVendors = vendors.map(v => 
        v.id === selectedVendor ? savedVendor : v
      )
      setVendors(updatedVendors)
      
      // 更新選中的客戶數據
      setSelectedVendorData(savedVendor)
    } catch (error) {
      console.error("保存客戶失敗:", error)
    }
  }

  // 當選擇的客戶改變時，載入對應的歷史訂單
  useEffect(() => {
    const loadVendorOrders = async () => {
      if (selectedVendor) {
        try {
          const orders = await VendorService.getVendorOrders(selectedVendor)
          setVendorOrders(orders)
        } catch (error) {
          console.error("載入客戶訂單失敗:", error)
        }
      } else {
        setVendorOrders([])
      }
    }

    loadVendorOrders()
  }, [selectedVendor])

  if (loading) {
    return (
      <div className="middle-col-outer-wrap flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="middle-col-outer-wrap flex-1 transition-all duration-300 ease-in-out overflow-y-auto"
      style={{ opacity: pageOpacity }}
    >
      {/* Header */}
      <div className="bg-gray-600 text-white px-6 py-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <span>業務課</span>
            <span>{">"}</span>
            <span>客戶資訊</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>{getCurrentDateTime()}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 pb-6">
        {/* Vendor List Section */}
        <VendorList
          vendors={vendors}
          selectedVendor={selectedVendor}
          sortBy={sortBy}
          onVendorSelect={handleVendorSelect}
          onSortChange={handleSortChange}
          onEditClick={() => {}} // 移除編輯功能，改為直接選擇
          isEditing={false}
          editingVendorId=""
        />

        {/* Vendor Detail Form - 只在選擇客戶後顯示 */}
        {selectedVendorData && (
          <VendorDetailForm
            vendor={selectedVendorData}
            onSave={handleSaveEdit}
          />
        )}

        {/* Vendor Orders Section - 只在選擇客戶後顯示 */}
        {selectedVendor && (
          <VendorOrders
            vendorId={selectedVendor}
            orders={vendorOrders}
          />
        )}
      </div>
    </div>
  )
} 