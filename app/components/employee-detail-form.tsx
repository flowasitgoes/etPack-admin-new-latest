"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface Employee {
  id: string
  employeeNumber: string
  name: string
  department: string
  title: string
  email?: string
  phone?: string
  isActive: boolean
}

interface EmployeeDetailFormProps {
  employee: Employee
  onSave: (employee: Employee) => void
}

export default function EmployeeDetailForm({
  employee,
  onSave
}: EmployeeDetailFormProps) {
  const [formData, setFormData] = useState<Employee>(employee)
  const [isEditing, setIsEditing] = useState(false)

  // 處理表單輸入變更
  const handleInputChange = (field: keyof Employee, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // 處理保存
  const handleSave = () => {
    onSave(formData)
    setIsEditing(false)
  }

  // 處理取消編輯
  const handleCancel = () => {
    setFormData(employee)
    setIsEditing(false)
  }

  return (
    <div className="px-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800">
              員工詳細信息
            </CardTitle>
            <div className="flex space-x-2">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  編輯
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    保存
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                  >
                    取消
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 左側欄位 */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="employeeNumber" className="text-sm font-medium text-gray-700">
                  員工編號
                </Label>
                <Input
                  id="employeeNumber"
                  value={formData.employeeNumber}
                  onChange={(e) => handleInputChange('employeeNumber', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  員工姓名
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="department" className="text-sm font-medium text-gray-700">
                  部門
                </Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => handleInputChange('department', value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="抽袋課">抽袋課</SelectItem>
                    <SelectItem value="印刷課">印刷課</SelectItem>
                    <SelectItem value="切片課">切片課</SelectItem>
                    <SelectItem value="複合課">複合課</SelectItem>
                    <SelectItem value="分條課">分條課</SelectItem>
                    <SelectItem value="業務課">業務課</SelectItem>
                    <SelectItem value="業務課">業務課</SelectItem>
                    <SelectItem value="管理部">管理部</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  職稱
                </Label>
                <Select
                  value={formData.title}
                  onValueChange={(value) => handleInputChange('title', value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="建檔員">建檔員</SelectItem>
                    <SelectItem value="操作員">操作員</SelectItem>
                    <SelectItem value="技術員">技術員</SelectItem>
                    <SelectItem value="組長">組長</SelectItem>
                    <SelectItem value="主管">主管</SelectItem>
                    <SelectItem value="經理">經理</SelectItem>
                    <SelectItem value="總經理">總經理</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 右側欄位 */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  電子郵件
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  聯絡電話
                </Label>
                <Input
                  id="phone"
                  value={formData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                  disabled={!isEditing}
                />
                <Label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                  在職狀態
                </Label>
              </div>

              <div className="pt-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">員工狀態</h4>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${formData.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm text-gray-600">
                      {formData.isActive ? '在職' : '離職'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
