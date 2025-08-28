"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Droplets, Plus } from "lucide-react"

export default function MaterialRecordPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">膠水記錄</h1>
            <p className="text-gray-600">管理貼合課的膠水庫存</p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
          <Plus className="w-4 h-4 mr-2" />
          新增膠水
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>膠水記錄</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">貼合課膠水記錄功能開發中...</p>
        </CardContent>
      </Card>
    </div>
  )
}
