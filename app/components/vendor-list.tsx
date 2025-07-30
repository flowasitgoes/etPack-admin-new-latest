"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { type Vendor } from "../lib/vendor-service"

interface VendorListProps {
  vendors: Vendor[]
  selectedVendor: string
  sortBy: string
  onVendorSelect: (vendorId: string) => void
  onSortChange: (sortBy: string) => void
  onEditClick: (vendor: Vendor) => void
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
  isEditing = false,
  editingVendorId = ""
}: VendorListProps) {
  return (
    <div className="px-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">廠商列表</h2>
        <div className="relative">
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            onClick={() => onSortChange(sortBy === "name" ? "id" : "name")}
          >
            <span>{sortBy === "name" ? "名稱排序" : "編號排序"}</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Vendor Table */}
      <Card className="mb-6">
        <CardContent className="p-0">
          <div className="grid grid-cols-3">
            <div className="bg-primary text-white px-4 py-3 text-center font-medium rounded-tl-lg">
              廠商名稱
            </div>
            <div className="bg-primary text-white px-4 py-3 text-center font-medium">
              連絡窗口
            </div>
            <div className="bg-primary text-white px-4 py-3 text-center font-medium rounded-tr-lg">
              連絡電話
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {vendors.map((vendor) => {
              const isSelected = selectedVendor === vendor.id
              
              return (
                <div
                  key={vendor.id}
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
        </CardContent>
      </Card>
      
      {/* 提示信息 - 只在沒有選擇廠商時顯示 */}
      {!selectedVendor && vendors.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">點擊上方廠商來查看詳細信息和歷史訂單</p>
        </div>
      )}
    </div>
  )
} 