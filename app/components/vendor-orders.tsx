"use client"

import { Card, CardContent } from "@/components/ui/card"
import { type VendorOrder } from "../lib/vendor-service"

interface VendorOrdersProps {
  vendorId: string
  orders: VendorOrder[]
}

export default function VendorOrders({
  vendorId,
  orders
}: VendorOrdersProps) {
  return (
    <div className="px-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">歷史訂單記錄</h2>
      
      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-4">
            <div className="bg-primary text-white px-4 py-3 text-center font-medium rounded-tl-lg">
              接單日期
            </div>
            <div className="bg-primary text-white px-4 py-3 text-center font-medium">
              交貨日期
            </div>
            <div className="bg-primary text-white px-4 py-3 text-center font-medium">
              訂單內容概要
            </div>
            <div className="bg-primary text-white px-4 py-3 text-center font-medium rounded-tr-lg">
              備註
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <div
                  key={order.id}
                  className={`grid grid-cols-4 border-b transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <div className="px-4 py-3 text-sm border-r">
                    {order.orderDate}
                  </div>
                  <div className="px-4 py-3 text-sm border-r">
                    {order.deliveryDate}
                  </div>
                  <div className="px-4 py-3 text-sm border-r">
                    {order.orderSummary}
                  </div>
                  <div className="px-4 py-3 text-sm">
                    {order.remarks || "-"}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                <p className="text-sm">暫無歷史訂單記錄</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 