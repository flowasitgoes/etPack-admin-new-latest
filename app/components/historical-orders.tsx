"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { type HistoricalOrder } from "../lib/formula-service"

interface HistoricalOrdersProps {
  formulaId: string
  orders: HistoricalOrder[]
}

export default function HistoricalOrders({
  formulaId,
  orders
}: HistoricalOrdersProps) {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    // 組件顯示時開始淡入
    setOpacity(1)
  }, [formulaId])
  return (
    <div 
      className="px-6 transition-opacity duration-300 ease-in-out"
      style={{ opacity }}
    >
      <div className="bg-theme-gray text-white px-4 py-3 rounded-t-lg">
        <h3 className="font-medium">{formulaId} - 歷史訂單記錄</h3>
      </div>
      
      <Card className="rounded-t-none">
        <CardContent className="p-0">
          <div className="grid grid-cols-4 bg-gray-100">
            <div className="px-4 py-3 text-sm font-medium text-center border-r">客戶名稱</div>
            <div className="px-4 py-3 text-sm font-medium text-center border-r">交貨日期</div>
            <div className="px-4 py-3 text-sm font-medium text-center border-r">訂單數量</div>
            <div className="px-4 py-3 text-sm font-medium text-center">備註</div>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {orders.map((order, index) => (
              <div
                key={index}
                className={`grid grid-cols-4 border-b ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <div className="px-4 py-3 text-sm border-r">{order.vendor}</div>
                <div className="px-4 py-3 text-sm border-r">{order.deliveryDate}</div>
                <div className="px-4 py-3 text-sm border-r">{order.quantity}</div>
                <div className="px-4 py-3 text-sm">{order.notes}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 