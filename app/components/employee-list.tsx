"use client"

import { ChevronDown, Edit, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

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

interface EmployeeListProps {
  employees: Employee[]
  selectedEmployee: string
  sortBy: string
  onEmployeeSelect: (employeeId: string) => void
  onSortChange: (sortBy: string) => void
}

export default function EmployeeList({
  employees,
  selectedEmployee,
  sortBy,
  onEmployeeSelect,
  onSortChange
}: EmployeeListProps) {
  const router = useRouter()

  // 處理編輯按鈕點擊
  const handleEditClick = (employeeId: string) => {
    router.push('/employee-pre-info')
  }

  // 處理添加按鈕點擊
  const handleAddClick = () => {
    router.push('/employee-info')
  }

  // 獲取排序選項顯示文字
  const getSortOptionText = (option: string) => {
    switch (option) {
      case "name":
        return "名稱排序"
      case "employeeNumber":
        return "編號排序"
      case "department":
        return "部門排序"
      case "title":
        return "職稱排序"
      default:
        return "名稱排序"
    }
  }

  return (
    <div className="px-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">員工列表</h2>
        <div className="relative">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-40">
              <SelectValue>
                {getSortOptionText(sortBy)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">名稱排序</SelectItem>
              <SelectItem value="employeeNumber">編號排序</SelectItem>
              <SelectItem value="department">部門排序</SelectItem>
              <SelectItem value="title">職稱排序</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Employee Table */}
      <Card className="mb-6">
        <CardContent className="p-0">
          <div className="grid grid-cols-5">
            <div className="bg-primary text-white px-4 py-3 text-center font-medium rounded-tl-lg">
              員工編號
            </div>
            <div className="bg-primary text-white px-4 py-3 text-center font-medium">
              員工姓名
            </div>
            <div className="bg-primary text-white px-4 py-3 text-center font-medium">
              部門
            </div>
            <div className="bg-primary text-white px-4 py-3 text-center font-medium">
              職稱
            </div>
            <div className="bg-primary text-white px-4 py-3 text-center font-medium rounded-tr-lg">
              控制項
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {employees.map((employee) => {
              const isSelected = selectedEmployee === employee.id
              
              return (
                <div
                  key={employee.id}
                  className={`grid grid-cols-5 border-b transition-colors ${
                    isSelected ? "bg-purple-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div 
                    className="px-4 py-3 text-sm border-r cursor-pointer"
                    onClick={() => onEmployeeSelect(employee.id)}
                  >
                    {employee.employeeNumber}
                  </div>
                  <div 
                    className="px-4 py-3 text-sm border-r cursor-pointer"
                    onClick={() => onEmployeeSelect(employee.id)}
                  >
                    {employee.name}
                  </div>
                  <div 
                    className="px-4 py-3 text-sm border-r cursor-pointer"
                    onClick={() => onEmployeeSelect(employee.id)}
                  >
                    {employee.department}
                  </div>
                  <div 
                    className="px-4 py-3 text-sm border-r cursor-pointer"
                    onClick={() => onEmployeeSelect(employee.id)}
                  >
                    {employee.title}
                  </div>
                  <div className="px-4 py-3 text-sm flex items-center justify-center">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs px-2 py-1"
                      onClick={() => handleEditClick(employee.id)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* 空行 - 添加新員工 */}
          <div className="grid grid-cols-5 border-b transition-colors hover:bg-gray-50">
            <div className="px-4 py-3 text-sm border-r text-gray-400">
              -
            </div>
            <div className="px-4 py-3 text-sm border-r text-gray-400">
              -
            </div>
            <div className="px-4 py-3 text-sm border-r text-gray-400">
              -
            </div>
            <div className="px-4 py-3 text-sm border-r text-gray-400">
              -
            </div>
            <div className="px-4 py-3 text-sm flex items-center justify-center">
              <Button
                size="sm"
                variant="outline"
                className="text-xs px-2 py-1"
                onClick={handleAddClick}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
    </div>
  )
}
