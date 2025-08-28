"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Plus } from "lucide-react"

export default function OrderRecordPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">訂製單記錄</h1>
            <p className="text-gray-600">管理印刷課的訂單記錄</p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          新增訂單
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>訂單記錄</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">印刷課訂單記錄功能開發中...</p>
        </CardContent>
      </Card>
    </div>
  )
}
