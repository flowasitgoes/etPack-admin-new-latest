"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Download } from "lucide-react"

export default function DailyReportPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">裁袋日報表</h1>
            <p className="text-gray-600">查看裁袋課的生產日報表</p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
          <Download className="w-4 h-4 mr-2" />
          匯出報表
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>日報表</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">裁袋課日報表功能開發中...</p>
        </CardContent>
      </Card>
    </div>
  )
}
