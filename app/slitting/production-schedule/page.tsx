"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Plus } from "lucide-react"

export default function SlittingProductionSchedule() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">分條排程</h1>
            <p className="text-gray-600">管理分條機台的生產排程</p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700">
          <Plus className="w-4 h-4 mr-2" />
          新增排程
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>分條排程</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">分條課排程功能開發中...</p>
        </CardContent>
      </Card>
    </div>
  )
}
