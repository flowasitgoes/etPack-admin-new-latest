"use client"

import { useState } from "react"
import { Edit, MoreVertical, X, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ProductionSpecItemProps {
  id: string
  type: 'bag' | 'printing' | 'lamination' | 'slitting' | 'cutting'
  title: string
  bgColor: string
  borderColor: string
  iconColor: string
  children: React.ReactNode
  createdAt?: string
  number?: string // 添加编号字段
  onEdit?: () => void
  onDelete?: () => void
}

export default function ProductionSpecItem({
  id,
  type,
  title,
  bgColor,
  borderColor,
  iconColor,
  children,
  createdAt = "2025-08-08 11:30:56",
  number = "01", // 默认编号
  onEdit,
  onDelete
}: ProductionSpecItemProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleEdit = () => {
    onEdit?.()
  }

  const handleDeleteClick = () => {
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = () => {
    onDelete?.()
    setShowDeleteDialog(false)
  }

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false)
  }

  return (
    <>
      <div className="production-specifications-wrap" tabIndex={0}>
        <Card className={`production-specifications-item ${borderColor}`}>
          <CardContent className="p-0">
            <div className="flex">
              {/* 左侧标签栏 */}
              <div className={`${bgColor} text-white flex items-center justify-center ${
                isCollapsed 
                  ? 'px-4 py-2 text-sm' 
                  : 'px-6 py-8 text-2xl text-vertical'
              }`}>
                <div className={isCollapsed ? 'flex space-x-1' : 'text-wrap-vertical'}>
                  {title.split('').map((char, index) => (
                    <div key={index}>{char}</div>
                  ))}
                  {/* 编号显示 */}
                  <div style={{ transform: isCollapsed ? 'rotate(0deg)' : 'rotate(270deg)' }}>
                    {number}
                  </div>
                </div>
              </div>

              {/* 右侧内容区域 */}
              <div className="flex-1 flex flex-col">
                {/* 顶部时间栏和菜单 */}
                <div className={`px-4 py-2 text-xs text-gray-600 flex justify-between items-center ${
                  isCollapsed 
                    ? 'bg-gray-50 border-t border-l border-r border-gray-200' 
                    : 'bg-gray-50 border border-gray-200'
                }`}>
                  <span className="text-right flex-1" style={{ marginRight: '10px' }}>
                    創建時間：{createdAt}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost" className="h-6 w-6">
                        <MoreVertical className={`w-4 h-4 ${iconColor}`} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={toggleCollapse}>
                        {isCollapsed ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronUp className="w-4 h-4 mr-2" />}
                        {isCollapsed ? '展開' : '折疊'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleEdit}>
                        <Edit className="w-4 h-4 mr-2" />
                        編輯
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={handleDeleteClick}>
                        <X className="w-4 h-4 mr-2" />
                        刪除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* 主要内容区域 */}
                {!isCollapsed && (
                  <div className="production-spec-scrollable-wrap flex-1 p-6">
                    {children}
                  </div>
                )}

                {/* 折叠时的灰色区域 */}
                {isCollapsed && (
                  <div className="flex-1 p-0 bg-gray-50">
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 删除确认对话框 */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確認刪除</AlertDialogTitle>
            <AlertDialogDescription>
              您確定要刪除這個 {title}{number} 生產規格表單嗎？此操作無法撤銷。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel}>取消</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              確認刪除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
