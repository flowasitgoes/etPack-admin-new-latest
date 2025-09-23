"use client"

import { useState, useEffect } from "react"
import { Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
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

export default function EmployeePreviewPage() {
  const [employee, setEmployee] = useState<Employee>({
    id: "1",
    employeeNumber: "AA35",
    name: "王意菁",
    department: "業務課",
    title: "高階主管",
    email: "wang@example.com",
    phone: "0912-345-678",
    remarks: "",
    dailyReportPermissions: ["business", "bagging"],
    isActive: true
  })
  const [loading, setLoading] = useState(true)
  const [pageOpacity, setPageOpacity] = useState(0)
  const [profileImage, setProfileImage] = useState<string | null>(null)

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

  // 獲取顯示值，如果為空則顯示「尚未填寫」
  const getDisplayValue = (value: string | undefined) => {
    return value && value.trim() ? value : "尚未填寫"
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
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">員工個人資料</h1>
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
                            <img 
                              src={profileImage} 
                              alt="員工頭像" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-24 h-24 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Section - Employee Details Form */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                        {/* Left Column */}
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="employeeNumber" className="text-sm font-medium text-gray-700">
                              員工編號
                            </Label>
                            <div className="mt-1 border-b-2 border-gray-300 pb-1">
                              <span className="text-gray-800">{getDisplayValue(employee.employeeNumber)}</span>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                              職稱
                            </Label>
                            <div className="mt-1 border-b-2 border-gray-300 pb-1">
                              <span className="text-gray-800">{getDisplayValue(employee.title)}</span>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                              員工姓名
                            </Label>
                            <div className="mt-1 border-b-2 border-gray-300 pb-1">
                              <span className="text-gray-800">{getDisplayValue(employee.name)}</span>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="department" className="text-sm font-medium text-gray-700">
                              部門
                            </Label>
                            <div className="mt-1 border-b-2 border-gray-300 pb-1">
                              <span className="text-gray-800">{getDisplayValue(employee.department)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                          {/* 右側欄位已移除 */}
                        </div>
                      </div>


                      {/* Remarks */}
                      <div className="mt-6">
                        <Label htmlFor="remarks" className="text-sm font-medium text-gray-700">
                          備註
                        </Label>
                        <div className="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-md min-h-[80px]">
                          <p className="text-sm text-gray-700">
                            {getDisplayValue(employee.remarks)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
