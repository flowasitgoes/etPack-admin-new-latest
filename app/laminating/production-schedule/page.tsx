"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Plus } from "lucide-react"

export default function LaminatingProductionSchedule() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">貼合排程</h1>
            <p className="text-gray-600">管理貼合機台的生產排程</p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          新增排程
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>貼合排程</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">貼合課排程功能開發中...</p>
        </CardContent>
      </Card>
    </div>
  )
}
