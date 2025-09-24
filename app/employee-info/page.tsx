"use client"

import { useState, useEffect, useRef } from "react"
import { Clock, Edit, Upload, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Sidebar from "../components/sidebar"
import "../../styles/admin-colors.css"
import "../../styles/admin.css"

interface Employee {
  id: string
  employeeNumber: string
  name: string
  department: string
  title: string
  email?: string
  phone?: string
  remarks?: string
  dailyReportPermissions: string[]
  isActive: boolean
}

export default function EmployeeInfoPage() {
  const [employee, setEmployee] = useState<Employee>({
    id: "1",
    employeeNumber: "AA35",
    name: "王意菁",
    department: "業務課",
    title: "高階主管",
    email: "wang@example.com",
    phone: "0912-345-678",
    remarks: "",
    dailyReportPermissions: [],
    isActive: true
  })
  const [loading, setLoading] = useState(true)
  const [pageOpacity, setPageOpacity] = useState(0)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  // 部門選項
  const departments = [
    { value: "業務課", label: "業務課" },
    { value: "抽袋課", label: "抽袋課" },
    { value: "印刷課", label: "印刷課" },
    { value: "貼合課", label: "貼合課" },
    { value: "分條課", label: "分條課" },
    { value: "裁切課", label: "裁切課" }
  ]

  // 職稱選項
  const titles = [
    { value: "高階主管", label: "高階主管" },
    { value: "業務助理", label: "業務助理" },
    { value: "小組長", label: "小組長" },
    { value: "技術員", label: "技術員" },
    { value: "建檔員", label: "建檔員" }
  ]

  // 日報表權限選項
  const permissionOptions = [
    { id: "business", name: "業", label: "業務" },
    { id: "bagging", name: "抽", label: "抽袋" },
    { id: "printing", name: "印", label: "印刷" },
    { id: "laminating", name: "貼", label: "複合" },
    { id: "slitting", name: "分", label: "分條" },
    { id: "cutting", name: "裁", label: "切片" }
  ]

  // 初始化載入
  useEffect(() => {
    const loadEmployeeData = async () => {
      try {
        // 模擬 API 調用延遲
        await new Promise(resolve => setTimeout(resolve, 500))
        // 這裡可以從 API 載入員工數據
      } catch (error) {
        console.error("載入員工數據失敗:", error)
      } finally {
        setLoading(false)
        // 數據載入完成後開始淡入
        setTimeout(() => setPageOpacity(1), 50)
      }
    }

    loadEmployeeData()
  }, [])

  // 處理表單輸入變更
  const handleInputChange = (field: keyof Employee, value: string | string[]) => {
    setEmployee(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // 處理日報表權限變更
  const handlePermissionToggle = (permissionId: string) => {
    setEmployee(prev => ({
      ...prev,
      dailyReportPermissions: prev.dailyReportPermissions.includes(permissionId)
        ? prev.dailyReportPermissions.filter(p => p !== permissionId)
        : [...prev.dailyReportPermissions, permissionId]
    }))
  }

  // 處理圖片上傳
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // 檢查文件類型
      if (!file.type.startsWith('image/')) {
        alert('請選擇圖片文件')
        return
      }

      // 檢查文件大小 (限制為 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('圖片大小不能超過 5MB')
        return
      }

      setIsUploading(true)

      // 創建 FileReader 來預覽圖片
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfileImage(result)
        setIsUploading(false)
      }
      reader.onerror = () => {
        alert('圖片讀取失敗')
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  // 處理上傳按鈕點擊
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  // 處理移除圖片
  const handleRemoveImage = () => {
    setProfileImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // 處理保存
  const handleSave = () => {
    // 驗證表單
    const missingFields = []
    
    if (!employee.employeeNumber.trim()) {
      missingFields.push("員工編號")
    }
    if (!employee.name.trim()) {
      missingFields.push("員工姓名")
    }
    if (!employee.department) {
      missingFields.push("部門")
    }
    if (!employee.title) {
      missingFields.push("職稱")
    }
    if (employee.dailyReportPermissions.length === 0) {
      missingFields.push("日報表填寫權限")
    }

    if (missingFields.length > 0) {
      alert(`請完整填寫表單！\n\n尚未填寫的欄位：\n${missingFields.join('\n')}`)
      return
    }

    console.log("保存員工資料:", employee)
    console.log("頭像:", profileImage ? "已上傳" : "未上傳")
    console.log("日報表權限:", employee.dailyReportPermissions)
    // 這裡可以調用 API 保存數據，包括圖片
  }

  // 處理刪除確認
  const handleDeleteConfirm = () => {
    console.log("刪除員工資料:", employee.id)
    setShowDeleteModal(false)
    // 這裡可以調用 API 刪除員工資料
  }

  // 處理刪除取消
  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
  }

  if (loading) {
    return (
      <div className="admin-container min-h-screen bg-gradient-to-br p-4">
        <div className="max-w-[1600px] mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex h-screen">
            <Sidebar />
            <div className="middle-col-outer-wrap flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">載入中...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-container min-h-screen bg-gradient-to-br p-4">
      <div className="max-w-[1600px] mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex h-screen">
          {/* Left Sidebar */}
          <Sidebar />

          {/* Main Content */}
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
                  <span>員工個人資料</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{getCurrentDateTime()}</span>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 pb-6 px-6">
              {/* Page Title */}
              <div className="mb-6 flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-800">員工個人資料</h1>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-gray-300 text-gray-500 hover:bg-gray-100 cursor-default">
                  <Edit className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-500 font-medium">編輯中..</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Section - Employee Photo */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardContent className="text-center p-6">
                      {/* Employee Photo */}
                      <div className="mb-4 relative">
                        <div className="w-48 h-48 mx-auto bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden relative">
                          {profileImage ? (
                            <>
                              <img 
                                src={profileImage} 
                                alt="員工頭像" 
                                className="w-full h-full object-cover"
                              />
                              {/* 移除圖片按鈕 */}
                              <button
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </>
                          ) : (
                            <User className="w-24 h-24 text-gray-400" />
                          )}
                        </div>
                        {isUploading && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                            <div className="text-white text-sm">上傳中...</div>
                          </div>
                        )}
                      </div>
                      
                      {/* Hidden File Input */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      
                      {/* Upload Button */}
                      <Button 
                        onClick={handleUploadClick}
                        disabled={isUploading}
                        className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {isUploading ? "上傳中..." : "大頭照"}
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Section - Employee Details Form */}
                <div className="lg:col-span-2">
                  <Card>
                    {/* <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-800">
                        員工詳細資料
                      </CardTitle>
                    </CardHeader> */}
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                        {/* Left Column */}
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="employeeNumber" className="text-sm font-medium text-gray-700">
                              員工編號
                            </Label>
                            <Input
                              id="employeeNumber"
                              value={employee.employeeNumber}
                              onChange={(e) => handleInputChange('employeeNumber', e.target.value)}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                              職稱
                            </Label>
                            <Select
                              value={employee.title}
                              onValueChange={(value) => handleInputChange('title', value)}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {titles.map((title) => (
                                  <SelectItem key={title.value} value={title.value}>
                                    {title.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                              員工姓名
                            </Label>
                            <Input
                              id="name"
                              value={employee.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="department" className="text-sm font-medium text-gray-700">
                              部門
                            </Label>
                            <Select
                              value={employee.department}
                              onValueChange={(value) => handleInputChange('department', value)}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {departments.map((dept) => (
                                  <SelectItem key={dept.value} value={dept.value}>
                                    {dept.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                              密碼
                            </Label>
                            <Input
                              id="password"
                              type="password"
                              placeholder="請輸入密碼"
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Daily Report Permissions */}
                      <div className="mt-6">
                        <Label className="text-sm font-medium text-gray-700">
                          日報表填寫權限
                        </Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {permissionOptions.map((option) => (
                            <Button
                              key={option.id}
                              variant={employee.dailyReportPermissions.includes(option.id) ? "default" : "outline"}
                              size="sm"
                              className={`w-12 h-12 text-sm font-medium ${
                                employee.dailyReportPermissions.includes(option.id)
                                  ? "bg-green-600 hover:bg-green-700 text-white"
                                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
                              }`}
                              onClick={() => handlePermissionToggle(option.id)}
                            >
                              {option.name}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Remarks */}
                      <div className="mt-6">
                        <Label htmlFor="remarks" className="text-sm font-medium text-gray-700">
                          備註
                        </Label>
                        <Textarea
                          id="remarks"
                          value={employee.remarks || ''}
                          onChange={(e) => handleInputChange('remarks', e.target.value)}
                          className="mt-1"
                          rows={3}
                        />
                      </div>

                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Right Control Panel */}
          <div className="admin-right-col-section w-64 bg-gray-50 p-6 shadow-[-4px_0_8px_rgba(0,0,0,0.1)]" style={{ position: 'sticky', top: '0px', height: '100vh', overflowY: 'auto' }}>
            <div className="flex flex-col h-full">
              <div className="space-y-6 flex-1">
                {/* 製單 */}
                <div className="right-col-item text-center">
                  <div className="bg-gray-200 px-4 py-2 border-br-bl-none rounded-lg mb-4 font-medium">製單</div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center mx-auto mb-2">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm font-medium">陳某某</div>
                </div>

                {/* 經理 */}
                <div className="right-col-item text-center">
                  <div className="bg-gray-200 px-4 py-2 border-br-bl-none rounded-lg mb-4 font-medium">經理</div>
                  <div className="w-16 h-16 rounded-full bg-theme-gray flex items-center justify-center mx-auto mb-2">
                    <User className="w-8 h-8 text-gray-500" />
                  </div>
                </div>

                {/* 總經理 */}
                <div className="right-col-item text-center">
                  <div className="bg-gray-200 px-4 py-2 border-br-bl-none rounded-lg mb-4 font-medium">總經理</div>
                  <div className="w-16 h-16 rounded-full bg-theme-gray flex items-center justify-center mx-auto mb-2">
                    <User className="w-8 h-8 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="mt-auto pt-6 space-y-3">
                <Button 
                  onClick={() => setShowDeleteModal(true)}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  刪除員工資料
                </Button>
                
                <Button 
                  onClick={handleSave}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-10 px-4 w-full bg-primary-dark hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 text-white py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  確認送出
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="bg-pink-500 text-white px-6 py-4 rounded-t-lg">
              <h3 className="text-lg font-semibold">刪除員工資料</h3>
            </div>
            
            {/* Modal Content */}
            <div className="px-6 py-6">
              <div className="text-center">
                <p className="text-gray-800 mb-2">
                  是否確認<span className="text-red-600 font-semibold">「刪除」</span>
                </p>
                <p className="text-gray-800 mb-4">
                  本員工的員工基本資料?
                </p>
                <p className="text-red-600 text-sm font-medium">
                  刪除將會清除本員工在資料庫中的所有記錄!!
                </p>
              </div>
            </div>
            
            {/* Modal Buttons */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex space-x-3">
              <Button
                onClick={handleDeleteCancel}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded"
              >
                取消
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
              >
                確定
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
