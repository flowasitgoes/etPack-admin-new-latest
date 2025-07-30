"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Vendor } from "../lib/vendor-service"

interface VendorEditFormProps {
  vendor: Vendor | null
  onSave: (vendor: Vendor) => void
  onCancel: () => void
}

export default function VendorEditForm({
  vendor,
  onSave,
  onCancel
}: VendorEditFormProps) {
  const [formData, setFormData] = useState<Vendor>({
    id: "",
    name: "",
    vendorId: "",
    address: {
      country: "國內",
      city: "",
      district: "",
      village: "",
      detail: ""
    },
    phone: "",
    contactPerson: {
      name: "",
      title: "",
      phone: ""
    }
  })

  useEffect(() => {
    if (vendor) {
      setFormData(vendor)
    }
  }, [vendor])

  const handleInputChange = (field: keyof Vendor, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddressChange = (field: keyof Vendor['address'], value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }))
  }

  const handleContactChange = (field: keyof Vendor['contactPerson'], value: string) => {
    setFormData(prev => ({
      ...prev,
      contactPerson: {
        ...prev.contactPerson,
        [field]: value
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name.trim() && formData.contactPerson.name.trim()) {
      onSave(formData)
    }
  }

  return (
    <div className="w-96 ml-6">
      <Card className="sticky top-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            廠商資料編輯
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 廠商基本資料 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-md font-medium text-gray-700">廠商基本資料</h3>
                <Button size="sm" variant="ghost" className="text-primary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  廠商名稱 *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="請輸入廠商名稱"
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vendorId" className="text-sm font-medium text-gray-700">
                  廠商編號
                </Label>
                <Input
                  id="vendorId"
                  value={formData.vendorId}
                  onChange={(e) => handleInputChange("vendorId", e.target.value)}
                  placeholder="請輸入廠商編號"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  廠商地址
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Select value={formData.address.country} onValueChange={(value) => handleAddressChange("country", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="國內">國內</SelectItem>
                      <SelectItem value="國外">國外</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={formData.address.city}
                    onChange={(e) => handleAddressChange("city", e.target.value)}
                    placeholder="市"
                    className="w-full"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={formData.address.district}
                    onChange={(e) => handleAddressChange("district", e.target.value)}
                    placeholder="區"
                    className="w-full"
                  />
                  <Input
                    value={formData.address.village}
                    onChange={(e) => handleAddressChange("village", e.target.value)}
                    placeholder="里"
                    className="w-full"
                  />
                </div>
                <Input
                  value={formData.address.detail}
                  onChange={(e) => handleAddressChange("detail", e.target.value)}
                  placeholder="詳細地址"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  電話
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="請輸入電話"
                  className="w-full"
                />
              </div>
            </div>

            {/* 連絡窗口 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-md font-medium text-gray-700">連絡窗口</h3>
                <Button size="sm" variant="ghost" className="text-primary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <Label htmlFor="contactName" className="text-sm font-medium text-gray-700">
                    姓名
                  </Label>
                  <Input
                    id="contactName"
                    value={formData.contactPerson.name}
                    onChange={(e) => handleContactChange("name", e.target.value)}
                    placeholder="請輸入姓名"
                    className="w-full"
                  />
                </div>
                <div className="flex items-end">
                  <Button size="sm" className="bg-primary text-white text-xs px-2 py-1">
                    名片存檔
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactTitle" className="text-sm font-medium text-gray-700">
                  職稱
                </Label>
                <Input
                  id="contactTitle"
                  value={formData.contactPerson.title}
                  onChange={(e) => handleContactChange("title", e.target.value)}
                  placeholder="請輸入職稱"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone" className="text-sm font-medium text-gray-700">
                  電話
                </Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPerson.phone}
                  onChange={(e) => handleContactChange("phone", e.target.value)}
                  placeholder="請輸入電話"
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-primary-dark hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 text-white"
              >
                儲存
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                取消
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 