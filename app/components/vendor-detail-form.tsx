"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Vendor } from "../lib/vendor-service"

interface VendorDetailFormProps {
  vendor: Vendor | null
  onSave: (vendor: Vendor) => void
}

export default function VendorDetailForm({
  vendor,
  onSave
}: VendorDetailFormProps) {
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

  const [focusedSection, setFocusedSection] = useState<string | null>(null)

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

  if (!vendor) {
    return null
  }

  return (
    <div className="px-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 客戶基本資料 */}
        <Card className={`transition-all duration-200 ${
          focusedSection === 'basic' 
            ? 'ring-1 ring-primary ring-opacity-30 shadow-md' 
            : 'hover:shadow-sm'
        }`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">客戶基本資料</CardTitle>
              <Button size="sm" variant="ghost" className="text-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  客戶名稱 *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  onFocus={() => setFocusedSection('basic')}
                  onBlur={() => setFocusedSection(null)}
                  placeholder="請輸入客戶名稱"
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vendorId" className="text-sm font-medium text-gray-700">
                  客戶編號
                </Label>
                <Input
                  id="vendorId"
                  value={formData.vendorId}
                  onChange={(e) => handleInputChange("vendorId", e.target.value)}
                  onFocus={() => setFocusedSection('basic')}
                  onBlur={() => setFocusedSection(null)}
                  placeholder="請輸入客戶編號"
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                客戶地址
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <Select 
                  value={formData.address.country} 
                  onValueChange={(value) => handleAddressChange("country", value)}
                  onOpenChange={(open) => {
                    if (open) setFocusedSection('basic')
                    else setFocusedSection(null)
                  }}
                >
                  <SelectTrigger onFocus={() => setFocusedSection('basic')} onBlur={() => setFocusedSection(null)}>
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
                  onFocus={() => setFocusedSection('basic')}
                  onBlur={() => setFocusedSection(null)}
                  placeholder="市"
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={formData.address.district}
                  onChange={(e) => handleAddressChange("district", e.target.value)}
                  onFocus={() => setFocusedSection('basic')}
                  onBlur={() => setFocusedSection(null)}
                  placeholder="區"
                  className="w-full"
                />
                <Input
                  value={formData.address.village}
                  onChange={(e) => handleAddressChange("village", e.target.value)}
                  onFocus={() => setFocusedSection('basic')}
                  onBlur={() => setFocusedSection(null)}
                  placeholder="里"
                  className="w-full"
                />
              </div>
              <Input
                value={formData.address.detail}
                onChange={(e) => handleAddressChange("detail", e.target.value)}
                onFocus={() => setFocusedSection('basic')}
                onBlur={() => setFocusedSection(null)}
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
                onFocus={() => setFocusedSection('basic')}
                onBlur={() => setFocusedSection(null)}
                placeholder="請輸入電話"
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* 連絡窗口 */}
        <Card className={`transition-all duration-200 ${
          focusedSection === 'contact' 
            ? 'ring-1 ring-primary ring-opacity-30 shadow-md' 
            : 'hover:shadow-sm'
        }`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">連絡窗口</CardTitle>
              <Button size="sm" variant="ghost" className="text-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Label htmlFor="contactName" className="text-sm font-medium text-gray-700">
                  姓名
                </Label>
                <Input
                  id="contactName"
                  value={formData.contactPerson.name}
                  onChange={(e) => handleContactChange("name", e.target.value)}
                  onFocus={() => setFocusedSection('contact')}
                  onBlur={() => setFocusedSection(null)}
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactTitle" className="text-sm font-medium text-gray-700">
                  職稱
                </Label>
                <Input
                  id="contactTitle"
                  value={formData.contactPerson.title}
                  onChange={(e) => handleContactChange("title", e.target.value)}
                  onFocus={() => setFocusedSection('contact')}
                  onBlur={() => setFocusedSection(null)}
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
                  onFocus={() => setFocusedSection('contact')}
                  onBlur={() => setFocusedSection(null)}
                  placeholder="請輸入電話"
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-primary-dark hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 text-white"
          >
            儲存變更
          </Button>
        </div>
      </form>
    </div>
  )
} 