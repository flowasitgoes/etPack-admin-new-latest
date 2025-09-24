"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import EmployeeList from "./employee-list"
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
  isActive: boolean
}

export default function EmployeeTablePage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState("")
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

  // 模擬員工數據
  const mockEmployees: Employee[] = [
    {
      id: "1",
      employeeNumber: "W64",
      name: "陳某某",
      department: "抽袋課",
      title: "建檔員",
      email: "chen@example.com",
      phone: "0912-345-678",
      isActive: true
    },
    {
      id: "2",
      employeeNumber: "W65",
      name: "林某某",
      department: "抽袋課",
      title: "組長",
      email: "lin@example.com",
      phone: "0912-345-679",
      isActive: true
    },
    {
      id: "3",
      employeeNumber: "W66",
      name: "王某某",
      department: "印刷課",
      title: "操作員",
      email: "wang@example.com",
      phone: "0912-345-680",
      isActive: true
    },
    {
      id: "4",
      employeeNumber: "W67",
      name: "李某某",
      department: "印刷課",
      title: "技術員",
      email: "li@example.com",
      phone: "0912-345-681",
      isActive: true
    },
    {
      id: "5",
      employeeNumber: "W68",
      name: "張某某",
      department: "印刷課",
      title: "主管",
      email: "zhang@example.com",
      phone: "0912-345-682",
      isActive: true
    }
  ]

  // 初始化載入員工數據
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        // 模擬 API 調用延遲
        await new Promise(resolve => setTimeout(resolve, 500))
        const sortedEmployees = sortEmployees(mockEmployees, sortBy)
        setEmployees(sortedEmployees)
      } catch (error) {
        console.error("載入員工數據失敗:", error)
      } finally {
        setLoading(false)
        // 數據載入完成後開始淡入
        setTimeout(() => setPageOpacity(1), 50)
      }
    }

    loadEmployees()
  }, [])

  // 排序員工數據
  const sortEmployees = (employees: Employee[], sortBy: string): Employee[] => {
    return [...employees].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name, 'zh-TW')
        case "employeeNumber":
          return a.employeeNumber.localeCompare(b.employeeNumber)
        case "department":
          return a.department.localeCompare(b.department, 'zh-TW')
        case "title":
          return a.title.localeCompare(b.title, 'zh-TW')
        default:
          return a.name.localeCompare(b.name, 'zh-TW')
      }
    })
  }

  // 處理排序變更
  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy)
    const sortedEmployees = sortEmployees(employees, newSortBy)
    setEmployees(sortedEmployees)
  }

  // 處理員工選擇
  const handleEmployeeSelect = (employeeId: string) => {
    setSelectedEmployee(employeeId)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="transition-opacity duration-150 ease-in-out"
      style={{ opacity: pageOpacity }}
    >
      {/* Header */}
      <div className="bg-gray-600 text-white px-6 py-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <span>業務課</span>
            <span>{">"}</span>
            <span>員工資料庫</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>{getCurrentDateTime()}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 pb-6">
        {/* Employee List Section */}
        <EmployeeList
          employees={employees}
          selectedEmployee={selectedEmployee}
          sortBy={sortBy}
          onEmployeeSelect={handleEmployeeSelect}
          onSortChange={handleSortChange}
        />
      </div>
    </div>
  )
}
