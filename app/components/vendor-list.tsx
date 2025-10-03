"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Vendor } from "../lib/vendor-service"

interface VendorListProps {
  vendors: Vendor[]
  selectedVendor: string
  sortBy: string
  onVendorSelect: (vendorId: string) => void
  onSortChange: (sortBy: string) => void
  onEditClick: (vendor: Vendor) => void
  onAddClick: () => void
  isEditing?: boolean
  editingVendorId?: string
}

export default function VendorList({
  vendors,
  selectedVendor,
  sortBy,
  onVendorSelect,
  onSortChange,
  onEditClick,
  onAddClick,
  isEditing = false,
  editingVendorId = ""
}: VendorListProps) {
  // 獲取排序選項顯示文字
  const getSortOptionText = (option: string) => {
    switch (option) {
      case "name":
        return "名稱排序"
      case "id":
        return "編號排序"
      case "vendorId":
        return "客戶編號"
      default:
        return "名稱排序"
    }
  }

  return (
    <div className="px-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">客戶列表</h2>
        <div className="relative">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-40">
              <SelectValue>
                {getSortOptionText(sortBy)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">名稱排序</SelectItem>
              <SelectItem value="id">編號排序</SelectItem>
              <SelectItem value="vendorId">客戶編號</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Vendor Table */}
      <Card className="mb-6">
        <CardContent className="p-0">
          <div className="grid grid-cols-3">
            <div className="bg-primary text-white px-4 py-3 text-center font-medium rounded-tl-lg">
              客戶名稱
            </div>
            <div className="bg-primary text-white px-4 py-3 text-center font-medium">
              連絡窗口
            </div>
            <div className="bg-primary text-white px-4 py-3 text-center font-medium rounded-tr-lg">
              連絡電話
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {vendors.map((vendor, index) => {
              const isSelected = selectedVendor === vendor.id
              // 確保 key 的唯一性，使用 id 或 index 作為備用
              const uniqueKey = vendor.id || `vendor-${index}`
              
              return (
                <div
                  key={uniqueKey}
                  className={`grid grid-cols-3 border-b transition-colors ${
                    isSelected ? "bg-purple-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div 
                    className="px-4 py-3 text-sm border-r cursor-pointer"
                    onClick={() => onVendorSelect(vendor.id)}
                  >
                    {vendor.name}
                  </div>
                  <div 
                    className="px-4 py-3 text-sm border-r cursor-pointer"
                    onClick={() => onVendorSelect(vendor.id)}
                  >
                    {vendor.contactPerson.name}
                  </div>
                  <div 
                    className="px-4 py-3 text-sm cursor-pointer"
                    onClick={() => onVendorSelect(vendor.id)}
                  >
                    {vendor.contactPerson.phone || "-"}
                  </div>
                </div>
              )
            })}
          </div>
          {/* 新增按鈕 - 只在非編輯模式時顯示 */}
          {!isEditing && (
            <div className="flex justify-end p-4 border-t">
              <Button
                onClick={onAddClick}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-green-600 h-9 px-3 bg-primary text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                新增資料
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* 提示信息 - 只在沒有選擇客戶時顯示 */}
      {!selectedVendor && vendors.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">點擊上方客戶來查看詳細信息和歷史訂單</p>
        </div>
      )}
    </div>
  )
} 